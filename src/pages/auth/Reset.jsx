import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function Reset() {
  useEffect(() => {
    document.title = "Reset Password";
  }, []);
  return (
    <div className="form-container d-flex justify-content-center align-items-center px-3 px-lg-5">
      <div className="form-box p-3 py-5 ">
        <div className=" my-2 my-lg-0 text-center">
          <Link to="/">
            {/* <img src={icon} className="mb-3" /> */}
          </Link>
          <h1 className=" ">Reset Password</h1>
          <p className="mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="name@example.com"
            />
            <label htmlFor="search">New Password </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="conpassword"
              placeholder="name@example.com"
            />
            <label htmlFor="search">Confirme New Password </label>
          </div>
          <button className="px-5 py-1 mb-3">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Reset;