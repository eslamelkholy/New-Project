import axios from "axios";
import _ from "lodash";

const axiosInstance = axios.create({
  baseURL: "/",
});

axiosInstance.interceptors.request.use((cfg) => {
  cfg.headers["Accept"] = "application/json";
  cfg.headers["Authorization"] = `${localStorage.getItem("Authorization")}`;
  return cfg;
});

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  async (error) => {
    if (_.get(error, "response.status") === 400) {
      return false;
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
