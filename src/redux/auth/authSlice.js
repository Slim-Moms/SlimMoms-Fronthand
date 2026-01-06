import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload;
        const userData = payload.user || payload;
        const email = userData.email || "";
        const nameFromEmail = email.split("@")[0];
        state.user = {
          name: userData.name || userData.username || nameFromEmail || "User",
          email: email,
        };
        state.token = payload.token || payload.accessToken || null;
        state.isLoggedIn = !!state.token;
      })
      .addCase(register.fulfilled, (state, action) => {
        const payload = action.payload;
        state.user = payload.user || payload;
        state.token = payload.token || payload.accessToken || null;
        state.isLoggedIn = !!state.token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user || action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
