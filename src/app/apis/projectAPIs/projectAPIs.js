import { axiosClient } from '../axiosClient';

const projectAPIs = {
  getAllProjects: () => {
    return axiosClient.get('Project/getAllProject');
  },

  createProject: (projectInfo) => {
    return axiosClient.post('Project/createProject', projectInfo);
  },
};

export default projectAPIs;
