import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  const category = card?.cat || "design";

  return (
    <Link to={`/gigs?cat=${encodeURIComponent(category)}`} className="link">
      <div className="catCard">
        <img src={card.img} alt={card.title} />
        <div className="content">
          <span className="desc">{card.desc}</span>
          <span className="title">{card.title}</span>
        </div>
      </div>
    </Link>
  );
}

export default CatCard;
