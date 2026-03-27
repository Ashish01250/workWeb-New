// src/pages/gig/Gig.jsx
import React, { useState } from "react";
import "./Gig.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import getCurrentUser from "../../utils/getCurrentUser";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const openFullscreen = (index) => setFullscreenIndex(index);
  const closeFullscreen = () => setFullscreenIndex(null);

  // ── Load Gig ──────────────────────────────────────────────
  const { isLoading, error, data: gig } = useQuery({
    queryKey: ["gig", id],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = gig?.userId ?? null;

  // ── Load Seller ───────────────────────────────────────────
  const {
    isLoading: isSellerLoading,
    error: sellerError,
    data: seller,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  // ── States ─────────────────────────────────────────────────
  if (isLoading)
    return (
      <div className="gigPage">
        <div className="gigLoadState">
          <div className="spinner" />
          <p>Loading gig…</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="gigPage">
        <div className="gigLoadState error">
          Something went wrong loading this gig.
        </div>
      </div>
    );

  if (!gig)
    return (
      <div className="gigPage">
        <div className="gigLoadState">Gig not found.</div>
      </div>
    );

  // ── Derived ────────────────────────────────────────────────
  const rating =
    gig.starNumber > 0
      ? Math.round(gig.totalStars / gig.starNumber)
      : null;

  const images = [
    ...new Set([gig.cover, ...(gig.images || [])]),
  ].filter(Boolean);

  const isOwner = currentUser?._id === gig.userId;

  const handleContact = () => {
    if (!currentUser) return navigate("/login");
    const conversationId =
      currentUser._id > seller._id
        ? currentUser._id + seller._id
        : seller._id + currentUser._id;
    navigate(`/message/${conversationId}`);
  };

  return (
    <div className="gigPage">
      <div className="gigContainer">

        {/* ══ LEFT ══════════════════════════════════════════ */}
        <div className="gigLeft">

          {/* Breadcrumb */}
          <p className="breadcrumb">
            <Link to="/">Home</Link>
            {" / "}
            <Link to="/gigs">Gigs</Link>
            {" / "}
            <span>{gig.cat || "Category"}</span>
          </p>

          {/* Title */}
          <h1 className="gigTitle">{gig.title}</h1>

          {/* Seller mini strip */}
          {isSellerLoading ? (
            <div className="sellerMini skeleton" />
          ) : seller ? (
            <div className="sellerMini">
              <img
                src={seller.img || "/img/noavatar.jpg"}
                alt={seller.username}
              />
              <div>
                <h4>{seller.username}</h4>
                {rating !== null && (
                  <p className="ratingRow">
                    <span className="stars">
                      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                    </span>
                    <span className="ratingCount">
                      {rating}.0 ({gig.starNumber} review{gig.starNumber !== 1 ? "s" : ""})
                    </span>
                  </p>
                )}
              </div>
            </div>
          ) : null}

          {/* Image Slider */}
          {images.length > 0 && (
            <div className="sliderWrapper">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div
                      className="slideImgWrapper"
                      onClick={() => openFullscreen(i)}
                      title="Click to view fullscreen"
                    >
                      <img
                        src={img}
                        alt={`Gig image ${i + 1}`}
                        className="sliderImg"
                      />
                      <div className="slideOverlayHint">🔍</div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Fullscreen */}
          {fullscreenIndex !== null && (
            <div className="fullscreenOverlay" onClick={closeFullscreen}>
              <button className="fsClose" onClick={closeFullscreen}>✕</button>
              <img
                src={images[fullscreenIndex]}
                className="fullscreenImage"
                alt="Fullscreen preview"
                onClick={(e) => e.stopPropagation()}
              />
              {fullscreenIndex > 0 && (
                <button
                  className="fsNav left"
                  onClick={(e) => { e.stopPropagation(); setFullscreenIndex((i) => i - 1); }}
                >‹</button>
              )}
              {fullscreenIndex < images.length - 1 && (
                <button
                  className="fsNav right"
                  onClick={(e) => { e.stopPropagation(); setFullscreenIndex((i) => i + 1); }}
                >›</button>
              )}
            </div>
          )}

          {/* About */}
          <div className="gigSection">
            <h2 className="sectionTitle">About This Gig</h2>
            <p className="gigDesc">{gig.desc}</p>
          </div>

          {/* Features */}
          {gig.features?.length > 0 && (
            <div className="gigSection">
              <h2 className="sectionTitle">What's Included</h2>
              <ul className="featureList">
                {gig.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews */}
          <div className="gigSection">
            <Reviews
              gigId={id}
              canWrite={!!currentUser && !currentUser.isSeller && !isOwner}
            />
          </div>
        </div>

        {/* ══ RIGHT ═════════════════════════════════════════ */}
        <div className="gigRight">

          {/* Seller Card */}
          {isSellerLoading ? (
            <div className="sellerBox skeleton" style={{ height: 200 }} />
          ) : seller ? (
            <div className="sellerBox">
              <div className="sellerHeader">
                <img
                  src={seller.img || "/img/noavatar.jpg"}
                  alt={seller.username}
                />
                <div>
                  <h3>{seller.username}</h3>
                  <p className="sellerCountry">📍 {seller.country || "Unknown"}</p>
                  {rating !== null && (
                    <span className="sellerRating">⭐ {rating} / 5</span>
                  )}
                </div>
              </div>

              <div className="sellerMeta">
                <p><b>Member since:</b> {seller.createdAt?.slice(0, 10)}</p>
                {seller.desc && (
                  <p className="sellerBio">{seller.desc}</p>
                )}
              </div>

              {!isOwner && (
                <button className="contactBtn" onClick={handleContact}>
                  Contact Seller
                </button>
              )}
            </div>
          ) : sellerError ? (
            <p className="sellerLoadErr">Could not load seller info.</p>
          ) : null}

          {/* Payment Box — hidden for owner */}
          {!isOwner && (
            <div className="paymentBox">
              <div className="paymentTop">
                <h3 className="paymentTitle">{gig.shortTitle}</h3>
                <h2 className="paymentPrice">${gig.price}</h2>
              </div>

              <div className="paymentBody">
                <p className="paymentDesc">{gig.shortDesc}</p>

                <ul className="paymentMeta">
                  <li>
                    ⏳ <b>{gig.deliveryTime}</b>{" "}
                    day{gig.deliveryTime !== 1 ? "s" : ""} delivery
                  </li>
                  <li>
                    ♻️ <b>{gig.revisionNumber}</b>{" "}
                    revision{gig.revisionNumber !== 1 ? "s" : ""}
                  </li>
                </ul>

                {currentUser ? (
                  <Link to={`/pay/${id}`}>
                    <button className="continueBtn">Continue →</button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="continueBtn">Login to Continue</button>
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Owner actions */}
          {isOwner && (
            <div className="ownerBox">
              <p>🎉 This is your gig</p>
              <Link to={`/edit-gig/${id}`}>
                <button className="editGigBtn">Edit Gig</button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Gig;