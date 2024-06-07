import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../util/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import calculateAmount from "../../lib/util";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function BookingForm({ car }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [dateStart, setDateStart] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [heure, setHeure] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [driver, setDriver] = useState(false);
  const [paymentOnline, setPaymentOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const amount = calculateAmount(dateStart, dateFin, car.price);
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const validateForm = () => {
    let isValid = true;
    const now = new Date();
    const startDateTime = new Date(`${dateStart}T${heure}`);
    const endDate = new Date(dateFin);

    if (!dateStart) {
      toast.error("Pick-Up Date is required");
      isValid = false;
    } else if (!heure) {
      toast.error("Time is required");
      isValid = false;
    } else if (!dateFin) {
      toast.error("Drop-Off Date is required");
      isValid = false;
    } else if (startDateTime <= now) {
      toast.error("Pick-Up Date and Time must be in the future");
      isValid = false;
    } else if (endDate <= startDateTime) {
      toast.error("Drop-Off Date must be after Pick-Up Date");
      isValid = false;
    }
    return isValid;
  };

  const bookingCar = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (paymentOnline) {
      navigate("/payment", {
        state: {
          dateStart,
          dateFin,
          heure,
          delivery,
          driver,
          car,
          amount,
        },
      });
    } else {
      await submitBooking();
    }
  };
  
  const submitBooking = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        `${API_URL}/booking`,
        {
          dateStart: dateStart,
          dateFin: dateFin,
          heure: heure,
          delivery: delivery,
          driver: driver,
          isPayOnline: paymentOnline,
          carId: car._id,
          isPayed: false,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <div className="form-floating mb-3 d-flex w-100">
        <input
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
          type="date"
          className="form-control"
          id="dateStart"
          placeholder="Pick-Up Date"
          min={getCurrentDate()}
        />
        <label htmlFor="dateStart">Pick-Up Date</label>
      </div>
      <div className="form-floating mb-3 d-flex w-100">
        <input
          value={heure}
          onChange={(e) => setHeure(e.target.value)}
          type="time"
          className="form-control"
          id="heure"
          placeholder="Time"
        />
        <label htmlFor="heure">Time</label>
      </div>
      <div className="form-floating mb-3 d-flex w-100">
        <input
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
          type="date"
          className="form-control"
          id="dateFin"
          placeholder="Drop-Off Date"
          min={dateStart}
        />
        <label htmlFor="dateFin">Drop-Off Date</label>
      </div>

      <div className="form-check form-switch px-0 mb-3 d-flex justify-content-between">
        <label className="form-check-label" htmlFor="withDriver">
          With Driver
        </label>
        <input
          checked={driver}
          onChange={(e) => setDriver(e.target.checked)}
          className="form-check-input"
          type="checkbox"
          id="withDriver"
        />
      </div>
      <div className="form-check form-switch px-0 mb-3 d-flex justify-content-between">
        <label className="form-check-label" htmlFor="withDelivery">
          With Delivery
        </label>
        <input
          checked={delivery}
          onChange={(e) => setDelivery(e.target.checked)}
          className="form-check-input"
          type="checkbox"
          id="withDelivery"
        />
      </div>
      <div className="form-check form-switch px-0 mb-3 d-flex justify-content-between">
        <label className="form-check-label" htmlFor="paymentOnline">
          Payment Online
        </label>
        <input
          checked={paymentOnline}
          onChange={(e) => setPaymentOnline(e.target.checked)}
          className="form-check-input"
          type="checkbox"
          id="paymentOnline"
        />
      </div>
      {user ? (
        <button onClick={bookingCar} className="p-2 w-100">
          {isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Book"
          )}
        </button>
      ) : (
        <Link className="link" to="/login">
          <button className="p-2 w-100">PLEASE LOGIN TO BOOK</button>
        </Link>
      )}
    </div>
  );
}

export default BookingForm;
