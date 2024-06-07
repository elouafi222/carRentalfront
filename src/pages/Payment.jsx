import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import PaymentForm from "../components/bookings/PaymentForm";
import { API_URL } from "../util/constants";
import { Helmet, HelmetProvider } from "react-helmet-async";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { dateStart, dateFin, heure, delivery, driver, car, amount } =
    location.state;

  const submitBooking = async () => {
    try {
      await axios.post(
        `${API_URL}/booking`,
        {
          dateStart,
          dateFin,
          heure,
          delivery,
          driver,
          isPayOnline: true,
          carId: car._id,
          status: 2,
          isPayed: true,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      toast.success("Your booking request has been successfully sent.");
      navigate(`/profile/${user._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className="px-4 py-2 payment-page d-flex align-items-center justify-content-center">
        <div className="content">
          <div className="box-white p-3 mb-3">
            <h1>Payment details</h1>
            <div className="box-grey px-3 py-2">
              <div className="d-flex justify-content-between">
                <span>Car</span>
                <h2>{car.brand + " " + car.model}</h2>
              </div>
              <div className="d-flex justify-content-between">
                <span>Date Start</span>
                <h2>{`${dateStart} at ${heure}`}</h2>
              </div>
              <div className="d-flex justify-content-between">
                <span>Number of days</span>
                <h2>
                  {Math.ceil(
                    (new Date(dateFin) - new Date(dateStart)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </h2>
              </div>
              <div className="d-flex justify-content-between">
                <span>Price per day</span>
                <h2>{car.price}DH</h2>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-between price">
              <span>Total amount</span>
              <h2>{amount}DH</h2>
            </div>
          </div>
          <Elements stripe={stripePromise}>
            <PaymentForm amount={amount} onSuccessfulPayment={submitBooking} />
          </Elements>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default PaymentPage;
