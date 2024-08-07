import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    signInFaliure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    setNull: (state) => {
      state.error = null;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },

    updateUserSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null)
    },

    updateUserFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },

    deleteUserStart: (state) => {
      state.loading = true;
    },

    deleteUserSuccess: (state, action) => {
      (state.currentUser = null), (state.loading = false), (state.error = null);
    },

    deleteUserFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },

    signOutStart : (state) => {
        state.loading = true
    },

    signOutFailure : (state,action) => {
        state.error = action.payload,
        state.loading = false
    },

    signOutSuccess : (state) => {
        state.currentUser = null,
        state.error = null,
        state.loading = false
    }
  },
});

// console.log(userSlice.actions)

export const {
  signInStart,
  signInFaliure,
  signInSuccess,
  setNull,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess
} = userSlice.actions;

export default userSlice.reducer;
