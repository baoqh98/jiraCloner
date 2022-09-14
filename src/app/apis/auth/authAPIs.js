import { axiosClient } from '../axiosClient';

const authAPIs = {
  signIn: (user) => {
    return axiosClient.post('Users/signin', user);
  },
  signUp: () => {},
};

export default authAPIs;
