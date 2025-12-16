// src/pages/gig/Gig.jsx
import React, { useEffect } from "react";
import "./gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const isSeller = currentUser?.isSeller;

  const {
    isLoading,
    error,
    data: gig,
  } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = gig?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: seller,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  useEffect(() => {
    // optional side-effects
  }, [gig]);

  if (isLoading) return <div className="gig gig-center">Loading...</div>;
  if (error) return <div className="gig gig-center">Something went wrong.</div>;
  if (!gig) return <div className="gig gig-center">Gig not found.</div>;

  const rating =
    gig.starNumber && gig.starNumber !== 0
      ? Math.round(gig.totalStars / gig.starNumber)
      : null;

  const images = [gig.cover, ...(gig.images || [])].filter(Boolean);

  const isOwner = currentUser?._id === gig.userId;

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">
            workWave <span className="sep">{">"}</span>{" "}
            <Link to={`/gigs?cat=${encodeURIComponent(gig.cat)}`}>{gig.cat}</Link>{" "}
            <span className="sep">{">"}</span>
          </span>

          <h1 className="title">{gig.title}</h1>

          {isLoadingUser ? (
            <div className="user user-placeholder">Loading seller...</div>
          ) : errorUser ? (
            <div className="user user-placeholder">Seller unavailable</div>
          ) : (
            <div className="user">
              <img
                className="pp"
                src={seller?.img || "/img/noavatar.jpg"}
                alt={seller?.username}
              />
              <span className="name">{seller?.username}</span>
              {rating && (
                <div className="stars">
                  {Array(rating)
                    .fill(0)
                    .map((_, i) => (
                      <img src="/img/star.png" alt="star" key={i} />
                    ))}
                  <span className="rating">{rating}</span>
                </div>
              )}
            </div>
          )}

          {images.length > 0 && (
            <div className="sliderWrap">
              <Slider
                dots
                arrows
                autoplay={false}
                arrowsScroll={1}
                className="slider"
                adaptiveHeight={true}
              >
                {images.map((img, i) => (
                  <div key={`${img}-${i}`} className="slideItem">
                    <img src={img} alt={`gig-${i}`} />
                  </div>
                ))}
              </Slider>
            </div>
          )}

          <h2 className="sectionTitle">About this gig</h2>
          <p className="desc">{gig.desc}</p>

          {seller && (
            <div className="seller">
              <h2 className="sectionTitle">About the seller</h2>
              <div className="user seller-header">
                <img src={seller.img || "/img/noavatar.jpg"} alt={seller.username} />
                <div className="info">
                  <span className="seller-name">{seller.username}</span>
                  {rating && (
                    <div className="stars">
                      {Array(rating)
                        .fill(0)
                        .map((_, i) => (
                          <img src="/img/star.png" alt="star" key={i} />
                        ))}
                      <span className="rating">{rating}</span>
                    </div>
                  )}
                  <button
                    className="contact-btn"
                    onClick={() => {
                      if (!currentUser) return navigate("/login");
                      navigate(`/message/${seller._id}`);
                    }}
                  >
                    Contact me
                  </button>
                </div>
              </div>

              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{seller.country || "Not set"}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">Oct 2024</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p className="seller-desc">{seller.desc || "No description provided."}</p>
              </div>
            </div>
          )}

          <div className="reviews-wrapper">
            <Reviews gigId={id} canWrite={!!currentUser && !currentUser.isSeller && !isOwner} />
          </div>
        </div>

        <div className="right">
          <div className="card">
            <div className="price">
              <h3>{gig.shortTitle}</h3>
              <h2>
                $ <span>{gig.price}</span>
              </h2>
            </div>
            <p className="shortDesc">{gig.shortDesc}</p>

            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="delivery" />
                <span>{gig.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="revisions" />
                <span>{gig.revisionNumber} Revisions</span>
              </div>
            </div>

            <div className="features">
              {gig.features?.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="included" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link to={`/pay/${id}`}>
              <button className="continue-btn">Continue</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gig;
