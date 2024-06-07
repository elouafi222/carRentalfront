import axios from "axios";
import React, { useEffect, useState } from "react";
import ErrorAlert from "../../../components/ErrorAlert";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../util/constants";
import { getUserProfile } from "../../../redux/apiCalls/profileApiCall";
import toast from "react-hot-toast";
function UpdateBooking({ booking }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [heure, setHeure] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [driver, setDriver] = useState(false);
  const [paymentOnline, setPaymentOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const validateForm = () => {
    let isValid = true;
    if (!dateStart) {
      toast.error("Pick-Up Date is required");
      isValid = false;
    } else if (!heure) {
      toast.error("Time is required");
      isValid = false;
    } else if (!dateFin) {
      toast.error("Drop-Off Date is required");
      isValid = false;
    } else if (new Date(dateFin) <= new Date(dateStart)) {
      toast.error("Drop-Off Date must be after Pick-Up Date");
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    setDateStart(booking?.dateStart);
    setHeure(booking?.heure);
    setDateFin(booking?.dateFin);
    setDelivery(booking?.delivery);
    setDriver(booking?.driver);
    setPaymentOnline(booking?.isPayOnline);
  }, [booking]);

  const updateReserv = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      setIsLoading(true);
      await axios.put(
        `${API_URL}/booking/${booking._id}`,
        {
          dateStart: dateStart,
          dateFin: dateFin,
          heure: heure,
          delivery: delivery,
          driver: driver,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      document.getElementById("closeupdatereq").click();
      document
        .getElementsByClassName("modal-backdrop")[0]
        .classList.remove("modal-backdrop");
      toast.success("Booking request has been updated successfully.");
      dispatch(getUserProfile(user._id));
    } catch (error) {
      console.error("Error update booking:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id={`updateBooking-${booking?._id}`}
      tabIndex="-1"
      aria-labelledby="updateBookingLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <form className="modal-content" onSubmit={updateReserv}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="updateBookingLabel">
              Update Request
            </h1>
            <i
              type="button"
              className="fa-solid fa-xmark"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></i>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3  ">
              <input
                min={getCurrentDate()}
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                type="date"
                className="form-control"
                id="dateStart"
                placeholder="Pick-Up Date"
              />
              <label htmlFor="dateStart">Pick-Up Date</label>
            </div>
            <div className="form-floating mb-3  ">
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
            <div className="form-floating mb-3  ">
              <input
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                type="date"
                className="form-control"
                id="dateFin"
                placeholder="Drop-Off Date"
              />
              <label min={dateStart} htmlFor="dateFin">
                Drop-Off Date
              </label>
            </div>
            <div className="form-check form-switch px-4 mb-3 d-flex justify-content-between">
              <label className="form-check-label " htmlFor="withDriver">
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
            <div className="form-check form-switch  px-4 mb-3 d-flex justify-content-between">
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
            <div className="form-check form-switch  px-4 mb-3 d-flex justify-content-between">
              <label className="form-check-label" htmlFor="paymentOnline">
                Payment Online
              </label>
              <input
                disabled
                checked={paymentOnline}
                onChange={(e) => setPaymentOnline(e.target.checked)}
                className="form-check-input"
                type="checkbox"
                id="paymentOnline"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              id="closeupdatereq"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="px-3 py-1">
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Save chnages"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBooking;
