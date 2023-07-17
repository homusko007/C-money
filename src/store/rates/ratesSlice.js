import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  rates: [],
};

export const liveRatesSlice = createSlice({
  name: 'currency-feed',
  initialState,
  reducers: {
    getRates: (state, action) => {
      state.rates = [action.payload, ...state.rates.slice(0, 7)];
    }
  }
});


export const {getRates} = liveRatesSlice.actions;
export default liveRatesSlice.reducer;
