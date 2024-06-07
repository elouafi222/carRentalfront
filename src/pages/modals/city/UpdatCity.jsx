import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../util/constants";
import ErrorAlert from "../../../components/ErrorAlert";
import toast from "react-hot-toast";
function UpdateCity({ token, refreshCities, item }) {
  const [isLoading, setIsLoading] = useState(false);
  const [city, setcity] = useState("");
  useEffect(() => {
    setcity(item.name);
  }, []);

  const UpdateCity = async (e) => {
    e.preventDefault();
    if (!city) return toast.error("City name is required");
    try {
      setIsLoading(true);
      await axios.put(
        `${API_URL}/city/${item._id}`,
        {
          name: city,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("City name has been updated successfully .");
      refreshCities();
      document.getElementById("closeUpdateCity").click();
      document
        .getElementsByClassName("modal-backdrop")[0]
        .classList.remove("modal-backdrop");
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Something went wrong, Please try later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="modal fade"
      id={`updatecity-${item._id}`}
      tabIndex="-1"
      aria-labelledby="UpdateCityLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <form onSubmit={UpdateCity} className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddCarLabel">
              Add new city
            </h1>
            <i
              type="button"
              className="fa-solid fa-xmark"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></i>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <input
                value={city}
                onChange={(e) => setcity(e.target.value)}
                type="text"
                className="form-control "
                id="city"
                placeholder="city"
              />
              <label htmlFor="city">City nme</label>
            </div>
          </div>

          <div className="modal-footer">
            <button
              id="closeUpdateCity"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              cancel
            </button>
            <button type="submit" className="px-3 py-1">
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Add City"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCity;
