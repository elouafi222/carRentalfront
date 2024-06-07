import React from "react";
import { Link } from "react-router-dom";
import UpdateBooking from "../../pages/modals/booking/UpdateBooking";
import BookingDetails from "../../pages/modals/booking/BookingDetails";
import CancelBook from "../../pages/modals/booking/CancelBook";
import calculateAmount from "../../lib/util";

function BookingsHistory({ books }) {
  return (
    <div className="reservation-box mt-3 p-3">
      <h1>
        <i className="fa-solid fa-clock-rotate-left mb-3 me-2"></i>Reservations
        History ({books.length})
      </h1>
      <div className="table-responsive-md box-grey px-3 py-2 ">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">N°</th>
              <th scope="col">Date Start</th>
              <th scope="col">Date Fin </th>
              <th scope="col">Car</th>
              <th scope="col">Location</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Cancel</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {books?.length > 0 ? (
              <>
                {books.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td scope="row">{index + 1}</td>
                        <td>{item.dateStart}</td>
                        <td>{item.dateFin}</td>
                        <td>
                          <Link
                            className="link"
                            to={`/booking/${item.carId?._id}`}
                          >
                            {item?.carId?.brand}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="link"
                            to={`/cars?loc=${item.carId?.locationId?._id}`}
                          >
                            {item?.carId?.locationId?.name}
                          </Link>
                        </td>
                        <td>
                          {calculateAmount(
                            item.dateStart,
                            item.dateFin,
                            item.carId?.price
                          )}{" "}
                          DH
                        </td>
                        <td>
                          {(() => {
                            switch (item.status) {
                              case 1:
                                return (
                                  <span>
                                    {" "}
                                    Requested
                                    <i className="fa-solid fa-hourglass-start ms-1"></i>
                                  </span>
                                );
                              case 2:
                                return (
                                  <span>
                                    In progress
                                    <i className="fa-solid fa-circle-check ms-1 update-icon"></i>
                                  </span>
                                );
                              case 3:
                                return (
                                  <span>
                                    Completed
                                    <i className="fa-solid fa-hourglass ms-1"></i>
                                  </span>
                                );
                              case 4:
                                return (
                                  <span>
                                    Cancelled{" "}
                                    <i className="fa-solid fa-circle-exclamation ms-1 delete-icon"></i>
                                  </span>
                                );
                              default:
                                return "Unknown";
                            }
                          })()}
                        </td>
                        <td>
                          {item.status === 1 ? (
                            <i
                              data-bs-toggle="modal"
                              data-bs-target={`#changeStatus-${item?._id}`}
                              className="fa-solid fa-circle-xmark pointer"
                            ></i>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <i
                            data-bs-toggle="modal"
                            data-bs-target={`#bookingDetails-${item?._id}`}
                            className="fa-solid fa-arrow-up-right-from-square mx-1 pointer"
                          ></i>
                          {item.status === 1 && (
                            <i
                              data-bs-toggle="modal"
                              data-bs-target={`#updateBooking-${item?._id}`}
                              className="fa-regular fa-pen-to-square mx-1 pointer"
                            ></i>
                          )}
                        </td>
                      </tr>
                      <CancelBook id={item._id} />
                      <BookingDetails booking={item} />
                      <UpdateBooking booking={item} />
                    </>
                  );
                })}
              </>
            ) : (
              <tr className="text-center">
                <td colSpan={8}>
                  {" "}
                  <p className="m-0 mt-3">
                    No reservations yet{" "}
                    <i className="fa-solid fa-circle-exclamation"></i>
                  </p>{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingsHistory;
