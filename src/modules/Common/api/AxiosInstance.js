import axios from 'axios';

const ENDPOINT = 'https://swapi.info/api/';

const axiosInstance = axios.create({
  baseURL: ENDPOINT,
});


export const abortControllers = {};

axiosInstance.interceptors.request.use(request => {
  if (!request?.data) {
    request.data = {};
  }

  return request;
});

export default axiosInstance;
