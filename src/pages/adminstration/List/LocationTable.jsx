import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { API_URL, CARS_PER_PAGE } from "../../../util/constants";
import AdminSidebar from "../AdminSidebar";
import Loader from "../../../components/Loader";
import AddLocation from "../../modals/location/AddLocation";
import UpdateLocation from "../../modals/location/UpdateLocation";
import DeleteLocation from "../../modals/location/DeleteLocation";
import { Helmet, HelmetProvider } from "react-helmet-async";

function LocationTable() {
  const { user } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [locations, setlocations] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(count / CARS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchlocations();
  }, [currentPage, searchText]);

  const fetchlocations = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_URL}/location?search=${searchText}&page=${currentPage}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setlocations(res.data.locations);
      setCount(res.data.count);
    } catch (error) {
      console.log("Fetching locations failed" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Espace - Locations List</title>
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
                    <span className="ms-2 three">Locations list</span>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-2 ">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target={`#addlocation`}
                    className="w-100 h-100 "
                  >
                    Add Location <i className="fa-solid fa-circle-plus"></i>
                  </button>
                </div>

                <div className="col-md-10 mt-2 mt-lg-0 cars-search">
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    className="form-control w-100"
                    placeholder="Name, City, Adresse"
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>

              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div className="box-white mt-2 table-container table-responsive-lg  box-grey  p-2 ">
                    {locations?.length > 0 ? (
                      <table className="table text-start">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">City </th>
                            <th scope="col">Adresse</th>
                            <th scope="col">Manager</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {locations.map((item, index) => {
                              return (
                                <Fragment key={item?._id}>
                                  <tr>
                                    <td scope="row">{index + 1}</td>
                                    <td scope="row">{item.name}</td>
                                    <td scope="row">{item.phone}</td>
                                    <td scope="row">{item.cityId.name}</td>
                                    <td scope="row">{item.adresse}</td>
                                    <td scope="row">
                                      <span className="text-capitalize">
                                        {item.managerId.firstname}
                                      </span>
                                      <span className="text-uppercase">
                                        {item.managerId.lastname}
                                      </span>
                                    </td>
                                    <td scope="row">{item.managerId.email}</td>
                                    <td>
                                      <i
                                        data-bs-toggle="modal"
                                        data-bs-target={`#updatelocation-${item?._id}`}
                                        className="fa-solid fa-pen-to-square mx-1 pointer"
                                      ></i>
                                      <i
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deletelocation-${item?._id}`}
                                        className="fa-regular fa-trash-can mx-1 pointer"
                                      ></i>
                                    </td>
                                  </tr>
                                  <UpdateLocation
                                    refreshlocations={fetchlocations}
                                    token={user.token}
                                    item={item}
                                  />
                                  <DeleteLocation
                                    refreshlocations={fetchlocations}
                                    token={user.token}
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
                  {locations.length > 0 && (
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
        <AddLocation token={user.token} refreshlocations={fetchlocations} />
      </div>
    </HelmetProvider>
  );
}

export default LocationTable;
