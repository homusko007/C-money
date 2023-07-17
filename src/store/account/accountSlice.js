import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URI} from '../../api/const';

const initialState = {
  account: '',
  balance: '',
  transactions: [],
  loading: false,
  error: '',
};

export const accountRequestAsync = createAsyncThunk(
  'account/id',
  (id, {getState}) => {
    const token = getState().auth.token;

    return fetch(`${API_URI}/account/${id}`, {
      method: 'get',
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((data) => data.json())
      .then(data => data.payload)
      .catch((error) => ({error}));
  }
);


export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    changeAccount: (state, action) => {
      state.account = action.payload;
      state.balance = '';
      state.transactions = [];
    },
    updateTransactions: (state, action) => {
      state.transactions = action.payload.transactions.reverse();
      let sum = state.balance;
      state.transactions.map(obj => {
        obj.balance = sum;
        if (obj.from === state.account) {
          sum = Math.round(obj.amount + obj.balance);
        } else {
          sum = Math.round(obj.balance - obj.amount);
        }
      });
    }
  },
  extraReducers: builder => {
    builder
      .addCase(accountRequestAsync.pending, (state) => {
        state.loading = true;
        state.account = '';
        state.error = '';
      })
      .addCase(accountRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload.account;
        state.balance = action.payload.balance;
        state.transactions = action.payload.transactions.reverse();
        let sum = state.balance;
        state.transactions.map(obj => {
          obj.balance = sum;
          if (obj.from === state.account) {
            sum = Math.round(obj.amount + obj.balance);
          } else {
            sum = Math.round(obj.balance - obj.amount);
          }
        });
        state.error = '';
        state.errorTransf = '';
      })
      .addCase(accountRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {updateTransactions} = accountSlice.actions;
export default accountSlice.reducer;

