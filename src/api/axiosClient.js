import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
  // if (localStorage.getItem("token"))
  // config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  throw error;
});

export default axiosClient;