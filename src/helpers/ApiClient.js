import axios from "axios";
import { API } from "../config/config";

axios.defaults.withCredentials = true;
const apiClient = axios.create({
  baseURL: API,
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // const res = await apiClient.post("/auth/refresh-token");
        // const data = res.data;
        // console.log('ssssssssssssss',data)
        //   if(res.status == 401 || res.status == 403) {
        //     window.location.href = "/";
        //     return;
        //   }
        //   return apiClient(originalRequest);
      } catch (error) {
        // console.log('sssssssssssssss', error)
        //   // Handle refresh token error (e.g., redirect to login)
        //   console.error(error);
        //   window.location.href = "/";
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default apiClient;
