import axios from 'axios';
import {appInfo} from '../../constants';
import {createSecretToken} from 'src/utils/cryptoUtil';

const axiosInstance = axios.create({
  baseURL: appInfo.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const secrectToken = createSecretToken();
    config.headers.set(appInfo.secretHeader, secrectToken);
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
