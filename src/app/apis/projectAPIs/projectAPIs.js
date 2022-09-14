import { axiosClient } from '../axiosClient';

const projectAPIs = {
  getAllProjects: () => {
    return axiosClient.get('Project/getAllProject');
  },
};

export default projectAPIs;
