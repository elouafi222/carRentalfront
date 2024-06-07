import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../util/constants";
import toast from "react-hot-toast";

function AddCar({ user, refreshCars }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [brand, setbrand] = useState("");
  const [model, setmodel] = useState("");
  const [transmission, settransmission] = useState("");
  const [fuel, setfuel] = useState("");
  const [seats, setseats] = useState(0);
  const [price, setprice] = useState(0);
  const [locationId, setlocationId] = useState("");
  const [image, setImage] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoadingLocations(true);
        const response = await axios.get(`${API_URL}/location`, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });
        setLocations(response.data.locations);
        console.log(response);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    if (user.role === 1) fetchLocations();
  }, []);

  const AddCarSubmit = async (e) => {
    e.preventDefault();
    if (!brand) return toast.error("Brand is required");
    if (!model) return toast.error("Model is required");
    if (!transmission) return toast.error("Transmission type is required");
    if (!brand) return toast.error("Brand required");
    if (!seats) return toast.error("Number of seats is required");
    if (!price) return toast.error("Price per day is required");
    if (!locationId && user.role === 1)
      return toast.error("Car location is required");
    if (!fuel) return toast.error("Fuel type is required");
    if (!image) return toast.error("Car image is required");
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("transmission", transmission);
      formData.append("fuel", fuel);
      formData.append("seats", seats);
      formData.append("image", image);
      formData.append("price", price);
      user.role === 1 && formData.append("locationId", locationId);
      await axios.post(`${API_URL}/car`, formData, {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Car has been successfully added.");
      refreshCars();
      document.getElementById("clodeaddcar").click();
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
      id="addCar"
      tabIndex="-1"
      aria-labelledby="AddCarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <form className="modal-content" onSubmit={AddCarSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddCarLabel">
              Add new car
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
                value={brand}
                onChange={(e) => setbrand(e.target.value)}
                type="text"
                className="form-control "
                id="brand"
                placeholder="Brand"
              />
              <label htmlFor="brand">Brand</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={model}
                onChange={(e) => setmodel(e.target.value)}
                type="text"
                className="form-control"
                id="model"
                placeholder="Model"
              />
              <label htmlFor="model">Model</label>
            </div>
            <div className="form-floating mb-3">
              <select
                value={transmission}
                onChange={(e) => settransmission(e.target.value)}
                className="form-control"
                id="transmission"
              >
                <option disabled>Select transmission type</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
              <label htmlFor="transmission">Transmission</label>
            </div>{" "}
            <div className="form-floating mb-3">
              <input
                value={seats}
                onChange={(e) => setseats(e.target.value)}
                type="number"
                min={0}
                className="form-control"
                id="seats"
                placeholder="Seats"
              />
              <label htmlFor="seats">Seats</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={price}
                onChange={(e) => setprice(e.target.value)}
                type="number"
                min={0}
                className="form-control "
                id="price"
                placeholder="Price"
              />
              <label htmlFor="price">Price Per Day (DH)</label>
            </div>
            {user.role === 1 && (
              <>
                <div className="form-floating mb-3">
                  <select
                    value={locationId}
                    onChange={(e) => setlocationId(e.target.value)}
                    className="form-control"
                    id="locationId"
                  >
                    <option disabled value="">
                      Select location
                    </option>
                    {isLoadingLocations ? (
                      <option
                        className="spinner-border  spinner-border-sm"
                        role="status"
                      ></option>
                    ) : (
                      <>
                        {locations.map((location) => (
                          <option key={location._id} value={location._id}>
                            {location.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  <label htmlFor="locationId">Location</label>
                </div>{" "}
              </>
            )}
            <div className="form-floating mb-3">
              <select
                value={fuel}
                onChange={(e) => setfuel(e.target.value)}
                className="form-control"
                id="fuel"
              >
                <option value="" disabled>
                  Select fuel type
                </option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <label htmlFor="fuel">Fuel</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                className="form-control"
                id="image"
                placeholder="Image"
              />
              <label htmlFor="image">Image</label>
            </div>
          </div>

          <div className="modal-footer">
            <button
              id="clodeaddcar"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="px-3 py-1">
              {isLoading ? (
                <div
                  className="spinner-border  spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "Add house"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCar;
