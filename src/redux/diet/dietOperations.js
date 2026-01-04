
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Canlı Backend Adresi
axios.defaults.baseURL = 'https://slimmoms-backend-9zqy.onrender.com';

export const fetchDailyRate = createAsyncThunk(
  'diet/fetchDailyRate',
  async (userData, thunkAPI) => {
    try {
      const payload = {
        height: Number(userData.height),
        age: Number(userData.age),
        weight: Number(userData.weight), 
        desiredWeight: Number(userData.desiredWeight),
        bloodType: Number(userData.bloodType),
      };

      // Canlıya istek 
      const response = await axios.post('/api/products', payload); // Endpoint '/api/daily-rate' veya '/api/products' olabilir, backend dokümanına göre burası değişebilir ama genelde '/api/daily-rate'tir.

      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);