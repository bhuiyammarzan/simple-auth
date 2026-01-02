import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api",
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
      console.log("ERR2", error);
      originalRequest._retry = true;
      try {
        const response: AxiosResponse = await api.post("/auth/refresh-token");

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        api.defaults.headers.common["Authorization"] = `Brarer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Brarer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        console.log("error", error);
        localStorage.removeItem("accessToken");
      }
      return Promise.reject(error);
    }
  }
);

export default api;
