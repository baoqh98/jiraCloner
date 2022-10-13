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
};

export default taskAPIs;
