import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Modules/Auth/slice/authSlice';
import taskDetailReducer from '../Modules/Board/slice/taskDetailSlice';
import taskReducer from '../Modules/Board/slice/taskSlice';
import projectReducer from '../Modules/Project/slice/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    task: taskReducer,
    taskDetail: taskDetailReducer,
  },
});

export const projectSelector = (state) => state.project;
export const authSelector = (state) => state.auth;
export const membersSelector = (state) => state.members;
export const taskSelector = (state) => state.task;
export const taskDetailSelector = (state) => state.taskDetail;
