import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Modules/Auth/slice/authSlice';
import membersReducer from '../Modules/Project/slice/membersSlice';
import projectReducer from '../Modules/Project/slice/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    members: membersReducer,
  },
});

export const projectSelector = (state) => state.project;
export const authSelector = (state) => state.auth;
export const membersSelector = (state) => state.members;
