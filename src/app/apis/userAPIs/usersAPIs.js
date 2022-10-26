import { axiosClient } from '../axiosClient';

const usersAPIs = {
  getUsers: () => {
    return axiosClient.get('Users/getUser');
  },

  getUserByProjectId: (idProject) => {
    if (!idProject) return;
    return axiosClient.get('Users/getUserByProjectId', {
      params: {
        idProject: idProject,
      },
    });
  },

  deleteUser: (id) => {
    const params = new URLSearchParams();
    params.append('id', id);
    return axiosClient.delete('Users/deleteUser', {
      params,
    });
  },
};

export default usersAPIs;
