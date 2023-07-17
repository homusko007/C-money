import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URI} from '../../api/const';

const initialState = {
  status: '',
  token: '',
  error: null,
};

export const submitAuthForm = createAsyncThunk(
  'auth/submit',
  async (data) => {
    try {
      const response = await fetch(`${API_URI}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      return await response.json();
    } catch (e) {
      return e.message;
    }
  });

export const localStorageMiddleware = (store) => (next) => (action) => {
  const nextAction = next(action);

  if (nextAction.type.startsWith('auth/')) {
    const token = store.getState().auth.token;
    localStorage.setItem('Basic', JSON.stringify(token));
  }

  return nextAction;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    chekToken(state) {
      if (JSON.parse(localStorage.getItem('Basic'))) {
        state.token = JSON.parse(localStorage.getItem('Basic'));
      }
    },
    deleteToken(state) {
      state.token = '';
      localStorage.setItem('Basic', '');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitAuthForm.pending, (state) => {
        state.status = 'loading';
        state.token = '';
        state.error = '';
      })
      .addCase(submitAuthForm.fulfilled, (state, action) => {
        state.status = 'success';
        state.token = action.payload.payload.token;
      })
      .addCase(submitAuthForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});


export const {chekToken, deleteToken} = authSlice.actions;
export default authSlice.reducer;
