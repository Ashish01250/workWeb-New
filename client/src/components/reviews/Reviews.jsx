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
      const msg =
        err?.response?.data?.message ||
        "You have already reviewed this gig!";

      setErrorToast(msg);

      setTimeout(() => setErrorToast(""), 3000);
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
  const avg =
    total > 0
      ? (data.reduce((sum, r) => sum + r.star, 0) / total).toFixed(1)
      : null;

  return (
    <div className="reviews">
      {/* 🔥 Animated Error Toast */}
      {errorToast && (
        <div className="toastError slideDown">
          <img src="/img/error.png" alt="error" />
          {errorToast}
        </div>
      )}

      {/* Header */}
      <div className="reviews-header fadeIn">
        <h2>Customer Reviews</h2>
        <div className="reviews-meta">
          <span className="count">{total} review{total !== 1 ? "s" : ""}</span>
          {avg && (
            <span className="avg">
              <img src="/img/star.png" alt="rating" />
              {avg}
            </span>
          )}
        </div>
      </div>

      {/* Review LIST */}
      {isLoading ? (
        <p className="status">Loading reviews...</p>
      ) : error ? (
        <p className="status error">Failed to load reviews.</p>
      ) : total === 0 ? (
        <p className="status">No reviews yet.</p>
      ) : (
        <div className="reviews-list fadeInUp">
          {data.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      )}

      {/* ➤ ONLY Buyers Can Write a Review */}
      {!isSeller && currentUser && (
        <div className="add floatUp">
          <h3>Write a Review</h3>
          <form className="addForm" onSubmit={handleSubmit}>
            <textarea
              name="desc"
              placeholder="Share your experience…"
              required
            />

            <div className="form-row">
              <select name="star" defaultValue="" required>
                <option value="" disabled>
                  Select rating
                </option>
                <option value="1">⭐ Very Bad</option>
                <option value="2">⭐⭐ Bad</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              </select>

              <button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Submitting…" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}

      {isSeller && (
        <p className="noticeSeller fadeIn">
          Sellers cannot write reviews on their own gig.
        </p>
      )}
    </div>
  );
};

export default Reviews;
