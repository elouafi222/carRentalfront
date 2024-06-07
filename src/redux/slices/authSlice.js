import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("rentCarInfo")
      ? JSON.parse(localStorage.getItem("rentCarInfo"))
      : null,
    isEmailVerified: false,
    signupError: null,
    loginError: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    loginFailed(state, action) {
      state.loginError = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    signup(state, action) {
      state.signupMessage = action.payload;
    },
    signupFailed(state, action) {
      state.signupError = action.payload;
    },
    setUsername(state, action) {
      state.user.firstname = action.payload;
    },
    setIsEmailVerified(state) {
      state.isEmailVerified = true;
    },
  },
});
const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authActions, authReducer };
