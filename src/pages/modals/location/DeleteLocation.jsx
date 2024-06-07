import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../util/constants";
import toast from "react-hot-toast";
function DeleteLocation({ token, refreshlocations, id }) {
  const [isLoading, setIsLoading] = useState(false);

  const deletelocation = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/location/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Location has been deleted successfully.");
      refreshlocations();
      document.getElementById("closedeletelocation").click();
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
      id={`deletelocation-${id}`}
      tabIndex="-1"
      aria-labelledby={`deletelocationLabel-${id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h1 className="text-center">
              Are you sure you want to cancel this location?
            </h1>
            <p>
              This action cannot be undone. Deleting this location will also
              permanently delete all cars associated with it. Proceed with
              caution.
            </p>
          </div>

          <div className="modal-footer">
            <button
              id="closedeletelocation"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              cancel
            </button>
            <button
              onClick={deletelocation}
              type="submit"
              className="px-3 py-1"
            >
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

export default DeleteLocation;
