import React, { useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation, useNavigate } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(search);
  const cat = urlParams.get("cat");
  const term = urlParams.get("search");

  // react-query → fetch gigs when sort or search query changes
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", sort, search],
    queryFn: () => {
      const params = new URLSearchParams(search);

      params.set("sort", sort);

      const min = minRef.current?.value;
      const max = maxRef.current?.value;

      if (min) params.set("min", min);
      if (max) params.set("max", max);

      return newRequest.get(`/gigs?${params.toString()}`).then((res) => res.data);
    },
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  // 🔹 CATEGORY CHIPS: update URL ?cat=...
  const setCategory = (newCat) => {
    const params = new URLSearchParams(search);

    if (newCat) {
      params.set("cat", newCat);
    } else {
      params.delete("cat");
    }

    navigate(`/gigs?${params.toString()}`);
  };

  const subtitle =
    term && !cat
      ? `Results for “${term}”`
      : cat
      ? `${cat.charAt(0).toUpperCase() + cat.slice(1)} services`
      : "Explore curated freelance gigs";

  const pageTitle = cat
    ? `${cat} freelancers`.replace(/\b\w/g, (c) => c.toUpperCase())
    : term
    ? `Results for “${term}”`
    : "Browse freelance services";

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          workWave <span className="sep">{">"}</span>{" "}
          {cat ? cat : term ? "Search" : "All gigs"}
        </span>

        <h1 className="pageTitle">{pageTitle}</h1>
        <p className="subtitle">{subtitle}</p>

        {/* 🔹 Category chips */}
        <div className="categoryChips">
          <button
            type="button"
            className={!cat ? "chip active" : "chip"}
            onClick={() => setCategory(null)}
          >
            All
          </button>
          <button
            type="button"
            className={cat === "design" ? "chip active" : "chip"}
            onClick={() => setCategory("design")}
          >
            Design
          </button>
          <button
            type="button"
            className={cat === "web" ? "chip active" : "chip"}
            onClick={() => setCategory("web")}
          >
            Web Development
          </button>
          <button
            type="button"
            className={cat === "video" ? "chip active" : "chip"}
            onClick={() => setCategory("video")}
          >
            Video & Animation
          </button>
          <button
            type="button"
            className={cat === "writing" ? "chip active" : "chip"}
            onClick={() => setCategory("writing")}
          >
            Writing
          </button>
        </div>

        <div className="menu">
          <div className="left">
            <span className="label">Budget</span>
            <div className="inputs">
              <input ref={minRef} type="number" placeholder="Min" min="0" />
              <span className="dash">–</span>
              <input ref={maxRef} type="number" placeholder="Max" min="0" />
            </div>
            <button onClick={apply}>Apply</button>
          </div>

          <div className="right">
            <span className="sortBy">Sort by</span>
            <button
              type="button"
              className="sortType"
              onClick={() => setOpen((prev) => !prev)}
            >
              {sort === "sales" ? "Best selling" : "Newest"}
              <img src="/img/down.png" alt="toggle sort" />
            </button>

            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading ? (
            <div className="loading">Loading gigs...</div>
          ) : error ? (
            <div className="error">Something went wrong.</div>
          ) : data?.length ? (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          ) : (
            <div className="empty">No gigs found. Try changing filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
