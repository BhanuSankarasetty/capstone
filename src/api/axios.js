// src/api/axios.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'; // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sending/receiving httpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor for requests to attach JWT if stored in localStorage (less secure than httpOnly)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken'); // If you choose localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Optional: Add an interceptor for responses (e.g., refreshing tokens if expired)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       // Logic to refresh token
//       // try {
//       //   const response = await axios.post('/refresh-token', { withCredentials: true });
//       //   const newAccessToken = response.data.accessToken;
//       //   localStorage.setItem('accessToken', newAccessToken);
//       //   originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//       //   return axiosInstance(originalRequest);
//       // } catch (refreshError) {
//       //   // Logout user if refresh fails
//       //   return Promise.reject(refreshError);
//       // }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;