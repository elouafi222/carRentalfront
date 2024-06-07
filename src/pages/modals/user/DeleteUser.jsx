import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../util/constants";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function DeleteUser({ id, refreshCars }) {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const deleteHouse = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      toast.success("User account has been deleted successfully.");
      refreshCars();
      document.getElementById("closeDeleteUser").click();
      document
        .getElementsByClassName("modal-backdrop")[0]
        .classList.remove("modal-backdrop");
    } catch (error) {
      console.error("Error deleting houses:", error);
      toast.error("Something went wrong, Please try later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="modal fade"
      id={`deleteUser-${id}`}
      tabIndex="-1"
      aria-labelledby="deleteUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h1 className="text-center">
              Are you sure you want to delete this account?
            </h1>
            <p>This action cannot be undone. Proceed with caution.</p>
          </div>

          <div className="modal-footer">
            <button
              id="closeDeleteUser"
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
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
