import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function CarItem({ car }) {
  return (
    <div className="col-md-6 col-lg-3 gx-4 gy-3  mx-lg-0">
      <div className="car-box  h-100 py-3 ">
        <div className="px-3 mb-3">
          <div className="box-grey px-3 py-2 ">
            <div className="d-flex justify-content-between">
              <h1>
                {" "}
                <i className="fa-solid fa-car me-1"></i>
                {car.brand}
              </h1>

              <Rating rating={car.rating} />
            </div>

            <p className="text-start m-0">
              {car.brand} - Model {car.model}
            </p>
          </div>
        </div>
        {car.image.url ? (
          <img className="mb-3" src={`${car?.image.url}`} alt={car.brand} />
        ) : (
          <div className="image-not-load mb-3 d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
        )}
        <div className="px-3">
          <h2 className="box-grey px-3 mb-3 py-2 ">
            <i className="fa-solid fa-location-dot me-1"></i>
            {car?.city.name}
          </h2>
          <div className="box-grey px-3 py-2 d-flex flex-row justify-content-between  ">
            <div className="text-start ">
              {" "}
              <h2 className="text-capitalize">
                <span>
                  Transmission <br />{" "}
                </span>
                {car.transmission}
              </h2>
            </div>
            <div className="text-start ">
              <h2 className="text-capitalize">
                {" "}
                <span>
                  Fuel <br />{" "}
                </span>
                {car.fuel}
              </h2>
            </div>
            <div className="text-start ">
              {" "}
              <h2 className="text-capitalize">
                {" "}
                <span>
                  Seats <br />{" "}
                </span>
                {car.seats}
              </h2>
            </div>
          </div>
        </div>

        <div className="row px-3 mt-3">
          <div className="col-6 text-start  price"> {car.price}DH</div>
          <div className="col-6 text-start ">
            <Link className="link" to={`/booking/${car._id}`}>
              {" "}
              <button className="p-1 d-flex px-1 align-items-center justify-content-center w-100">
                Book NOW
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarItem;
