import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "/",
});

axiosInstance.interceptors.request.use((cfg) => {
  cfg.headers["Accept"] = "application/json";
  cfg.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return cfg;
});

export default axiosInstance;
