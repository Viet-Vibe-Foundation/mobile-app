import axios from 'axios';
import {store} from 'src/libs/redux/store';
import {createSecretToken} from 'src/utils/cryptoUtil';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL as string,
  headers: {
    'Content-Type': 'application/json',
    'X-App-Client': 'mobile',
  },
  timeout: 20000,
  timeoutErrorMessage: 'Something went wrong, please try again (Timeout)',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const authObject = store.getState().auth;
    const secrectToken = createSecretToken();
    config.headers.set('secret', secrectToken);
    authObject.isAuth &&
      config.headers.setAuthorization(`Bearer ${authObject.authToken}`);
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
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
