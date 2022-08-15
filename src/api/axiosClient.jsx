// api/axiosClient.js
import axios from "axios";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config` for the full list of configs

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/parse',
  headers: {
    "X-Parse-Application-Id": "CHIEN12",
    "X-Parse-REST-API-Key": "345678",
    "Content-Type": "application/json",
  },
 
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
