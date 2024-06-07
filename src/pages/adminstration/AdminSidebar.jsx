import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import logo from "../../img/icon.png";
import { getBookingsRequestsCount } from "../../redux/apiCalls/bookingRequestApiCall";
function AdminSidebar() {
  const { user } = useSelector((state) => state.auth);
  const { count } = useSelector((state) => state.bookingRequest);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(getBookingsRequestsCount());
  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div className="admin-sidebar py-2 ms-2 col-auto ">
      <div className="box-white py-2 d-flex flex-column justify-content-between  align-items-center  h-100">
        <Link to="/" className="link">
          <img src={logo} alt="CAR RENTAL" className="img-fluid logo" />
        </Link>
        <ul
          className="nav nav-pills flex-column mb-0 align-items-center"
          id="menu"
        >
          <hr />
          <li className="nav-item">
            <Link to="/adminstration" className="nav-link">
              <i className="fa-solid fa-house"></i>
            </Link>
          </li>
          <li>
            <Link to="/adminstration/cars" className="nav-link">
              <i className="fa-solid fa-car"></i>
            </Link>
          </li>

          {user.role === 1 && (
            <li>
              <Link to="/adminstration/locations" className="nav-link">
                <i className="fa-solid fa-building"></i>
              </Link>
            </li>
          )}
          {user.role === 1 && (
            <li>
              <Link to="/adminstration/customers" className="nav-link">
                <i className="fa-solid fa-users"></i>
              </Link>
            </li>
          )}
          {user.role === 1 && (
            <li>
              <Link to="/adminstration/cities" className="nav-link">
                <i className="fa-solid fa-location-dot"></i>
              </Link>
            </li>
          )}
          <li>
            <Link to="/adminstration/requests" className="nav-link">
              <div class="notifier new">
                <i className="fa-solid fa-bell"></i>
                {count > 0 && <div className="badge"> {count}</div>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/adminstration/bookingsHistory" className="nav-link">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </Link>
          </li>
          <li>
            <Link to="/adminstration/payments" className="nav-link">
              <i className="fa-solid fa-sack-dollar"></i>
            </Link>
          </li>
        </ul>
        <ul className=" nav nav-pills flex-column  mb-0 align-items-center align-items-sm-start">
          <li className="nav-item">
            <Link to={`/profile/${user._id}`} className="nav-link">
              <i className="fa-regular fa-user"></i>
            </Link>
          </li>
          <li className="nav-item">
            <span to="" className="nav-link">
              <i
                onClick={logout}
                className="fa-solid fa-arrow-right-from-bracket pointer"
              ></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
