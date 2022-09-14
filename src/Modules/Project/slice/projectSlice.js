import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  isLoading: false,
  error: '',
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default projectSlice.reducer;
