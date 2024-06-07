import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { API_URL } from "../../../util/constants";
import ErrorAlert from "../../../components/ErrorAlert";
import toast from "react-hot-toast";

function AddLocation({ token, refreshlocations }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [manager, setManager] = useState("");
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setUsers(
          response.data.users.map((user) => ({
            value: user._id.toString(),
            label: `${user.firstname} ${user.lastname}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoadingUsers(false);
      }
    };
    fetchUsers();
    const fetchCities = async () => {
      try {
        setIsLoadingUsers(true);
        const response = await axios.get(`${API_URL}/city`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCities(
          response.data.cities.map((city) => ({
            value: city._id,
            label: city.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoadingUsers(false);
      }
    };
    fetchCities();
  }, [token]);

  const addLocation = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("location name is required");
    if (!city) return toast.error("location city is required");
    if (!phone) return toast.error("location phone is required");
    if (!adresse) return toast.error("location adresse is required");
    if (!manager) return toast.error("location manager is required");
    try {
      setIsLoading(true);
      await axios.post(
        `${API_URL}/location`,
        {
          name: name,
          phone: phone,
          adresse: adresse,
          cityId: city.value,
          managerId: manager.value,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success("Location has been successfully added.");
      refreshlocations();
      document.getElementById("close").click();
      document
        .getElementsByClassName("modal-backdrop")[0]
        .classList.remove("modal-backdrop");
    } catch (error) {
      console.error("Error adding location:", error);
      error && toast.error(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id={`addlocation`}
      tabIndex="-1"
      aria-labelledby="addLocationLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <form onSubmit={addLocation} className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="AddCarLabel">
              Add new Location
            </h1>
            <i
              id="close"
              type="button"
              className="fa-solid fa-xmark"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></i>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="name"
                placeholder="name"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="form-control"
                id="phone"
                placeholder="phone"
              />
              <label htmlFor="phone">Phone</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                type="text"
                className="form-control"
                id="adresse"
                placeholder="adresse"
              />
              <label htmlFor="adresse">Adresse</label>
            </div>
            <div className="mb-3">
              <Select
                value={manager}
                onChange={(option) => setManager(option)}
                options={users}
                isLoading={isLoadingUsers}
                placeholder="Select Manager"
                className="select"
                classNames={{
                  control: (state) =>
                    state.isFocused ? "border-orange" : "border-grey",
                }}
              />
            </div>
            <div className="mb-3">
              <Select
                value={city}
                onChange={(option) => setCity(option)}
                options={cities}
                isLoading={isLoadingUsers}
                placeholder="Select City"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              id="closeaddlocation"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="px-3 py-1">
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Add Location"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLocation;
