import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "./modals/profile/UpdateProfile";
import { getUserProfile } from "../redux/apiCalls/profileApiCall";
import DeleteAccount from "./modals/profile/DeleteAccount";
import Loader from "../components/Loader";
import BookingsHistory from "../components/bookings/BookingsHistory";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>
          Profile - {`${profile?.firstname + " " + profile?.lastname}`}
        </title>
      </Helmet>
      <div className="p-4  px-lg-5 profile-page">
        <div className="page-path  px-3 py-1">
          <Link to="/" className="link">
            <span className="one">
              Home<i className="fa-solid fa-chevron-right ms-1"></i>{" "}
            </span>
          </Link>
          <span className="ms-2 two">
            Profile <i className="fa-solid fa-chevron-right ms-1"></i>{" "}
          </span>
          {!loading && (
            <span className="ms-2 three">
              <span className="text-capitalize">
                {profile?.firstname + " "}
              </span>
              <span className="text-uppercase">{profile?.lastname}</span>
            </span>
          )}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className=" profile-box mt-3 car-info p-3">
              <div className="box-grey px-3 py-2 d-flex flex-column flex-lg-row justify-content-between ">
                <h2>
                  <span>Firstname </span>
                  <br />
                  <p className="text-capitalize m-0">{profile?.firstname}</p>
                </h2>
                <h2>
                  {" "}
                  <span>Lastname </span>
                  <br />
                  <p className="text-uppercase m-0">{profile?.lastname}</p>
                </h2>
                <h2>
                  <span>Email </span>
                  <br /> {profile?.email}
                </h2>

                <h2>
                  {" "}
                  <span>Phone </span>
                  <br />
                  {profile?.phone}
                </h2>
                <h2
                  data-bs-toggle="modal"
                  data-bs-target={`#updateProfile-${profile?._id}`}
                  className="pointer"
                >
                  {" "}
                  <span>Update</span>
                  <br />
                  <i className="fa-regular fa-pen-to-square"></i>
                </h2>
                <h2
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteProfile-${profile?._id}`}
                  className="pointer"
                >
                  {" "}
                  <span>Delete Account</span>
                  <br />
                  <i className="fa-regular fa-trash-can"></i>
                </h2>
                <UpdateProfile profile={profile} />
                <DeleteAccount id={profile?._id} />
              </div>
            </div>
            {profile?.books && <BookingsHistory books={profile?.books} />}
          </>
        )}
      </div>
    </HelmetProvider>
  );
}

export default Profile;
