import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { API_URL, CARS_PER_PAGE } from "../../../util/constants";
import AdminSidebar from "../AdminSidebar";
import Loader from "../../../components/Loader";
import ChangeStatusBook from "../../modals/booking/ChangeStatusBook";
import BookingDetails from "../../modals/booking/BookingDetails";
import { Helmet, HelmetProvider } from "react-helmet-async";

import calculateAmount from "../../../lib/util";

function RequestTable() {
  const { user } = useSelector((state) => state.auth);
  const [reqs, setreqs] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(count / CARS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchreqs();
  }, [currentPage]);

  const fetchreqs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_URL}/booking/requests?page=${currentPage}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setreqs(res.data.bookings);
      setCount(res.data.count);
    } catch (error) {
      console.log("Fetching reqs failed" + error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {user.role === 1 ? "Admin Espace" : "Manager Espace"} - Booking
          Requests
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
                    <span className="ms-2 three">Booking Requests</span>
                  </div>
                </div>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div className="box-white mt-2 table-container table-responsive-lg  box-grey  p-2 ">
                    {reqs?.length > 0 ? (
                      <table className="table text-start">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Date Start</th>
                            <th scope="col">Date Fin</th>
                            <th scope="col">Time</th>
                            <th scope="col">Car</th>
                            <th scope="col">Price/Day</th>
                            <th scope="col">Amount</th>
                            {user.role === 1 && <th scope="col">Location</th>}
                            <th scope="col">Customer </th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {reqs.map((item, index) => {
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
                                    <td>{item.carId.price}</td>
                                    <td>
                                      {calculateAmount(
                                        item.dateStart,
                                        item.dateFin,
                                        item.carId?.price
                                      )}{" "}
                                      DH
                                    </td>
                                    {user.role === 1 && (
                                      <td>
                                        {item.carId.locationId?.name +
                                          " - " +
                                          item.carId.locationId?.cityId.name}
                                      </td>
                                    )}

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
                                      <i
                                        data-bs-toggle="modal"
                                        data-bs-target={`#changeStatus-${item?._id}`}
                                        className="fa-solid fa-pen-to-square mx-1 pointer"
                                      ></i>
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
                                  <ChangeStatusBook
                                    refreshreqs={fetchreqs}
                                    user={user}
                                    item={item}
                                  />
                                </Fragment>
                              );
                            })}
                          </>
                        </tbody>
                      </table>
                    ) : (
                      <p className="m-0 mt-3">
                        No result <br />
                        <i className="fa-solid fa-circle-exclamation"></i>
                      </p>
                    )}
                  </div>
                  {reqs.length > 0 && (
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

export default RequestTable;
