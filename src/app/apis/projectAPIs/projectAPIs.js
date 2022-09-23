import { axiosClient } from '../axiosClient';

const projectAPIs = {
  getAllProjects: () => {
    return axiosClient.get('Project/getAllProject');
  },

  getProjectDetail: (id) => {
    return axiosClient.get('Project/getProjectDetail', {
      params: {
        id: id,
      },
    });
  },

  updateProject: (projectUpdate) => {
    return axiosClient.put('Project/updateProject', projectUpdate, {
      params: {
        projectId: projectUpdate.id,
      },
    });
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

  removeUserFromProject: (userProject) => {
    return axiosClient.post('Project/removeUserFromProject', userProject);
  },

  assignUser: (userProject) => {
    return axiosClient.post('Project/assignUserProject', userProject);
  },
};

export default projectAPIs;
