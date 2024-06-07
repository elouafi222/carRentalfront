import axios from "axios";
import { API_URL } from "../../util/constants";
import { bookingRequestActions } from "../slices/bookingRequestSlice";

export function getBookingsRequestsCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${API_URL}/booking/requests`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(bookingRequestActions.setBookingRequestCount(data.count));
    } catch (error) {
      console.log(error);
    }
  };
}
