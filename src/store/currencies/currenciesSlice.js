import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URI} from '../../api/const';


const initialState = {
  currenciesAll: [],
  loading: false,
  error: null,
};

export const currenciesRequestAsync = createAsyncThunk(
  'currencies-all',
  (_, {getState}) => {
    const token = getState().auth.token;

    return fetch(`${API_URI}/all-currencies`, {
      method: 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((data) => data.json())
      .then(data => data.payload)
      .catch((err) => ({error: err.toString()}));
  }
);


export const currenciesSlice = createSlice({
  name: 'currencies-all',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(currenciesRequestAsync.pending, (state) => {
        state.loading = true;
        state.currenciesAll = [];
        state.error = '';
      })
      .addCase(currenciesRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currenciesAll = action.payload;
        state.error = '';
      })
      .addCase(currenciesRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  }
});

export default currenciesSlice.reducer;
