import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  loginUser,
  logoutUser,
  refetchUser,
  registerUser,
  updateUser,
} from "./userSlice";
import { getAllPost } from "./postSlice";

// export const url = "https://code-blogs.onrender.com";
export const url = "http://localhost:5000";

const initialState = {
  user: null,
  allPost: [],
  loading: false,
  error: null,
  registerError: null,
  loginError: null,
};
const mainSlice = createSlice({
  name: "allHandler",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerError = null;
        window.location.replace("/login");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loginError = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.payload;
        state.loading = false;
      })
      .addCase(refetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(refetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(refetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        alert(action.payload.message);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allPost = action.payload;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default mainSlice.reducer;
