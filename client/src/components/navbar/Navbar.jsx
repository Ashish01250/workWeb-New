import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { pathname } = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const isActive = () => {
    setActive(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, []);

  // close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">workWave</span>
          </Link>
          <span className="dot">.</span>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`links ${mobileOpen ? "open" : ""}`}>
          <span className="navItem">workWave Business</span>
          <span className="navItem">Explore</span>
          <span className="navItem">English</span>
          {!currentUser?.isSeller && (
            <span className="navItem">Become a Seller</span>
          )}

          {currentUser ? (
            <div className="userWrapper">
              <Link to="/profile" className="link userLink">
                <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                <span>{currentUser?.username}</span>
              </Link>
            </div>
          ) : (
            <div className="authButtons">
              <Link to="/login" className="link">
                <span className="signin">Sign in</span>
              </Link>
              <Link className="link" to="/register">
                <button className="joinBtn">Join</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
