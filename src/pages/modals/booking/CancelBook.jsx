import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../util/constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/apiCalls/profileApiCall";
import toast from "react-hot-toast";
function CancelBook({ id }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const deleteHouse = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(
        `${API_URL}/booking/status/${id}`,
        {
          status: 4,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );

      document.getElementById("closeChangeStatus").click();
      document
        .getElementsByClassName("modal-backdrop")[0]
        .classList.remove("modal-backdrop");
      toast.success("Your booking has been successfully canceled.");
      dispatch(getUserProfile(user._id));
    } catch (error) {
      console.error("Error change satatus:", error);
      toast.error("Something went Wrong, Please try later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="modal fade"
      id={`changeStatus-${id}`}
      tabIndex="-1"
      aria-labelledby="changeStatusLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h1 className="text-center">
              Are you sure you want to cancel this reservation?
            </h1>
            <p>This action cannot be undone. Proceed with caution.</p>
          </div>

          <div className="modal-footer">
            <button
              id="closeChangeStatus"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              cancel
            </button>
            <button onClick={deleteHouse} type="sunmit" className="px-3 py-1">
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

export default CancelBook;
