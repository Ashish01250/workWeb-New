import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const [errorToast, setErrorToast] = useState("");

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || null;
    } catch {
      return null;
    }
  }, []);

  const isSeller = currentUser?.isSeller;

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (review) => newRequest.post("/reviews", review),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
    },
    onError: (err) => {
      setErrorToast(err?.response?.data?.message || "Something went wrong!");
      setTimeout(() => setErrorToast(""), 4000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target.desc.value;
    const star = Number(e.target.star.value);
    mutation.mutate({ gigId, desc, star });
    e.target.reset();
  };

  const total = data.length;
  const avg = total > 0 
    ? (data.reduce((sum, r) => sum + r.star, 0) / total).toFixed(1) 
    : null;

  return (
    <div className="reviews">
      {/* Error Toast */}
      {errorToast && (
        <div className="toastError">
          <img src="/img/error.png" alt="" />
          <span>{errorToast}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="reviews-header fadeIn">
        <div className="title-area">
          <h2>Customer Reviews</h2>
          <span className="count-pill">{total} Total</span>
        </div>
        {avg && (
          <div className="avg-badge">
            <img src="/img/star.png" alt="" />
            <span className="score">{avg}</span>
          </div>
        )}
      </div>

      <div className="reviews-container">
        {/* State Handling */}
        {isLoading ? (
          <div className="status-box loading">
            <div className="spinner"></div>
            <p>Fetching the latest reviews...</p>
          </div>
        ) : error ? (
          <div className="status-box error">
            <p>We couldn't load the reviews. Please try again.</p>
          </div>
        ) : total === 0 ? (
          <div className="status-box empty">
            <p>No reviews yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="reviews-list">
            {data.map((review, index) => (
              <div 
                key={review._id} 
                className="list-item-wrapper fadeInUp" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Review review={review} />
              </div>
            ))}
          </div>
        )}

        {/* Action Section */}
        {!isSeller && currentUser ? (
          <div className="add-review-section floatUp">
            <div className="add-card">
              <h3>Write a Review</h3>
              <form className="addForm" onSubmit={handleSubmit}>
                <textarea
                  name="desc"
                  placeholder="What was it like working with this seller?"
                  required
                />
                <div className="form-footer">
                  <div className="input-group">
                    <label>Rating</label>
                    <select name="star" defaultValue="" required>
                      <option value="" disabled>Select ⭐</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Awful</option>
                    </select>
                  </div>
                  <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Posting..." : "Post Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : isSeller ? (
          <div className="notice-banner seller-notice fadeIn">
            <p>You are viewing this as a Seller. Feedback is provided by your buyers.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Reviews;