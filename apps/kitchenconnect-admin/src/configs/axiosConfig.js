/* eslint-disable no-unused-vars */
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Ensures cookies are sent with requests
});

// Interceptor to handle responses, e.g., to handle storing cookies
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses here, e.g., storing cookies
    const authToken = response.headers["set-cookie"]; // Adjust according to your backend response headers

    // Example: Store authToken in cookie or localStorage
    // document.cookie = `authToken=${authToken}; path=/`; // Example for setting cookie

    return response;
  },
  (error) => {
    // Handle error responses
    return Promise.reject(error);
  }
);

export default axiosInstance;
