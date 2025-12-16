import React from "react";
import { useNavigate } from "react-router-dom";
import "./Featured.scss";

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
      <div className="overlay" />
      <div className="container">
        <div className="left">
          <p className="eyebrow">Work smarter with top freelancers</p>
          <h1 className="headline">
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <p className="subtext">
            From quick logo fixes to full-scale product builds, discover talent
            that fits your budget and timeline.
          </p>

          <form className="search" onSubmit={handleSubmit}>
            <div className="searchInput">
              <img src="./img/search.png" alt="search" />
              <input
                type="text"
                placeholder="Try “build a mobile app for my startup”"
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
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>

          <div className="popular">
            <span>Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                type="button"
              >
                {term}
              </button>
            ))}
          </div>

          <div className="stats">
            <div className="stat">
              <span className="number">24/7</span>
              <span className="label">Support</span>
            </div>
            <div className="stat">
              <span className="number">10k+</span>
              <span className="label">Trusted clients</span>
            </div>
            <div className="stat">
              <span className="number">4.9</span>
              <span className="label">Average rating</span>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="floating-card">
            <img src="./img/man.png" alt="freelancer" />
            <div className="badge">
              <span className="dot" />
              <span>Available now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;
