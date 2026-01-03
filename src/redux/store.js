
import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loader/loaderSlice';
import dietReducer from './diet/dietSlice';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    diet: dietReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});