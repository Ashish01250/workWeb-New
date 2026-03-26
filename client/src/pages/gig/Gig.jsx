// src/pages/gig/Gig.jsx
import React, { useEffect, useState } from "react";
import "./gig.scss";
// import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [fullscreenIndex, setFullscreenIndex] = useState(null);

  const openFullscreen = (index) => setFullscreenIndex(index);
  const closeFullscreen = () => setFullscreenIndex(null);

  // Load Gig
  const { isLoading, error, data: gig } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = gig?.userId;

  // Load Seller
  const {
    isLoading: isSellerLoading,
    error: sellerError,
    data: seller,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  if (isLoading) return <div className="gig-center">Loading…</div>;
  if (error) return <div className="gig-center">Error loading gig</div>;
  if (!gig) return <div className="gig-center">Gig not found</div>;

  const rating =
    gig.starNumber > 0
      ? Math.round(gig.totalStars / gig.starNumber)
      : null;

  const images = [gig.cover, ...(gig.images || [])].filter(Boolean);

  return (
    <div className="gigPage">
      <div className="container">

        {/* LEFT SIDE (IMAGES + DETAILS) */}
        <div className="left">
          <h1 className="gigTitle">{gig.title}</h1>

          {/* Seller Quick Info */}
          {seller && (
            <div className="sellerMini">
              <img src={seller.img || "/img/noavatar.jpg"} alt="" />
              <div>
                <h4>{seller.username}</h4>
                {rating && (
                  <p className="ratingStar">
                    ⭐ {rating} ({gig.starNumber} reviews)
                  </p>
                )}
              </div>
            </div>
          )}

          {/* IMAGE SLIDER */}
          <Slider dots arrows autoplay={false} arrowsScroll={1}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="sliderImg"
                onClick={() => openFullscreen(index)}
              />
            ))}
          </Slider>

          {/* Fullscreen Image Viewer */}
          {fullscreenIndex !== null && (
            <div className="fullscreenOverlay" onClick={closeFullscreen}>
              <img
                src={images[fullscreenIndex]}
                className="fullscreenImage"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* ABOUT SECTION */}
          <h2 className="sectionTitle">About This Gig</h2>
          <p className="gigDesc">{gig.desc}</p>

          {/* REVIEWS */}
          <Reviews
            gigId={id}
            canWrite={!!currentUser && !currentUser.isSeller}
          />
        </div>

        {/* RIGHT SIDE (SELLER INFO + PAYMENT BOX) */}
        <div className="right">

          {/* SELLER CARD */}
          {seller && (
            <div className="sellerBox">
              <div className="sellerHeader">
                <img src={seller.img || "/img/noavatar.jpg"} alt="" />
                <div>
                  <h3>{seller.username}</h3>
                  <p className="flagRow">
                    <img
                      src={`https://flagsapi.com/${seller.countryCode || "IN"}/flat/32.png`}
                      alt=""
                      className="flag"
                    />
                    {seller.country || "Unknown"}
                  </p>

                  {rating && <span className="ratingDisplay">⭐ {rating}</span>}
                </div>
              </div>

              <div className="sellerMeta">
                <p><b>Member Since:</b> {seller.createdAt?.slice(0, 10)}</p>
                <p><b>Last Active:</b> 1 day ago</p>
              </div>

              <button
                className="contactBtn"
                onClick={() => navigate(`/message/${seller._id}`)}
              >
                Contact Seller
              </button>
            </div>
          )}

          {/* PAYMENT BOX */}
          <div className="paymentBox">
            <h3>{gig.shortTitle}</h3>
            <h2 className="priceTag">$ {gig.price}</h2>
            <p className="shortDesc">{gig.shortDesc}</p>

            <div className="paymentInfo">
              <p>⏳ {gig.deliveryTime} Days Delivery</p>
              <p>♻️ {gig.revisionNumber} Revisions</p>
            </div>

            <Link to={`/pay/${id}`}>
              <button className="buyBtn">Continue</button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Gig;
