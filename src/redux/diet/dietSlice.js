import { createSlice } from '@reduxjs/toolkit';
import { fetchDailyRate } from './dietOperations';

const initialState = {
  dailyRate: 0,
  notAllowedProducts: [],
  isLoading: false,
  error: null,
};

const dietSlice = createSlice({
  name: 'diet',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyRate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDailyRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyRate = action.payload.dailyRate;
        state.notAllowedProducts = action.payload.notAllowedProducts;
      })
      .addCase(fetchDailyRate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dietSlice.reducer;