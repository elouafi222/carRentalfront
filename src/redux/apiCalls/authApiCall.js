import axios from "axios";
import { authActions } from "../slices/authSlice";
import { API_URL } from "../../util/constants";
//login user
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, user);
      dispatch(authActions.login(data));
      localStorage.setItem("rentCarInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(authActions.loginFailed(error.response.data.message));
      throw new Error(error.response.data.message);
    }
  };
}
//Logout user
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("rentCarInfo");
  };
}
//Signup user
export function signupUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/signup`, user);
      dispatch(authActions.signup(data.message));
      return data.message; // Return the success message
    } catch (error) {
      dispatch(authActions.signupFailed(error.response.data.message));
      throw new Error(error.response.data.message);
    }
  };
}
//verify email user
// export function verifyEmail(userId, token) {
//   return async (dispatch) => {
//     try {
//       await request.get(`/api/auth/${userId}/verify/${token}`);
//       dispatch(authActions.setIsEmailVerified());
//     } catch (error) {
//       console.log(error.data.message);
//     }
//   };
// }
