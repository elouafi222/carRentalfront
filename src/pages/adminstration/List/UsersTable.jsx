import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { useSelector } from "react-redux";
import { API_URL, CARS_PER_PAGE } from "../../../util/constants";
import AdminSidebar from "../AdminSidebar";
import Loader from "../../../components/Loader";
import moment from "moment";
import DeleteUser from "../../modals/user/DeleteUser";
import { Helmet, HelmetProvider } from "react-helmet-async";

function UsersTable() {
  const { user } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [users, setusers] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(count / CARS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchText]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/users?search=${searchText}`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      setusers(res.data.users);
      setCount(res.data.count);
    } catch (error) {
      console.log("Fetching users failed" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Admin Espace - Users List</title>
      </Helmet>
      <div className="admin-home">
        <div className="row flex-nowrap">
          <AdminSidebar />
          <div className="col py-2 ps-0 pe-2  left">
            <div className=" ">
              <div className="row mb-2">
                <div className="col-md-6 text-start ">
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
                    <span className="ms-2 three">Users list</span>
                  </div>
                </div>
                <div className="col-md-6 mt-2 mt-lg-0 cars-search">
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
                    {users?.length > 0 ? (
                      <table className="table text-start">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone </th>
                            <th scope="col">Joined</th>
                            <th scope="col">Type</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            {users.map((item, index) => {
                              return (
                                <Fragment key={item?._id}>
                                  <tr>
                                    <td scope="row">{index + 1}</td>
                                    <td scope="row">
                                      <span className="text-capitalize">
                                        {item.firstname + " "}
                                      </span>
                                      <span className="text-uppercase">
                                        {item.lastname}
                                      </span>
                                    </td>
                                    <td scope="row">{item.email}</td>
                                    <td scope="row">{item.phone}</td>
                                    <td scope="row">
                                      {moment(item?.createdAt).format(
                                        "MMM Do YY"
                                      )}
                                    </td>

                                    <td scope="row">
                                      {(() => {
                                        switch (item.role) {
                                          case 1:
                                            return <span>Admin</span>;
                                          case 2:
                                            return <span>Manager</span>;
                                          default:
                                            return "Customer";
                                        }
                                      })()}
                                    </td>
                                    <td>
                                      <i
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deleteUser-${item?._id}`}
                                        className="fa-regular fa-trash-can mx-1 pointer"
                                      ></i>
                                    </td>
                                  </tr>
                                  <DeleteUser
                                    refreshCars={fetchUsers}
                                    id={item?._id}
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
                  {users.length > 0 && (
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

export default UsersTable;
