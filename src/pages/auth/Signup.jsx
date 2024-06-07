import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/apiCalls/authApiCall";
import toast from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";
import icon from "../../img/logo.png";
function SignupProp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [conPassword, setConPassword] = useState("");

  const signupSubmit = async (e) => {
    e.preventDefault();

    if (password !== conPassword) {
      toast.error("Passwords not match");
    } else {
      if (!firstName) return toast.error("Firstname required");
      if (!lastName) return toast.error("LastName required");
      if (!email) return toast.error("Email required");
      if (!phone) return toast.error("Phone required");
      if (!password) return toast.error("Password required");
      if (!conPassword) return toast.error("Password Confirmation required");
      setIsLoading(true);
      try {
        await dispatch(
          signupUser({
            firstname: firstName,
            lastname: lastName,
            email: email,
            phone: phone,
            password: password,
          })
        );
        toast.success("Signup Successfully");
        navigate("/login");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <HelmetProvider>
      <Helmet>Sign up</Helmet>
      <div className="form-container d-flex justify-content-center align-items-center px-3 px-lg-5">
        <div className="form-box my-5 p-3 py-5 ">
          <div className="my-2 my-lg-0 text-center">
            <Link to="/">
              <img src={icon} className="mb-3" />
            </Link>
            <h1 className="">SIGN UP</h1>
            <p className="mb-4">
              Get started with us today! Sign up to create your account and
              explore our platform. It's quick and easy!
            </p>
            <form onSubmit={signupSubmit}>
              <div className="row">
                <div className="col-md-6">
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
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="phone">Phone</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="conpassword"
                      placeholder="Confirm Password"
                      value={conPassword}
                      onChange={(e) => setConPassword(e.target.value)}
                    />
                    <label htmlFor="conpassword">Confirm Password</label>
                  </div>{" "}
                </div>
              </div>
              <button type="submit" className="px-5 py-1 mb-3">
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <Link className="link" to="/login">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default SignupProp;
