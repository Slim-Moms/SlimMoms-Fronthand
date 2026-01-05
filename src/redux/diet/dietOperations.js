import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDailyRate = createAsyncThunk(
  "diet/fetchDailyRate",
  async (userData, thunkAPI) => {
    try {
      const payload = {
        height: parseInt(userData.height, 10) || 0,
        age: parseInt(userData.age, 10) || 0,
        currentWeight: parseInt(userData.weight, 10) || 0,
        desiredWeight: parseInt(userData.desiredWeight, 10) || 0,
        bloodType: parseInt(userData.bloodType, 10) || 1,
      };

      const response = await axios.post("/user/daily-calory-needs", payload);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
