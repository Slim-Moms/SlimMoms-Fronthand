import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// ============================================================

// Backend düzeldiğinde burayı 'false' yapmak lazm.
// Hatalar olduğu için 'true'  çalışıyok.
const USE_MOCK_BACKEND = true; 

// Canlı Backend Adresi
axios.defaults.baseURL = 'https://slimmoms-backend-9zqy.onrender.com';

const calculateCaloriesLocally = (payload) => {
  const { currentWeight, height, age, desiredWeight } = payload;
  
  const result = 
    10 * currentWeight + 
    6.25 * height - 
    5 * age - 
    161 - 
    10 * (currentWeight - desiredWeight);

  return Math.max(Math.round(result), 1200);
};

export const fetchDailyRate = createAsyncThunk(
  'diet/fetchDailyRate',
  async (userData, thunkAPI) => {
    try {
      //Gelen veriyi temizleyip sayıya .
      const payload = {
        height: parseInt(userData.height, 10) || 0,
        age: parseInt(userData.age, 10) || 0,
        currentWeight: parseInt(userData.weight, 10) || 0, // Backend 'currentWeight' bekliyor
        desiredWeight: parseInt(userData.desiredWeight, 10) || 0,
        bloodType: parseInt(userData.bloodType, 10) || 1,
      };

      console.group('🚀 SlimMoms: Daily Rate Calculation Request');
      console.log('📡 Hedef URL:', '/user/daily-calory-needs');
      console.log('📦 Gönderilen Payload:', payload);

      let responseData;

      if (USE_MOCK_BACKEND) {
        // AHTE SUNUCU
        console.warn('⚠️ DİKKAT: Backend 500 verdiği için MOCK DATA kullanılıyor!');
        
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1sn gecikme simülasyonu

        responseData = {
          dailyRate: calculateCaloriesLocally(payload),
          notAllowedProducts: [
            `Blood Type ${payload.bloodType} Special Limit`, 
            'Pastry and bakery products',
            'Sugar and sugary foods',
            'Full-fat milk',
            'Red meat (Fatty cuts)',
            'Smoked products'
          ]
        };
        
        console.log('✅ Mock Cevap Oluşturuldu:', responseData);

      } else {
        // GERÇEK SUNUCU
        const response = await axios.post('/user/daily-calory-needs', payload);
        responseData = response.data;
        console.log('✅ Sunucudan Başarılı Cevap:', responseData);
      }

      console.groupEnd();
      return responseData;

    } catch (error) {
      console.groupEnd(); // Log  kapat

      const errorMsg = error.response?.data?.message || error.message;
      const errorStatus = error.response?.status || 'Unknown';

      console.error(`❌ HATA OLUŞTU (Status: ${errorStatus}):`);
      console.error('Detay:', JSON.stringify(error.response?.data || error, null, 2));

      // Kullanıcıya hata mesajı 
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);