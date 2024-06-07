import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../util/constants";
import toast from "react-hot-toast";
function ChangeStatusBook({ item, refreshreqs, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(item.status);

  const changeStatus = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(
        `${API_URL}/booking/status/${item._id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      toast.success("Booking status has been changed successfully.");
      refreshreqs();
      document.getElementById("closeChangeStatus").click();
      document
        .getElementsByClassName("modal-backdrop")[0]
        .classList.remove("modal-backdrop");
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("Something went wrong, Please try later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(parseInt(e.target.value));
  };

  return (
    <div
      className="modal fade"
      id={`changeStatus-${item._id}`}
      tabIndex="-1"
      aria-labelledby="changeStatusLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body d-flex justify-content-center">
            <div className="form-check mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id={`requested-${item._id}`}
                value="1"
                checked={status === 1}
                onChange={handleStatusChange}
              />
              <label
                className="form-check-label"
                htmlFor={`requested-${item._id}`}
              >
                Requested
              </label>
            </div>
            <div className="form-check mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id={`inProgress-${item._id}`}
                value="2"
                checked={status === 2}
                onChange={handleStatusChange}
              />
              <label
                className="form-check-label"
                htmlFor={`inProgress-${item._id}`}
              >
                In Progress
              </label>
            </div>
            <div className="form-check mx-3">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id={`completed-${item._id}`}
                value="3"
                checked={status === 3}
                onChange={handleStatusChange}
              />
              <label
                className="form-check-label"
                htmlFor={`completed-${item._id}`}
              >
                Completed
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button
              id="closeChangeStatus"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button onClick={changeStatus} type="submit" className="px-3 py-1">
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeStatusBook;
