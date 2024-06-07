import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo2.png";
import { HashLink } from "react-router-hash-link";
function Footer() {
  return (
    <footer id="contact" className="text-center text-lg-start">
      <div className="custom-shape-divider-top-1716493123">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <section className="pt-5">
        <div className="container pt-5 text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-6 mx-auto logo-container mb-4">
              <div className="d-flex flex-column align-items-center ">
                <img src={logo} alt="" className="img-fluid logo" />
                <h6 className=" text-uppercase fw-bold mb-2">
                  CAR<span>RENTAL</span>
                </h6>
              </div>
              <p>
                Discover the beauty of this enchanting country on your own
                terms, With a wide range of vehicles to choose from, competitive
                rates, and convenient online booking,Start your adventure
                today!"
              </p>
            </div>

            <div className="col-md-3 mx-auto mb-4">
              <h6 className="text-uppercase  fw-bold mb-4">Products</h6>
              <p>
                <HashLink to="/#home" className="text-reset">
                  Home
                </HashLink>
              </p>
              {/* <p>
                <Link to="#!" className="text-reset">
                  About
                </Link>
              </p> */}
              <p>
                <Link to="/cars" className="text-reset">
                  Cars
                </Link>
              </p>
              <p>
                <HashLink smooth to="/#contact" className="text-reset">
                  Contacts
                </HashLink>
              </p>
              <p>
                <HashLink smooth to="/#condition" className="text-reset">
                  Conditions
                </HashLink>
              </p>
            </div>
            <div className="col-md-3  mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase  fw-bold mb-4">Contact</h6>
              {/* <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p> */}
              <p>
                <i className="fas fa-envelope me-3"></i>
                <Link
                  className="link text-white"
                  to="mailto:rentalcars.contact@gmail.com"
                >
                  rentalcars.contact@gmail.com
                </Link>
              </p>

              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
