import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000/api'; // Backend adresi

export const fetchDailyRate = createAsyncThunk(
  'diet/fetchDailyRate',
  async (userData, thunkAPI) => {
    try {
      // Backend beklenen format: { height, age, currentWeight, desiredWeight, bloodType }
      // Backend controller'da "currentWeight" kullanılıyor, formda "weight" var. Dönüştürmeliyiz.
      const payload = {
        height: Number(userData.height),
        age: Number(userData.age),
        currentWeight: Number(userData.weight),
        desiredWeight: Number(userData.desiredWeight),
        bloodType: Number(userData.bloodType),
      };

      const response = await axios.post('/user/daily-calory-needs', payload);
      // Backend yanıtı: { status: 200, message: '...', data: { dailyRate, notAllowedProducts } }
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);