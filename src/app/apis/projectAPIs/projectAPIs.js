import { axiosClient } from '../axiosClient';

const projectAPIs = {
  getAllProjects: () => {
    return axiosClient.get('Project/getAllProject');
  },

  createProject: (projectInfo) => {
    return axiosClient.post('Project/createProjectAuthorize', projectInfo);
  },

  deleteProject: (id) => {
    const params = new URLSearchParams();
    params.append('projectId', id);
    return axiosClient.delete('Project/deleteProject', {
      params,
    });
  },

  assignUser: (payload) => {
    return axiosClient.post('Project/assignUserProject', payload);
  },
};

export default projectAPIs;
