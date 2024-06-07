import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../util/constants";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";

function StatisticsBox({ user }) {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalCustomers: 0,
    totalRequests: 0,
    totalCompleted: 0,
    requestChange: 0,
    completedChange: 0,
  });

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await axios.get(`${API_URL}/booking/statistics`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });
        setLoading(false);
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStatistics();
  }, [user.token]);
  return (
    <div className="row statistics">
      {user.role === 1 && (
        <div className="col-lg-4 col-md-4 col-sm-12 p-1">
          <div className="box-white px-3 py-2 text-start">
            <div className="d-flex align-items-center">
              <div className="box-grey p-2 me-2">
                <i className="fa-regular fa-user"></i>
              </div>
              <h1 className="title m-0">Total customers</h1>
            </div>
            <h1 className="total m-0">+{statistics.totalCustomers}</h1>
            <div className="d-flex align-items-center justify-content-between percent">
              <span className="d-flex align-items-center">
                <i className="fa-solid fa-arrow-up me-2"></i>
                <p className="m-0">10.5%</p>
              </span>
              <p className="m-0">Last week</p>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${user.role === 1 ? "col-md-4" : "col-md-6"} col-sm-12 p-1`}
      >
        <div className="box-white px-3 py-2 text-start">
          <div className="d-flex align-items-center">
            <div className="box-grey p-2 me-2">
              <i className="fa-regular fa-bell"></i>
            </div>
            <h1 className="title m-0">Total requests</h1>
          </div>
          <h1 className="total m-0">+{statistics.totalRequests}</h1>
          <div className="d-flex align-items-center justify-content-between percent">
            <span className="d-flex align-items-center">
              <i
                className={`fa-solid ${
                  statistics.requestChange >= 0
                    ? "fa-arrow-up"
                    : "fa-arrow-down"
                } me-2`}
              ></i>
              <p className="m-0">{statistics.requestChange.toFixed(1)}%</p>
            </span>
            <p className="m-0">Last week</p>
          </div>
        </div>
      </div>
      <div
        className={`${
          user.role === 1 ? "col-md-4" : "col-md-6"
        } col-sm-12 p-1`}
      >
        <div className="box-white px-3 py-2 text-start">
          <div className="d-flex align-items-center">
            <div className="box-grey p-2 me-2">
              <i className="fa-solid fa-hourglass-end"></i>
            </div>
            <h1 className="title m-0">Total completed</h1>
          </div>
          <h1 className="total m-0">+{statistics.totalCompleted}</h1>
          <div className="d-flex align-items-center justify-content-between percent">
            <span className="d-flex align-items-center">
              <i
                className={`fa-solid ${
                  statistics.completedChange >= 0
                    ? "fa-arrow-up"
                    : "fa-arrow-down"
                } me-2`}
              ></i>
              <p className="m-0">{statistics.completedChange.toFixed(1)}%</p>
            </span>
            <p className="m-0">Last week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsBox;
