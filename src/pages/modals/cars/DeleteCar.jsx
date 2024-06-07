import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../util/constants";
import toast from "react-hot-toast";
function DeleteCar({ user, refreshCars, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const deleteHouse = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/car/${id}`, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      toast.success("Car has been deleted successfully.");
      refreshCars();
      document.getElementById("closedeletecar").click();
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
      id={`deletecar-${id}`}
      tabIndex="-1"
      aria-labelledby="deleteCarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h1 className="text-center">
              Are you sure you want to cancel this car?
            </h1>
            <p>This action cannot be undone. Proceed with caution.</p>
          </div>

          <div className="modal-footer">
            <button
              id="closedeletecar"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              cancel
            </button>
            <button onClick={deleteHouse} type="submit" className="px-3 py-1">
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

export default DeleteCar;
