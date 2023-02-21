import { createSlice } from '@reduxjs/toolkit';
import thunk from '../../../app/apis/helper/thunk';
import projectAPIs from '../../../app/apis/projectAPIs/projectAPIs';

const initialState = {
  projects: [],
  isLoading: false,
  error: '',
};

const {
  getAllProjects,
  getProjectDetail,
  updateProject,
  createProject,
  deleteProject,
  assignUser,
  removeUserFromProject,
} = projectAPIs;

export const getAllProjectsThunk = thunk.request(
  'project/getAllProjects',
  getAllProjects
);

export const getProjectDetailThunk = thunk.request(
  'project/getProjectDetail',
  getProjectDetail
);

export const updateProjectThunk = thunk.request(
  'project/updateProject',
  updateProject
);

export const createProjectThunk = thunk.request(
  'project/createProject',
  createProject
);

export const deleteProjectThunk = thunk.request(
  'project/deleteProject',
  deleteProject
);

export const removeUserFromProjectThunk = thunk.request(
  'project/removeUserFromProject',
  removeUserFromProject
);

export const assignUserProjectThunk = thunk.request(
  'project/assignUserProject',
  assignUser
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearProjectDetail: () => {
      return initialState;
    },
  },
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

    builder
      .addCase(getProjectDetailThunk.pending, (state) => {
        state.projectDetail = null;
        state.isLoading = true;
      })
      .addCase(getProjectDetailThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projectDetail = payload;
      })
      .addCase(getProjectDetailThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { clearProjectDetail } = projectSlice.actions;
export default projectSlice.reducer;
