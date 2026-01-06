import { createSlice } from '@reduxjs/toolkit';
import { fetchDailyRate, addDiaryProduct, deleteDiaryProduct, fetchDiaryProductsByDate } from './dietOperations';

const initialState = {
  dailyRate: 0,
  notAllowedProducts: [],
  diaryProducts: [],
  selectedDate: new Date().toISOString().split('T')[0],
  isLoading: false,
  error: null,
};

const dietSlice = createSlice({
  name: 'diet',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
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
      })
      .addCase(addDiaryProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDiaryProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diaryProducts.push(action.payload);
      })
      .addCase(addDiaryProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteDiaryProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDiaryProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diaryProducts = state.diaryProducts.filter(
          product => product._id !== action.payload
        );
      })
      .addCase(deleteDiaryProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchDiaryProductsByDate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiaryProductsByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diaryProducts = action.payload || [];
      })
      .addCase(fetchDiaryProductsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedDate } = dietSlice.actions;
export default dietSlice.reducer;