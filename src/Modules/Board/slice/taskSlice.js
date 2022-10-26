import { createSlice } from '@reduxjs/toolkit';
import thunk from '../../../app/apis/helper/thunk';
import taskAPIs from '../../../app/apis/taskAPIs/taskAPIs';

const { createTask, assignUserTask } = taskAPIs;

const initialState = {};

export const createTaskThunk = thunk.request('task/createTask', createTask);

export const assignUserTaskThunk = thunk.request(
  'task/assignUserTask',
  assignUserTask
);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default taskSlice.reducer;
