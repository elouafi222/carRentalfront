import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../util/constants";
import ErrorAlert from "../../../components/ErrorAlert";
import toast from "react-hot-toast";
function AddCity({ token, refreshCities }) {
  const [isLoading, setIsLoading] = useState(false);
  const [city, setcity] = useState("");

  const addCity = async (e) => {
    e.preventDefault();
    if (!city) return toast.error("City name is required");
    try {
      setIsLoading(true);
      await axios.post(
        `${API_URL}/city`,
        {
          name: city,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      refreshCities();
      document.getElementById("closeAddCity").click();
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
      setcity("");
    }
  };
  return (
    <div
      className="modal fade"
      id={`addCity`}
      tabIndex="-1"
      aria-labelledby="AddCityLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <form onSubmit={addCity} className="modal-content">
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
              <label htmlFor="city">City name</label>
            </div>
          </div>

          <div className="modal-footer">
            <button
              id="closeAddCity"
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

export default AddCity;
