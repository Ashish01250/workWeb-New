import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ card }) {
  return (
    <div className="projectCard">
      <div className="imageWrapper">
        <img src={card.img} alt={card.cat} />
      </div>
      <div className="info">
        <img src={card.pp} alt={card.username} />
        <div className="texts">
          <h2>{card.cat}</h2>
          <span>{card.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
