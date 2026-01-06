import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// ESKİ: axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://slimmoms-backend-fug1.onrender.com";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", credentials);
      const userData = response.data.data || response.data;
      
      const loginResponse = await axios.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });
      
      const loginData = loginResponse.data.data || loginResponse.data;
      const token = loginData.accessToken || loginData.token;
      
      if (token) {
        setAuthHeader(token);
      }
      
      return {
        user: {
          name: userData.name || credentials.name,
          email: userData.email || credentials.email,
        },
        token: token
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      const data = response.data.data || response.data;
      const token = data.accessToken || data.token || data.data?.accessToken || data.data?.token;
      
      if (token) {
        setAuthHeader(token);
      }
      
      return {
        ...data,
        token: token
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      
      if (
        errorMessage.toLowerCase().includes('user not found') ||
        errorMessage.toLowerCase().includes('incorrect password') ||
        errorMessage.toLowerCase().includes('invalid') ||
        error.response?.status === 401 ||
        error.response?.status === 404
      ) {
        return thunkAPI.rejectWithValue("Invalid username or password");
      }
      
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    clearAuthHeader();
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get("/user/products");
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
