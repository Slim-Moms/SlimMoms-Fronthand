import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Burayı kendi API'miz ile güncelleyeceğiz!
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};


export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    // Gerçek backend olduğunda burayı açılacak!:
    // await axios.post('/users/logout');
  
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
