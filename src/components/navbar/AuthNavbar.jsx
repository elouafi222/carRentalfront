import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

function AuthNavbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <>
      {user ? (
        <>
          {user.role === 1 && (
            <Link to={`/adminstration`} className="nav-link px-1 me-lg-4">
              <i className="fa-solid fa-user-tie me-1"></i>
              <span className="d-none d-lg-inline  text-capitalize">
                Admin Espace
              </span>
            </Link>
          )}
          {user.role === 2 && (
            <Link to={`/adminstration`} className="nav-link px-1 me-lg-4">
              <i className="fa-solid fa-user-tie me-1"></i>
              <span className="d-none d-lg-inline  text-capitalize">
                Manager Espace
              </span>
            </Link>
          )}
          <Link to={`/profile/${user._id}`} className="nav-link px-1 me-lg-4">
            <i className="fa-regular fa-user me-1"></i>
            <span className="d-none d-lg-inline  text-capitalize">
              {user?.firstname}
            </span>
          </Link>
          <i
            onClick={logout}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Tooltip on top"
            className="fa-solid fa-arrow-right-from-bracket px-1 pointer"
          ></i>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link px-1">
            <button className="px-1"> Login</button>
          </Link>
        </>
      )}
    </>
  );
}

export default AuthNavbar;
