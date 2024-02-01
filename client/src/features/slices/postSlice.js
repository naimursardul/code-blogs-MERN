import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./mainSlice";

// GET ALL + Searched POSTS
export const getAllPost = createAsyncThunk(
  "getAllPost",
  async (search, thunkAPI) => {
    try {
      const res = await axios.get(url + "/post" + search);
      const result = res.data;
      // return search ? [result, search] : result;
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
