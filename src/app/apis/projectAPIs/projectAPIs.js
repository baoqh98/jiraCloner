import { axiosClient } from '../axiosClient';

const projectAPIs = {
  getAllProjects: () => {
    return axiosClient.get('Project/getAllProject');
  },

  createProject: (projectInfo) => {
    return axiosClient.post('Project/createProject', projectInfo);
  },

  deleteProject: (id) => {
    return axiosClient.delete('Project/deleteProject', id);
  },
};

export default projectAPIs;
