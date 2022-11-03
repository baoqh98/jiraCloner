import { createSlice } from '@reduxjs/toolkit';
import thunk from '../../../app/apis/helper/thunk';
import taskAPIs from '../../../app/apis/taskAPIs/taskAPIs';

const {
  getTaskDetail,
  updateStatusTask,
  updatePriorityTask,
  updateDescriptionTask,
  updateEstimatedHour,
  updateFullTask,
} = taskAPIs;

const initialState = {
  data: null,
  isLoading: false,
  error: '',
};

export const getTaskDetailThunk = thunk.request(
  'taskDetail/getTaskDetail',
  getTaskDetail
);

export const updateTaskThunk = thunk.request(
  'taskDetail/updateTask',
  updateFullTask
);

export const updateStatusThunk = thunk.request(
  'taskDetail/updateStatus',
  updateStatusTask
);

export const updatePriorityThunk = thunk.request(
  'taskDetail/updatePriority',
  updatePriorityTask
);

export const updateDescriptionThunk = thunk.request(
  'taskDetail/updateDescription',
  updateDescriptionTask
);

export const updateEstimatedHourThunk = thunk.request(
  'taskDetail/updateEstimate',
  updateEstimatedHour
);

const taskDetailSlice = createSlice({
  name: 'taskDetail',
  initialState,
  reducers: {
    resetHandler: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskDetailThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskDetailThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(getTaskDetailThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { resetHandler } = taskDetailSlice.actions;
export default taskDetailSlice.reducer;
