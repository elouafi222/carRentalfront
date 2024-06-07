import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../util/constants";
import toast from "react-hot-toast";
function FinishBook({ id, token, refreshbookings }) {
  const [isLoading, setIsLoading] = useState(false);
  const deleteHouse = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(
        `${API_URL}/booking/status/${id}`,
        {
          status: 3,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Booking status has been updated successfully .");
      refreshbookings();
      document.getElementById("closeChangeStatus").click();
      document
        .getElementsByClassName("modal-backdrop")[0]
        .classList.remove("modal-backdrop");
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
      id={`makecompleted-${id}`}
      tabIndex="-1"
      aria-labelledby="changeStatusLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h1 className="text-center">
              Are you sure you want to mark this reservation as completed?
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

export default FinishBook;
