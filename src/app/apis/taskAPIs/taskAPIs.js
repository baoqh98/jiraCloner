import { axiosClient } from '../axiosClient';

const taskAPIs = {
  getTaskDetail: (taskId) => {
    if (!taskId) return;
    const params = new URLSearchParams();
    params.append('taskId', +taskId);
    return axiosClient.get('Project/getTaskDetail', {
      params,
    });
  },
  getAllStatus: () => {
    return axiosClient.get('Status/getAll');
  },
  getAllPriority: () => {
    return axiosClient.get('Priority/getAll');
  },
  getAllTaskType: () => {
    return axiosClient.get('TaskType/getAll');
  },
  createTask: (taskData) => {
    return axiosClient.post('Project/createTask', taskData);
  },
  assignUserTask: (assignees) => {
    return axiosClient.post('Project/assignUserTask', assignees);
  },

  // update task
  updateFullTask: (taskInfo) => {
    return axiosClient.post('Project/updateTask', taskInfo);
  },

  updateStatusTask: (statusInfo) => {
    return axiosClient.put('Project/updateStatus', statusInfo);
  },
  updatePriorityTask: (priorityInfo) => {
    return axiosClient.put('Project/updatePriority', priorityInfo);
  },
  updateDescriptionTask: (descriptionInfo) => {
    return axiosClient.put('Project/updateDescription', descriptionInfo);
  },
  updateTimeTrackingTask: (timeTrackingInfo) => {
    return axiosClient.put('Project/updateEstimate', timeTrackingInfo);
  },
  updateEstimatedHour: (hoursInfo) => {
    return axiosClient.put('Project/updateEstimate', hoursInfo);
  },
};

export default taskAPIs;
