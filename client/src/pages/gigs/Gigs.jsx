import React, { useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation, useNavigate } from "react-router-dom";

const CATEGORIES = [
  { key: null,      label: "All",               icon: "✦" },
  { key: "design",  label: "Design",             icon: "◈" },
  { key: "web",     label: "Web Dev",            icon: "⟨/⟩" },
  { key: "video",   label: "Video & Animation",  icon: "▷" },
  { key: "writing", label: "Writing",            icon: "✎" },
  { key: "music",   label: "Music & Audio",      icon: "♪" },
  { key: "seo",     label: "SEO & Marketing",    icon: "◎" },
];

function Gigs() {
  const [sort, setSort]   = useState("sales");
  const [open, setOpen]   = useState(false);
  const minRef            = useRef();
  const maxRef            = useRef();

  const { search }        = useLocation();
  const navigate          = useNavigate();

  const urlParams = new URLSearchParams(search);
  const cat       = urlParams.get("cat");
  const term      = urlParams.get("search");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", sort, search],
    queryFn: () => {
      const params = new URLSearchParams(search);
      params.set("sort", sort);
      const min = minRef.current?.value;
      const max = maxRef.current?.value;
      if (min) params.set("min", min);
      if (max) params.set("max", max);
      return newRequest.get(`/gigs?${params.toString()}`).then((r) => r.data);
    },
  });

  const reSort = (type) => { setSort(type); setOpen(false); };
  const apply  = () => refetch();

  const setCategory = (newCat) => {
    const params = new URLSearchParams(search);
    if (newCat) params.set("cat", newCat);
    else params.delete("cat");
    navigate(`/gigs?${params.toString()}`);
  };

  const heading = cat
    ? `${cat.replace(/\b\w/g, (c) => c.toUpperCase())} Services`
    : term
    ? `"${term}"`
    : "Discover Talent";

  const subtext = cat
    ? `Hand-picked ${cat} professionals, ready to deliver.`
    : term
    ? `Showing results for your search`
    : "Thousands of top-rated freelancers at your fingertips";

  return (
    <div className="gigs">
      {/* ── Hero bar ─────────────────────────────────── */}
      <div className="gigs-hero">
        <div className="hero-noise" />
        <div className="hero-inner">
          <p className="crumb">
            workWave <span>/</span> {cat ?? (term ? "Search" : "All gigs")}
          </p>
          <h1 className="hero-title">{heading}</h1>
          <p className="hero-sub">{subtext}</p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="gigs-body">
        {/* Category pills */}
        <div className="cat-rail">
          {CATEGORIES.map(({ key, label, icon }) => (
            <button
              key={label}
              type="button"
              className={`cat-pill${cat === key ? " active" : ""}`}
              onClick={() => setCategory(key)}
            >
              <span className="pill-icon">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="budget-row">
            <span className="tool-label">Budget</span>
            <div className="range-wrap">
              <input ref={minRef} type="number" placeholder="Min $" min="0" />
              <span className="range-sep">→</span>
              <input ref={maxRef} type="number" placeholder="Max $" min="0" />
            </div>
            <button className="apply-btn" onClick={apply}>Apply</button>
          </div>

          <div className="sort-row">
            <span className="tool-label">Sort</span>
            <button
              type="button"
              className={`sort-btn${open ? " open" : ""}`}
              onClick={() => setOpen((p) => !p)}
            >
              {sort === "sales" ? "Best selling" : "Newest"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {open && (
              <div className="sort-dropdown">
                <span onClick={() => reSort("sales")}>Best selling</span>
                <span onClick={() => reSort("createdAt")}>Newest first</span>
              </div>
            )}
          </div>
        </div>

        {/* Result count */}
        {!isLoading && !error && data?.length > 0 && (
          <p className="result-count">
            <strong>{data.length}</strong> gig{data.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Cards grid */}
        <div className="gigs-grid">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skel skel-img" />
                <div className="skel skel-line w70" />
                <div className="skel skel-line w50" />
                <div className="skel skel-line w40" />
              </div>
            ))
          ) : error ? (
            <div className="state-msg error">
              <span className="state-icon">⚠</span>
              Something went wrong. Please try again.
            </div>
          ) : data?.length ? (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          ) : (
            <div className="state-msg empty">
              <span className="state-icon">◌</span>
              No gigs found — try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;