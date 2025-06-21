// File: src/api.js
import axios from "axios";

// Create a pre-configured Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000", // Adjust this if your backend has a specific prefix like /api
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally, add token to each request if it exists in localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
