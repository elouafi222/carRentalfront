import axios from "axios";
import React, { useEffect, useState } from "react";
import ErrorAlert from "../../../components/ErrorAlert";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/apiCalls/profileApiCall";
import toast from "react-hot-toast";

function UpdateProfile({ profile }) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");

  useEffect(() => {
    setFirstName(profile?.firstname);
    setLastName(profile?.lastname);
    setPhone(profile?.phone);
    setEmail(profile?.email);
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName) return toast.error("Firstname required");
    if (!lastName) return toast.error("LastName required");
    if (!Phone) return toast.error("Phone required");
    dispatch(
      updateProfile(profile._id, {
        firstname: firstName,
        lastname: lastName,
        phone: Phone,
      })
    );
    document.getElementById("closeupdateuser").click();
  };

  return (
    <div
      className="modal fade"
      id={`updateProfile-${profile?._id}`}
      tabIndex="-1"
      aria-labelledby="updateProfileLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="updateProfileLabel">
              Update Profile
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
                type="text"
                className="form-control"
                id="firstname"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="firstname">First Name</label>
            </div>
             <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="lastname">Last Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                disabled
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="Phone"
                placeholder="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="Phone">Phone</label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              id="closeupdateuser"
              type="button"
              className="px-3 py-1"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="px-3 py-1">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
