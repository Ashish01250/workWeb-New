import React from "react";
import { useNavigate } from "react-router-dom";
import "./Featured.scss";
import TrustedBy from "../trustedBy/TrustedBy";

function Featured() {
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const popularSearches = [
    "Web Design",
    "WordPress",
    "Logo Design",
    "AI Services",
    "Mobile App",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setIsLoading(true);
      try {
        navigate(`/gigs?search=${encodeURIComponent(input.trim())}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePopularSearch = (term) => {
    setInput(term);
    navigate(`/gigs?search=${encodeURIComponent(term)}`);
  };

  return (
    <section className="featured">
      {/* Background layers */}
      <div className="featured__bg" />
      <div className="featured__overlay" />

      {/* Decorative orbs */}
      <div className="featured__orb featured__orb--1" />
      <div className="featured__orb featured__orb--2" />

      <div className="featured__container">

        {/* ── LEFT ── */}
        <div className="featured__left">
          <p className="featured__eyebrow">
            <span className="featured__eyebrow-dot" />
            Work smarter with top freelancers
          </p>

          <h1 className="featured__headline">
            Find the perfect{" "}
            <em className="featured__headline-accent">freelance</em>
            <br />
            services for your business
          </h1>

          <p className="featured__subtext">
            From quick logo fixes to full-scale product builds, discover
            talent that fits your budget and timeline.
          </p>

          {/* Search bar */}
          <form className="featured__search" onSubmit={handleSubmit}>
            <div className="featured__search-input">
              <svg className="featured__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder={`Try "build a mobile app for my startup"`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={isLoading ? "loading" : ""}
            >
              {isLoading ? "Searching…" : "Search"}
            </button>
          </form>

          {/* Popular tags */}
          <div className="featured__popular">
            <span className="featured__popular-label">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                className="featured__tag"
                onClick={() => handlePopularSearch(term)}
              >
                {term}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="featured__stats">
            {[
              { number: "24/7", label: "Support" },
              { number: "10k+", label: "Trusted clients" },
              { number: "4.9 ★", label: "Average rating" },
            ].map((s, i) => (
              <div className="featured__stat" key={i}>
                <span className="featured__stat-number">{s.number}</span>
                <span className="featured__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="featured__right">
          <div className="featured__card">
            {/* Glow ring */}
            <div className="featured__card-ring" />

            <img
              src="./img/man.png"
              alt="Top freelancer"
              className="featured__card-img"
            />
            
          </div>
        </div>

      </div>
    </section>
  );
}

export default Featured;