import React, { useRef } from "react";
import "./Slide.scss";

const Slide = ({ children, slidesToShow = 4, arrowsScroll }) => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const visibleCount = slidesToShow || 4;
    const cardWidth = track.clientWidth / visibleCount;
    const step = (arrowsScroll || visibleCount) * cardWidth;

    track.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

  return (
    <div className="slide">
      <button className="arrow prev" onClick={() => scroll(-1)}>
        ‹
      </button>

      <div className="slider-window">
        <div className="slider-track" ref={trackRef}>
          {React.Children.map(children, (child, index) => (
            <div className="slide-item" key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <button className="arrow next" onClick={() => scroll(1)}>
        ›
      </button>
    </div>
  );
};

export default Slide;
