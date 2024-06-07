import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuthNavbar from "./AuthNavbar";
import logo from "../../img/icon.png";
import { HashLink } from "react-router-hash-link";
function Navbar() {
  const navbarAnimations = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
    transition: {
      delay: 0.2,
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarAnimations}
      id="navbar"
      className={`navbar px-2  px-lg-5  navbar-expand-lg d-flex justify-content-between`}
    >
      <div className="container-fluid d-flex justify-content-between ">
        <Link to="/" className="link">
          <div className="logo-container d-flex align-items-end">
            <img src={logo} alt="" className="img-fluid logo" />
            <h1 className="ms-2 m-0 d-none d-lg-inline">
              <span>CAR</span>RENTAL
            </h1>
          </div>
        </Link>

        <div
          className="offcanvas offcanvas-start text-center "
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-body my-2 my-lg-0 d-flex justify-content-center justify-content-lg-center align-items-center">
            <ul className="navbar-nav justify-content-center d-flex align-items-lg-center">
              <li className="nav-item mx-0 mx-lg-3 my-2">
                <i
                  type="button"
                  className="fa-solid fa-xmark d-block d-lg-none"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></i>
              </li>
              <li className="nav-item mx-0 mx-lg-3 my-2">
                <Link to="/" className="nav-link nav-link-ltr ">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-0 mx-lg-3 my-2">
                <Link to="/cars" className="nav-link nav-link-ltr">
                  Cars
                </Link>
              </li>
              <li className="nav-item mx-0 mx-lg-3 my-2">
                <HashLink
                  smooth
                  to="/#condition"
                  className="nav-link nav-link-ltr"
                >
                  Conditions
                </HashLink>
              </li>
              <li className="nav-item mx-0 mx-lg-3 my-2">
                <HashLink
                  smooth
                  to="/#contact"
                  className="nav-link nav-link-ltr"
                >
                  Contacts
                </HashLink>
              </li>
            </ul>
          </div>
        </div>

        <AuthNavbar />
        <i
          id="menuIcon"
          className="fa-solid fa-bars d-lg-none my-3 my-lg-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        ></i>
      </div>
    </motion.nav>
  );
}

export default Navbar;
