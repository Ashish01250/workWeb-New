import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>

          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>

          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on workWave</span>
            <span>Buying on workWave</span>
          </div>

          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>

          <div className="item">
            <h2>More From workWave</h2>
            <span>workWave Business</span>
            <span>Logo Maker</span>
            <span>workWave Guides</span>
            <span>Get Inspired</span>
            <span>ClearVoice</span>
            <span>Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>

        <hr />

        <div className="bottom">
          <div className="left">
            <div className="brand">
              <h2>workWave</h2>
              <span>© workWave International Ltd. 2024</span>
            </div>
          </div>

          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="Twitter" />
              <img src="/img/facebook.png" alt="Facebook" />
              <img src="/img/linkedin.png" alt="LinkedIn" />
              <img src="/img/pinterest.png" alt="Pinterest" />
              <img src="/img/instagram.png" alt="Instagram" />
            </div>

            <div className="controls">
              <div className="link">
                <img src="/img/language.png" alt="Language" />
                <span>English</span>
              </div>
              <div className="link">
                <img src="/img/coin.png" alt="Currency" />
                <span>USD</span>
              </div>
              <button className="accessibility" type="button">
                <img src="/img/accessibility.png" alt="Accessibility options" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
