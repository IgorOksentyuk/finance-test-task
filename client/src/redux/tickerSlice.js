import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickerData: [],
};

const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    updateTickerData: (state, action) => {
      state.tickerData = action.payload;
    },
  },
});

export const { updateTickerData } = tickerSlice.actions;
export default tickerSlice.reducer;