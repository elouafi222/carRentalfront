import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorAlert from "../../../components/ErrorAlert";
import { API_URL } from "../../../util/constants";
import toast from "react-hot-toast";

function UpdateCar({ user, refreshCars, item }) {
  const [isLoading, setIsLoading] = useState(false);
  const [brand, setbrand] = useState("");
  const [model, setmodel] = useState("");
  const [transmission, settransmission] = useState("");
  const [fuel, setfuel] = useState("");
  const [seats, setseats] = useState(0);
  const [price, setprice] = useState(0);

  useEffect(() => {
    setbrand(item.brand);
    setmodel(item.model);
    settransmission(item.transmission);
    setfuel(item.fuel);

    setseats(item.seats);
    setprice(item.price);
  }, []);

  const updatecarSubmit = async (e) => {
    e.preventDefault();
    if (!brand) return toast.error("Brand is required");
    if (!model) return toast.error("Model is required");
    if (!transmission) return toast.error("Transmission type is required");
    if (!brand) return toast.error("Brand required");
    if (!seats) return toast.error("Number of seats is required");
    if (!price) return toast.error("Price per day is required");
    if (!fuel) return toast.error("Fuel type is required");
    try {
      setIsLoading(true);
      await axios.put(
        `${API_URL}/car/${item?._id}`,
        {
          brand: brand,
          model: model,
          transmission: transmission,
          fuel: fuel,
          seats: seats,
          price: price,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      toast.success("Car has been updated successfully .");
      refreshCars();
      document.getElementById("close").click();
      document
        .getElementsByClassName("modal-backdrop")[0]
        .classList.remove("modal-backdrop");
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Something went wrong, Please try later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id={`updatecar-${item._id}`}
      tabIndex="-1"
      aria-labelledby="updatecarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <form className="modal-content" onSubmit={updatecarSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="updatecarLabel">
              Update car
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
                <option value="" disabled>
                  Select transmission type
                </option>
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
              <label htmlFor="price">Price (MAD)</label>
            </div>
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
          </div>

          <div className="modal-footer">
            <button
              id="close"
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
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCar;
