import { axiosClient } from '../axiosClient';

const projectAPIs = {
  getAllProjects: () => {
    return axiosClient.get('Project/getAllProject');
  },

  createProject: (projectInfo) => {
    return axiosClient.post('Project/createProject', projectInfo);
  },

  deleteProject: (id) => {
    const params = new URLSearchParams();
    params.append('projectId', id);
    return axiosClient.delete('Project/deleteProject', {
      params,
    });
  },
};

export default projectAPIs;
