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
  reducers: {
    setUser: (state, action) => {
      state.user = {
        name: action.payload.name || "",
        email: action.payload.email || "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload;
        state.token = payload.token || payload.accessToken || null;
        state.isLoggedIn = !!state.token;
      })
      .addCase(register.fulfilled, (state, action) => {
        const payload = action.payload;
        state.user = {
          name: payload.user?.name || payload.name || "",
          email: payload.user?.email || payload.email || "",
        };
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
        const payload = action.payload;
        const userData = payload?.user || payload;
        const name = userData?.name || userData?.username || "";
        const email = userData?.email || "";
        
        if (name) {
          state.user = {
            name: name,
            email: email,
          };
        }
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
