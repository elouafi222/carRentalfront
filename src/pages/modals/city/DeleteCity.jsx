import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../util/constants";
import toast from "react-hot-toast";
function DeleteCity({ token, refreshCities, id }) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteCity = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/city/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("City has been deleted successfully.")
      refreshCities();
      document.getElementById("closedeletecity").click();
      document
        .getElementsByClassName("modal-backdrop")[0]
        .classList.remove("modal-backdrop");
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error("Something went wrong, Please try later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="modal fade"
      id={`deleteCity-${id}`}
      tabIndex="-1"
      aria-labelledby={`deleteCityLabel-${id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h1 className="text-center">
              Are you sure you want to delete this city?
            </h1>
            <p>
              This action cannot be undone. Deleting this city will permanently
              delete all locations and cars associated with it. Proceed with
              caution.
            </p>
          </div>

          <div className="modal-footer">
            <button
              id="closedeletecity"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              cancel
            </button>
            <button onClick={deleteCity} type="submit" className="px-3 py-1">
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

export default DeleteCity;
