import { configureStore } from '@reduxjs/toolkit';
import tickerReducer from './tickerSlice';

export const store = configureStore({
  reducer: {
    ticker: tickerReducer,
  },
});
