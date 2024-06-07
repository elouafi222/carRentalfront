import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function Forgot() {
    useEffect(() => {
        document.title = "Forgot Password";
      }, []);
  return (
    <div className="form-container d-flex justify-content-center align-items-center px-3 px-lg-5">
      <div className="form-box  p-3 py-5">
        <div className=" my-2 my-lg-0 text-center">
          <Link to="/">
            {/* <img src={icon} className="mb-3" /> */}
          </Link>
          <h1 className=" ">Forgot Password</h1>
          <p className="mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label htmlFor="search">Email ... </label>
          </div>
          <button className="px-5 py-1 mb-3">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Forgot;