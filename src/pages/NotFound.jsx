import React from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

function NotFound() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="notfound d-flex align-items-center justify-content-center ">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span>Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <Link className="link" to="/">
            <button className="mx-3 my-2"> Go To Home</button>
          </Link>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default NotFound;
