import React from "react";
import "./Review.scss";

const Review = ({ review }) => {
  // Ensure stars is a valid number between 0 and 5
  const starCount = Math.min(Math.max(review?.star || 0, 0), 5);

  return (
    <div className="reviewCard">
      <div className="reviewTop">
        <div className="userInfo">
          <img
            className="avatar"
            src={review?.img || review?.userImg || "/img/noavatar.jpg"}
            alt={review?.username || "User profile"}
          />
          <div className="meta">
            <span className="username">{review?.username || "Anonymous"}</span>
            {review?.country && (
              <div className="countryWrapper">
                <span className="countryTag">{review.country}</span>
              </div>
            )}
          </div>
        </div>

        <div className="starDisplay">
          <div className="stars">
            {[...Array(starCount)].map((_, i) => (
              <img src="/img/star.png" key={i} alt="star" className="starIcon" />
            ))}
          </div>
          <span className="starValue">{starCount}</span>
        </div>
      </div>

      <div className="reviewContent">
        <p className="reviewText">{review?.desc}</p>
      </div>

      <div className="helpfulRow">
        <span className="helpfulLabel">Helpful?</span>
        <div className="actionButtons">
          <button className="helpBtn yes" aria-label="Mark as helpful">
            <img src="/img/like.png" alt="" />
            <span>Yes</span>
          </button>
          <button className="helpBtn no" aria-label="Mark as not helpful">
            <img src="/img/dislike.png" alt="" />
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;