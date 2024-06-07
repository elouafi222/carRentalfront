import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import toast from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";

import icon from "../../img/logo.png";
function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email required");
    if (!password) return toast.error("Password required");

    try {
      setIsLoading(true);
      await dispatch(
        loginUser({
          email: email,
          password: password,
        })
      );
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="form-container d-flex justify-content-center align-items-center px-3 px-lg-5">
        <form onSubmit={loginSubmit} className="form-box  p-3 py-5">
          <div className=" my-2 my-lg-0 text-center">
            <Link to="/">
              <img src={icon} className="mb-3" />
            </Link>
            <h1 className=" ">Log in</h1>
            <p className="mb-4">
              Ready to log in? Enter your email and password to access your
              account.
            </p>
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
            <button className="p-1 mb-3">
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
            <p>
              You don't have an account ?{" "}
              <Link className="link" to="/signup">
                Sing up
              </Link>
            </p>
            <p>
              Password forgot ?{" "}
              <Link className="link" to="/forgotPassword">
                Forgot
              </Link>
            </p>
          </div>
        </form>
      </div>
    </HelmetProvider>
  );
}

export default Login;
