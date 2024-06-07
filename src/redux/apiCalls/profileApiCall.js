import axios from "axios";
import { API_URL } from "../../util/constants";
import { authActions } from "../slices/authSlice";
import { profileActions } from "../slices/profileSlice";
import toast from "react-hot-toast";

//Get user profile
export function getUserProfile(userID) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await axios.get(`${API_URL}/users/${userID}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      dispatch(profileActions.clearLoading());
    }
  };
}

export function updateProfile(userID, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.put(`${API_URL}/users/${userID}`, profile, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.updateUserProfile(data));
      dispatch(authActions.setUsername(data.firstname));

      const user = JSON.parse(localStorage.getItem("rentCarInfo"));
      user.firstname = data.firstname;
      localStorage.setItem("rentCarInfo", JSON.stringify(user));
      dispatch(getUserProfile(userID));
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
