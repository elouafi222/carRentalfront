import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { API_URL, CARS_PER_PAGE } from "../../../util/constants";
import AdminSidebar from "../AdminSidebar";
import Loader from "../../../components/Loader";
import FinishBook from "../../modals/booking/FinishBook";
import BookingDetails from "../../modals/booking/BookingDetails";
import { Helmet, HelmetProvider } from "react-helmet-async";

import calculateAmount from "../../../lib/util";

function BookingsTable() {
  const { user } = useSelector((state) => state.auth);
  const [status, setstatus] = useState("");
  const [bookid, setbookid] = useState("");
  const [cars, setCars] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(count / CARS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchBooking();
  }, [currentPage, status, bookid]);

  const fetchBooking = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_URL}/booking?status=${status}&bookid=${bookid}&page=${currentPage}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setCars(res.data.bookings);
      setCount(res.data.count);
    } catch (error) {
      console.log("Fetching cars failed" + error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {user.role === 1 ? "Admin Espace" : "Manager Espace"} - Bookings
          History
        </title>
      </Helmet>
      <div className="admin-home">
        <div className="row flex-nowrap">
          <AdminSidebar />
          <div className="col py-2 ps-0 pe-2  left">
            <div className=" ">
              <div className="row mb-2">
                <div className="col-md-12 text-start ">
                  <div className="page-path px-3 py-1">
                    <Link to="/" className="link">
                      <span className="one">
                        Home<i className="fa-solid fa-chevron-right ms-1"></i>{" "}
                      </span>
                    </Link>
                    <span className="ms-2 two">
                      {user.role === 1 ? "Admin" : "Manager"}{" "}
                      <i className="fa-solid fa-chevron-right ms-1"></i>{" "}
                    </span>
                    <span className="ms-2 three">Bookings History</span>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-2 ">
                  <select
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}
                    className="form-control"
                    id="status"
                  >
                    <option selected disabled value="">
                      Filter By Status
                    </option>
                    <option value="">All</option>
                    <option value="2">In progress</option>
                    <option value="3">Completed</option>
                    <option value="4">Canceled</option>
                  </select>
                </div>

                <div className="col-md-10 mt-2 mt-lg-0 cars-search">
                  <input
                    value={bookid}
                    onChange={(e) => setbookid(e.target.value)}
                    type="text"
                    className="form-control w-100"
                    placeholder="Booking ID"
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>

              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div className="box-white mt-2 table-container table-responsive-lg  box-grey  p-2 ">
                    {cars?.length > 0 ? (
                      <table className="table text-start">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Date Start</th>
                            <th scope="col">Date Fin</th>
                            <th scope="col">Time</th>
                            <th scope="col">Car</th>
                            {user.role === 1 && <th scope="col">Location</th>}
                            <th>Price/Day</th>
                            <th>Amount</th>
                            <th scope="col">Customer </th>
                            <th scope="col">Phone</th>
                            <th scope="col">Status</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Action</th>
                            <th scope="col">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {cars.map((item, index) => {
                              return (
                                <Fragment key={item?._id}>
                                  <tr>
                                    <td scope="row">{index + 1}</td>
                                    <td>{item.dateStart}</td>
                                    <td>{item.dateFin}</td>
                                    <td>{item.heure}</td>
                                    <td>
                                      {item.carId.brand +
                                        " " +
                                        item.carId.model}
                                    </td>
                                    {user.role === 1 && (
                                      <td>
                                        {item.carId.locationId?.name +
                                          " " +
                                          item.carId.locationId?.cityId.name}
                                      </td>
                                    )}
                                    <td>{item.carId.price}</td>
                                    <td>
                                      {calculateAmount(
                                        item.dateStart,
                                        item.dateFin,
                                        item.carId?.price
                                      )}{" "}
                                      DH
                                    </td>
                                    <td>
                                      <span className="text-capitalize">
                                        {item.userId.firstname + " "}
                                      </span>
                                      <span className="text-uppercase">
                                        {item.userId.lastname}
                                      </span>
                                    </td>
                                    <td>{item.userId.phone}</td>
                                    <td>
                                      {(() => {
                                        switch (item.status) {
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
                                    <td>{item?.isPayed ? "YES" : "NO"}</td>
                                    <td>
                                      {item.status === 2 ? (
                                        <span
                                          className="pointer"
                                          data-bs-toggle="modal"
                                          data-bs-target={`#makecompleted-${item?._id}`}
                                        >
                                          Finish
                                        </span>
                                      ) : (
                                        "-"
                                      )}
                                    </td>

                                    <td>
                                      <i
                                        className="fa-solid fa-arrow-up-right-from-square mx-1 pointer"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#bookingDetails-${item?._id}`}
                                      ></i>
                                    </td>
                                  </tr>
                                  <BookingDetails booking={item} />
                                  <FinishBook
                                    refreshbookings={fetchBooking}
                                    id={item._id}
                                    token={user.token}
                                  />
                                </Fragment>
                              );
                            })}
                          </>
                        </tbody>
                      </table>
                    ) : (
                      <p className="m-0 mt-3">
                        No result{" "}
                        <i className="fa-solid fa-circle-exclamation"></i>
                      </p>
                    )}
                  </div>
                  {cars.length > 0 && (
                    <Pagination
                      pages={pages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default BookingsTable;
