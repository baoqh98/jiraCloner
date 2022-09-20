import { axiosClient } from '../axiosClient';

const usersAPIs = {
  getUser: () => {
    return axiosClient.get('Users/getUser');
  },

  getUserByProjectId: (idProject) => {
    const params = URLSearchParams();
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
