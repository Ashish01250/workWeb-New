// src/components/review/Review.jsx
import React from "react";
import "./Review.scss";

const Review = ({ review }) => {
  const stars = review?.star || 0;

  return (
    <div className="reviewCard">
      {/* User Row */}
      <div className="reviewTop">
        <div className="userInfo">
          <img
            className="avatar"
            src={review?.img || review?.userImg || "/img/noavatar.jpg"}
            alt={review?.username || "User"}
          />

          <div className="meta">
            <span className="username">{review?.username || "Anonymous"}</span>
            {review?.country && (
              <span className="countryTag">{review.country}</span>
            )}
          </div>
        </div>

        {/* Animated star rating */}
        <div className="starDisplay">
          <div className="stars">
            {Array(stars)
              .fill(0)
              .map((_, i) => (
                <img src="/img/star.png" key={i} alt="star" />
              ))}
          </div>
          <span className="starValue">{stars}</span>
        </div>
      </div>

      {/* Review content */}
      <p className="reviewText">{review?.desc}</p>

      {/* Helpful buttons */}
      <div className="helpfulRow">
        <span>Helpful?</span>
        <button className="helpBtn yes">
          <img src="/img/like.png" alt="like" />
          Yes
        </button>
        <button className="helpBtn no">
          <img src="/img/dislike.png" alt="dislike" />
          No
        </button>
      </div>
    </div>
  );
};

export default Review;
