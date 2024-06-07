import { createSlice } from "@reduxjs/toolkit";
const bookingRequestSlice = createSlice({
  name: "bookingRequest",
  initialState: {
    count: null,
  },
  reducers: {
    setBookingRequestCount(state, action) {
      state.count = action.payload;
    },
  },
});
const bookingRequestReducer = bookingRequestSlice.reducer;
const bookingRequestActions = bookingRequestSlice.actions;
export { bookingRequestActions, bookingRequestReducer };
