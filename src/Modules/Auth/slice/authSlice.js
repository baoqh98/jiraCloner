import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPIs from '../../../app/apis/auth/authAPIs';
import thunk from '../../../app/apis/helper/thunk';

const initialState = {
  data: JSON.parse(localStorage.getItem('jiraClonerUser')) || null,
  isLoading: false,
  error: '',
};
const { signIn, signUp } = authAPIs;

export const loginHandler = thunk.request('auth/signIn', signIn);

export const signUpHandler = createAsyncThunk(
  'auth/signUp',
  async (userInfo, { rejectWithValue }) => {
    try {
      const data = await signUp(userInfo);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginHandler.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(loginHandler.rejected, (state, { payload }) => {
        state.error = payload;
      });

    builder
      .addCase(signUpHandler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpHandler.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(signUpHandler.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
