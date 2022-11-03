import { axiosClient } from '../axiosClient';

const usersAPIs = {
  getUsers: () => {
    return axiosClient.get('Users/getUser');
  },

  getUserByProjectId: (idProject) => {
    if (!idProject) return;
    const params = new URLSearchParams();
    params.append('idProject', idProject);
    return axiosClient.get('Users/getUserByProjectId', {
      params,
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
