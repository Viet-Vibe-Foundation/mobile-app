import axios from 'axios';
import {appInfo} from '../../constants';

const axiosInstance = axios.create({
  baseURL: appInfo.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.set('secret', appInfo.secretHeader);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
