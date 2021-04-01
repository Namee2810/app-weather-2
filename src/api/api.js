import axiosClient from "./axiosClient";

const API_KEY = process.env.REACT_APP_API_KEY;

const api = {
  nowByCoords: (coords) => {
    return axiosClient.get(`/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`);
  },
  nowByCity: (city) => {
    return axiosClient.get(`/weather?q=${city}&appid=${API_KEY}`);
  },
  foreCastByCoords: (coords) => {
    return axiosClient.get(`/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`);
  },
  foreCastByCity: (city) => {
    return axiosClient.get(`/forecast?q=${city}&appid=${API_KEY}`);
  }
};

export default api;