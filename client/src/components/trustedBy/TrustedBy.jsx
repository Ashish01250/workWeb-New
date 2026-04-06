import React from "react";
import "./TrustedBy.scss";

const logos = [
  {
    src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png",
    alt: "Facebook",
  },
  {
    src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png",
    alt: "Google",
  },
  {
    src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png",
    alt: "Netflix",
  },
  {
    src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png",
    alt: "P&G",
  },
  {
    src: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png",
    alt: "PayPal",
  },
];

// Triple the logos so the infinite loop never shows a gap
const loopLogos = [...logos, ...logos, ...logos];

const TrustedBy = () => {
  return (
    <section className="trustedBy">
      {/* Edge fade masks */}
      <div className="fade-left" />
      <div className="fade-right" />

      <div className="trustedBy__inner">
        <span className="trustedBy__label">Trusted by</span>

        <div className="trustedBy__track-wrapper">
          <div className="trustedBy__track">
            {loopLogos.map((logo, i) => (
              <div className="trustedBy__logo" key={i}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;