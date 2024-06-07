import React, { useEffect, useState } from "react";
import BookingForm from "../components/bookings/BookingForm";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../util/constants";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import { useSelector } from "react-redux";
import RateCar from "./modals/cars/RateCar";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Booking() {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [car, setCar] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/car/${id}`);
        setCar(res.data);
      } catch (error) {
        console.log("Fetching car failed" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCar();
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const updateRating = (newRating) => {
    setCar((prevCar) => ({
      ...prevCar,
      rating: newRating,
    }));
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Booking - {`${car?.brand + " " + car?.model}`}</title>
      </Helmet>
      <div className="px-4  py-2  px-lg-5 booking-page">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="row py-3">
            <div className="col-md-8 ">
              <div className="page-path mb-3 px-3 py-1">
                <Link to="/" className="link">
                  <span className="one">
                    Home<i className="fa-solid fa-chevron-right ms-1"></i>{" "}
                  </span>
                </Link>
                <span className="ms-2 two">
                  Booking car <i className="fa-solid fa-chevron-right ms-1"></i>{" "}
                </span>
                <span className="ms-2 three">
                  {car?.brand} - {car?.model}
                </span>
              </div>
              <div className="left h-100  m-0 ">
                {car?.image.url ? (
                  <img
                    className="mb-3"
                    src={`${car?.image.url}`}
                    alt={car?.brand}
                  />
                ) : (
                  <div className="image-not-load mb-3 d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-circle-exclamation"></i>
                  </div>
                )}

                <div className="mt-4 car-info p-3">
                  <div className="box-grey mb-3 px-3 py-2 d-flex justify-content-center  ">
                    <Rating rating={car?.rating} />
                    {user && (
                      <>
                        <RateCar
                          updateRating={updateRating}
                          rating={car?.rating}
                          carId={car?._id}
                        />
                        <i
                          data-bs-toggle="modal"
                          data-bs-target={`#ratecar-${car?._id}`}
                          className="ms-3 pointer fa-solid fa-circle-plus"
                        ></i>
                      </>
                    )}
                  </div>

                  <div className="box-grey px-3 py-2 d-flex justify-content-between  ">
                    <h2>
                      <span>Type </span>
                      <br /> Sedan
                    </h2>
                    <h2>
                      <span>Transmission </span>
                      <br />
                      {car?.transmission}
                    </h2>
                    <h2>
                      {" "}
                      <span>Fuel </span>
                      <br />
                      {car?.fuel}
                    </h2>
                    <h2>
                      {" "}
                      <span>Seats </span>
                      <br />
                      {car?.seats}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="row mt-4 mt-lg-0 px-3 "></div>
            </div>
            <div className="col-md-4  ">
              <div className="right h-100 p-3">
                <h1 className="text-start mb-3 ">
                  {car?.brand} - {car?.model}
                </h1>
                <div className="box-grey px-3 py-2 ">
                  <div className="d-flex justify-content-between">
                    <span>City</span>
                    <h2>{car?.locationId.cityId.name}</h2>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span> Adresse</span>
                    <h2>{car?.locationId.adresse}</h2>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Name</span>
                    <h2>{car?.locationId.name}</h2>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Location Phone </span>
                    <h2>{car?.locationId.phone}</h2>
                  </div>
                </div>
                <div className="mt-3 d-flex justify-content-between price">
                  <span>price per day </span>
                  <h2>{car?.price} DH</h2>
                </div>
                {car && <BookingForm car={car} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default Booking;
