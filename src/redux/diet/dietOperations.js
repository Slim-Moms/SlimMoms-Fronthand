import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { simulateCalculateDailyRate } from "../../api/fakeBackend";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const searchProducts = createAsyncThunk(
  "diet/searchProducts",
  async (searchTerm, thunkAPI) => {
    try {
      if (!searchTerm || searchTerm.trim().length < 2) {
        return [];
      }

      const state = thunkAPI.getState();
      const token = state.auth.token;
      
      const config = {
        headers: {}
      };
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.get(`/products/searchProduct?title=${encodeURIComponent(searchTerm.trim())}`, config);
      const products = response.data.data || response.data || [];
      return products.slice(0, 10);
    } catch (error) {
      return [];
    }
  }
);

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

      const state = thunkAPI.getState();
      const token = state?.auth?.token;
      
      const config = token ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } : {};

      try {
        const response = await axios.post("/user/daily-calory-needs", payload, config);
        return response.data.data;
      } catch (apiError) {
        if (apiError.response?.status === 401 || !token) {
          return await simulateCalculateDailyRate(payload);
        }
        throw apiError;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addDiaryProduct = createAsyncThunk(
  "diet/addDiaryProduct",
  async (productData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state?.auth?.token;
      
      const authConfig = token ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } : {};

      let foundProduct = null;

      if (productData.productId) {
        foundProduct = {
          _id: productData.productId,
          title: productData.productName,
          calories: productData.calories || 0,
        };
      } else {
        const searchResponse = await axios.get(`/products/searchProduct?title=${encodeURIComponent(productData.productName)}`, authConfig);
        
        const products = searchResponse.data.data || searchResponse.data || [];
        
        if (!products || products.length === 0) {
          return thunkAPI.rejectWithValue(`Product not found: "${productData.productName}"`);
        }

        foundProduct = products[0];
      }
      
      if (!foundProduct._id) {
        return thunkAPI.rejectWithValue("Product ID not found");
      }

      const dateObj = new Date(productData.date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const addResponse = await axios.post("/user/products", {
        productId: foundProduct._id,
        productWeight: productData.weight,
        date: formattedDate,
      }, authConfig);

      const addedProduct = addResponse.data.product || addResponse.data;

      return {
        _id: addedProduct._id,
        productName: foundProduct.title,
        name: foundProduct.title,
        weight: productData.weight,
        calories: foundProduct.calories ? Math.round((foundProduct.calories / 100) * productData.weight) : 0,
        productId: foundProduct._id,
      };
    } catch (error) {
      if (error.response?.data?.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      if (error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An error occurred while adding product");
    }
  }
);

export const deleteDiaryProduct = createAsyncThunk(
  "diet/deleteDiaryProduct",
  async ({ productId, date }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state?.auth?.token;
      
      const authConfig = token ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } : {};

      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      await axios.delete(`/user/products/${productId}?date=${formattedDate}`, authConfig);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchDiaryProductsByDate = createAsyncThunk(
  "diet/fetchDiaryProductsByDate",
  async (date, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state?.auth?.token;
      
      const authConfig = token ? {
        headers: {
          Authorization: `Bearer ${token}`
        }
      } : {};

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const response = await axios.get(`/user/products?date=${formattedDate}`, authConfig);
      
      if (!response.data.products || response.data.products.length === 0) {
        return [];
      }

      return response.data.products.map((item) => {
        const product = item.productId;
        const calories = product.calories ? Math.round((product.calories / 100) * item.productWeight) : 0;
        return {
          _id: item._id,
          productName: product.title,
          name: product.title,
          weight: item.productWeight,
          calories: calories,
          productId: product._id,
        };
      });
    } catch (error) {
      if (error.response?.status === 401) {
        return [];
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
