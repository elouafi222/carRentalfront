import React from "react";
function BookingDetails({ booking }) {
  console.log(booking);
  return (
    <div
      className="modal fade"
      id={`bookingDetails-${booking?._id}`}
      tabIndex="-1"
      aria-labelledby="bookingDetailsLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <form className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="bookingDetailsLabel">
              Request Details
            </h1>
            <i
              type="button"
              className="fa-solid fa-xmark"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></i>
          </div>
          <div className="modal-body modal-details-box">
            <div className="mx-3 row box-grey px-3 py-2 ">
              <div className="col-md-12 text-start">
                <h2>
                  <span>
                    Reservation ID
                    <br />
                  </span>
                  {booking?._id}
                </h2>
              </div>
            </div>
            <div className="mx-3 row box-grey px-3 py-2 d-flex flex-row justify-content-between mt-3">
              <div className="col-md-12 text-start">
                <h2>
                  <span>
                    Car
                    <br />
                  </span>
                  {booking?.carId?.brand}
                </h2>
              </div>
              <div className="col-md-12 text-start">
                <h2>
                  <span>
                    {" "}
                    Location
                    <br />
                  </span>
                  {booking?.carId.locationId?.name}
                </h2>
              </div>
              <div className="col-md-4 text-start">
                <h2>
                  <span>
                    {" "}
                    City
                    <br />
                  </span>
                  {booking?.carId.locationId?.cityId.name}
                </h2>
              </div>
            </div>
            <div className="mx-3 row box-grey px-3 py-2 d-flex flex-row justify-content-between mt-3">
              <div className="col-md-4 text-start">
                <h2>
                  <span>
                    {" "}
                    Pick-Up Date
                    <br />
                  </span>
                  {booking?.dateStart}
                </h2>
              </div>
              <div className="col-md-4 text-start">
                <h2>
                  <span>
                    Time
                    <br />
                  </span>
                  {booking?.heure}
                </h2>
              </div>
              <div className="col-md-4 text-start">
                <h2>
                  <span>
                    {" "}
                    Pick-Off Date
                    <br />
                  </span>
                  {booking?.dateFin}
                </h2>
              </div>
            </div>
            <div className="mx-3 row box-grey px-3 py-2 d-flex flex-row justify-content-between mt-3 ">
              <div className="col-md-4 text-start">
                <h2>
                  <span>
                    Delivery
                    <br />
                  </span>
                  {!booking.delivery ? (
                    <i className="delete-icon fa-solid fa-circle-xmark"></i>
                  ) : (
                    <i className="fa-solid fa-circle-check update-icon"></i>
                  )}
                </h2>
              </div>
              <div className="col-md-4 text-start">
                <h2>
                  <span>
                    Driver
                    <br />
                  </span>
                  {!booking.driver ? (
                    <i className="delete-icon fa-solid fa-circle-xmark"></i>
                  ) : (
                    <i className="fa-solid fa-circle-check update-icon"></i>
                  )}
                </h2>
              </div>
              <div className="col-md-4 text-start">
                <h2>
                  <span>
                    {" "}
                    Payment
                    <br />
                  </span>
                  {booking.isPayOnline ? "Online" : "Cash"}
                </h2>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              id="closeupdateuser"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingDetails;
