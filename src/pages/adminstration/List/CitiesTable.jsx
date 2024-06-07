import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { API_URL, CARS_PER_PAGE } from "../../../util/constants";
import AdminSidebar from "../AdminSidebar";
import Loader from "../../../components/Loader";
import AddCity from "../../modals/city/AddCity";
import UpdateCity from "../../modals/city/UpdatCity";
import DeleteCity from "../../modals/city/DeleteCity";
import { Helmet, HelmetProvider } from "react-helmet-async";

function CitiesTable() {
  const { user } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [cities, setcities] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(count / CARS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchCities();
  }, [currentPage, searchText]);

  const fetchCities = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_URL}/city?search=${searchText}&page=${currentPage}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setcities(res.data.cities);
      setCount(res.data.count);
    } catch (error) {
      console.log("Fetching cities failed" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Espace - Cities List</title>
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
                    <span className="ms-2 three">Cities list</span>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-2 ">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={`#addCity`}
                    className="w-100 h-100 "
                  >
                    {" "}
                    Add City <i className="fa-solid fa-circle-plus"></i>
                  </button>
                </div>

                <div className="col-md-10 mt-2 mt-lg-0 cars-search">
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    className="form-control w-100"
                    placeholder="City, Brand, Price per day, etc ..."
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div className="box-white mt-2 table-container table-responsive-lg  box-grey  p-2 ">
                    {cities?.length > 0 ? (
                      <table className="table text-start">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Name</th>
                            <th scope="col">Locations</th>
                            <th scope="col">Cars</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {cities.map((item, index) => {
                              return (
                                <Fragment key={item?._id}>
                                  <tr>
                                    <td scope="row">{index + 1}</td>
                                    <td scope="row">
                                      <Link
                                        className="link"
                                        to={`/cars?city=${item.name}`}
                                      >
                                        {item.name}
                                      </Link>
                                    </td>
                                    <td scope="row">{item.locationCount}</td>
                                    <td scope="row">{item.carCount}</td>
                                    <td>
                                      <i
                                        data-bs-toggle="modal"
                                        data-bs-target={`#updatecity-${item?._id}`}
                                        className="fa-solid fa-pen-to-square mx-1 pointer"
                                      ></i>
                                      <i
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deleteCity-${item?._id}`}
                                        className="fa-regular fa-trash-can mx-1 pointer"
                                      ></i>
                                    </td>
                                  </tr>
                                  <DeleteCity
                                    id={item._id}
                                    token={user.token}
                                    refreshCities={fetchCities}
                                  />
                                  <UpdateCity
                                    item={item}
                                    token={user.token}
                                    refreshCities={fetchCities}
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
                  {cities.length > 0 && (
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
        <AddCity token={user.token} refreshCities={fetchCities} />
      </div>
    </HelmetProvider>
  );
}

export default CitiesTable;
