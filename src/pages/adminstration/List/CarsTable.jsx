import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { API_URL, CARS_PER_PAGE } from "../../../util/constants";
import AdminSidebar from "../AdminSidebar";
import AddCar from "../../modals/cars/AddCar";
import Loader from "../../../components/Loader";
import UpdateCar from "../../modals/cars/UpdateCar";
import DeleteCar from "../../modals/cars/DeleteCar";
import { Helmet, HelmetProvider } from "react-helmet-async";

import toast from "react-hot-toast";
function CarsTable() {
  const { user } = useSelector((state) => state.auth);

  const [searchText, setSearchText] = useState("");
  const [disponible, setdisponible] = useState("");
  const [cars, setCars] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(count / CARS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [file, setFile] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchCars();
  }, [currentPage, searchText, disponible]);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_URL}/car/administrations?search=${searchText}&disponible=${disponible}&page=${currentPage}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setCars(res.data.cars);
      setCount(res.data.count);
    } catch (error) {
      console.log("Fetching cars failed" + error);
    } finally {
      setIsLoading(false);
    }
  };
  const changeDisponible = async (id) => {
    try {
      await axios.put(
        `${API_URL}/car/disponible/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      toast.success("Car Availiability has been changed successfully.");
      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === id ? { ...car, disponible: !car.disponible } : car
        )
      );
    } catch (error) {
      console.error("Error change status:", error.message);
      toast.error("Something went wrong, Please try later.");
    }
  };
  const updateImageSubmitHandler = async (e, id) => {
    e.preventDefault();
    if (!file) return toast.error("Select profile photo");
    const formData = new FormData();
    formData.append("image", file);
    try {
      setIsLoadingImage(true);
      await axios.put(`${API_URL}/car/car-image-update/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Car image has been successfully updated.");
      fetchCars();
    } catch (error) {
      console.error("Error adding car:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, Please try later.";
      toast.error(errorMessage);
    } finally {
      setIsLoadingImage(false);
      setFile(null);
      setSelectedCarId(null);
    }
  };
  const handleFileChange = (e, id) => {
    setFile(e.target.files[0]);
    setSelectedCarId(id);
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {user.role === 1 ? "Admin Espace" : "Manager Espace"} - Cars List
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
                    <span className="ms-2 three">Cars list</span>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-2 ">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={`#addCar`}
                    className="w-100 h-100 "
                  >
                    {" "}
                    Add car <i className="fa-solid fa-circle-plus"></i>
                  </button>
                </div>
                <div className="col-md-2  mt-2 mt-lg-0">
                  <select
                    value={disponible}
                    onChange={(e) =>
                      setdisponible(
                        e.target.value === "true"
                          ? true
                          : e.target.value === "false"
                          ? false
                          : ""
                      )
                    }
                    className="form-control"
                    id="status"
                  >
                    <option selected disabled value="">
                      Filter By Availability
                    </option>
                    <option value="">All</option>
                    <option value="true">Availiable</option>
                    <option value="false">Not Available</option>
                  </select>
                </div>
                <div className="col-md-8 mt-2 mt-lg-0 cars-search">
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
                    {cars?.length > 0 ? (
                      <table className="table text-start">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Image</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Transmission </th>
                            <th scope="col">Fuel</th>
                            <th scope="col">Seats</th>
                            <th scope="col">Price/Day</th>
                            {user.role === 1 && (
                              <>
                                <th scope="col">Location</th>
                                <th scope="col">City</th>
                              </>
                            )}

                            <th scope="col">Rating</th>
                            <th scope="col">Availability</th>
                            <th scope="col">Change Image</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {cars.map((item, index) => {
                              const totalStars =
                                item?.rating?.length > 0
                                  ? item.rating.reduce(
                                      (acc, curr) => acc + curr.rateStars,
                                      0
                                    )
                                  : 0;
                              const average =
                                item?.rating?.length > 0
                                  ? Math.ceil(totalStars / item.rating.length)
                                  : 0;
                              return (
                                <Fragment key={item?._id}>
                                  <tr>
                                    <td scope="row">{index + 1}</td>
                                    <td>
                                      <Link
                                        className="link"
                                        to={`/booking/${item._id}`}
                                      >
                                        {isLoadingImage &&
                                        selectedCarId === item._id ? (
                                          <div
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                          ></div>
                                        ) : (
                                          <img
                                            src={item.image.url}
                                            alt={item.brand}
                                          />
                                        )}
                                      </Link>
                                    </td>
                                    <td>
                                      <Link
                                        className="link"
                                        to={`/booking/${item._id}`}
                                      >
                                        {item?.brand} {item?.model}
                                      </Link>
                                    </td>
                                    <td>{item.transmission}</td>
                                    <td>{item.fuel}</td>
                                    <td>{item.seats}</td>
                                    <td>{item.price}DH</td>
                                    {user.role === 1 && (
                                      <>
                                        <td>
                                          <Link
                                            className="link"
                                            to={`/cars?loc=${item.locationId}`}
                                          >
                                            {item?.location?.name}
                                          </Link>
                                        </td>
                                        <td>
                                          <Link
                                            className="link"
                                            to={`/cars?city=${item.city.name}`}
                                          >
                                            {item.city.name}
                                          </Link>
                                        </td>
                                      </>
                                    )}

                                    <td>
                                      {average}/5{" "}
                                      <span className="small-text">
                                        {item.rating?.length} raters
                                      </span>{" "}
                                    </td>

                                    <td>
                                      {item.disponible ? (
                                        <i className="me-3 fa-solid fa-circle update-icon ms-1"></i>
                                      ) : (
                                        <i className="me-3 fa-solid fa-circle delete-icon ms-1"></i>
                                      )}
                                      <i
                                        onClick={() =>
                                          changeDisponible(item?._id)
                                        }
                                        className="pointer fa-solid fa-arrows-rotate"
                                      ></i>
                                    </td>
                                    <td className="d-flex align-items-center">
                                      <input
                                        type="file"
                                        className="form-control"
                                        id={`image-${item?._id}`}
                                        placeholder="Image"
                                        title="Select New Image"
                                        hidden
                                        onChange={(e) =>
                                          handleFileChange(e, item?._id)
                                        }
                                      />
                                      <i
                                        className="fa-solid fa-image pointer"
                                        onClick={() =>
                                          document
                                            .getElementById(
                                              `image-${item?._id}`
                                            )
                                            .click()
                                        }
                                      ></i>
                                      {selectedCarId === item._id && (
                                        <button
                                          className="ms-2"
                                          onClick={(e) =>
                                            updateImageSubmitHandler(
                                              e,
                                              item?._id
                                            )
                                          }
                                        >
                                          Change
                                        </button>
                                      )}
                                    </td>
                                    <td>
                                      <i
                                        data-bs-toggle="modal"
                                        data-bs-target={`#updatecar-${item?._id}`}
                                        className="fa-solid fa-pen-to-square mx-1 pointer"
                                      ></i>
                                      <i
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deletecar-${item?._id}`}
                                        className="fa-regular fa-trash-can mx-1 pointer"
                                      ></i>
                                    </td>
                                  </tr>

                                  <UpdateCar
                                    refreshCars={fetchCars}
                                    user={user}
                                    item={item}
                                  />
                                  <DeleteCar
                                    refreshCars={fetchCars}
                                    user={user}
                                    id={item._id}
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
        <AddCar user={user} refreshCars={fetchCars} />
      </div>
    </HelmetProvider>
  );
}

export default CarsTable;
