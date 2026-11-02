import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalize backend error responses so callers can rely on err.message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage = error.response?.data?.message;
    if (backendMessage) {
      error.message = backendMessage;
    }
    return Promise.reject(error);
  },
);

export default api;
