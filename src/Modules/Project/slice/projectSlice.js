import { createSlice } from '@reduxjs/toolkit';
import thunk from '../../../app/apis/helper/thunk';
import projectAPIs from '../../../app/apis/projectAPIs/projectAPIs';

const initialState = {
  projects: [],
  isLoading: false,
  error: '',
};

const { getAllProjects, createProject, deleteProject, assignUser } =
  projectAPIs;

export const getAllProjectsThunk = thunk.request(
  'project/getAllProjects',
  getAllProjects
);

export const createProjectThunk = thunk.request(
  'project/createProject',
  createProject
);

export const deleteProjectThunk = thunk.request(
  'project/deleteProject',
  deleteProject
);

export const assignUserProjectThunk = thunk.request(
  'project/assignUserProject',
  assignUser
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjectsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjectsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = payload;
      })
      .addCase(getAllProjectsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default projectSlice.reducer;
