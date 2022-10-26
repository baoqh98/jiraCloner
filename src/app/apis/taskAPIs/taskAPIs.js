import { axiosClient } from '../axiosClient';

const taskAPIs = {
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
};

export default taskAPIs;
