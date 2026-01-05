
import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loader/loaderSlice';
import dietReducer from './diet/dietSlice';
import { authReducer } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    diet: dietReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});