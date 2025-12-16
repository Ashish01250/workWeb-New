import React from "react";
import "./TrustedBy.scss";

const logos = [
  "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png",
  "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png",
  "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png",
  "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png",
  "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png",
];

const TrustedBy = () => {
  // duplicate array so scroll looks continuous
  const loopLogos = [...logos, ...logos];

  return (
    <div className="trustedBy">
      <div className="container">
        <span className="title">Trusted by</span>

        <div className="logo-strip">
          <div className="logo-scroll">
            {loopLogos.map((src, i) => (
              <img key={i} src={src} alt="Brand logo" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
