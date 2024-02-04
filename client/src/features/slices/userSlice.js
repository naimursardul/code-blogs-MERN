import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./mainSlice";

// REGISTER
export const registerUser = createAsyncThunk(
  "registerUser",
  async (info, thunkApi) => {
    try {
      const res = await axios.post(url + "/register", info);
      const result = res.data;
      return result;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "loginUser",
  async (info, thunkApi) => {
    try {
      const res = await axios.post(url + "/login", info, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = res.data;
      return result;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

// REFETCH
export const refetchUser = createAsyncThunk("refetchUser", async (thunkApi) => {
  try {
    const res = await axios.get(url + "/refetch", {
      withCredentials: true,
    });
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

// LOGOUT USER
export const logoutUser = createAsyncThunk("logoutUser", async (thunkAPI) => {
  try {
    const res = await axios.get(url + "/logout", { withCredentials: true });
    const result = res.data;
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// DELETE USER
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async ([id, navigate], thunkAPI) => {
    try {
      const res = await axios.delete(url + "/user/" + id, {
        withCredentials: true,
      });
      navigate("/");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// UPDATE USER
export const updateUser = createAsyncThunk(
  "updateUser",
  async ([uid, data], thunkAPI) => {
    try {
      const res = await axios.put(url + "/user/" + uid, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
