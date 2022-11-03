import axios, { AxiosError } from 'axios';
import { store } from '../store';

export const axiosClient = axios.create({
  baseURL: 'https://jiranew.cybersoft.edu.vn/api/',
  headers: {
    TokenCyberSoft:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMiIsIkhldEhhblN0cmluZyI6IjE1LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTUxNjgwMDAwMCIsIm5iZiI6MTY1MzkzMDAwMCwiZXhwIjoxNjgxNjY0NDAwfQ.oR9K8iSTqbo-t0Q_a-WFnKePPaMAr7sdlgR5xKAtQWA',
  },
});

const accessToken =
  'axiosClient.js:23 eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJmYWtlYXV0aEBnbWFpbC5jb20iLCJuYmYiOjE2Njc0Nzc0NzMsImV4cCI6MTY2NzQ4MTA3M30.dd7X_nsYffk_XiowXo81rSmAw2goI52TrP03FzE5N1g';

axiosClient.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error) => {
    return Promise.reject(error.response.data.message);
  }
);

axiosClient.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.data?.accessToken;
  console.log(accessToken);
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
