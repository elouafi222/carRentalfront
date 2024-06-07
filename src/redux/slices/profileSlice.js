import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    isProfileDeleted: false,
    profiles: [],
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    updateUserProfile(state, action) {
      state.profile = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
  },
});
const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;
export { profileActions, profileReducer };
