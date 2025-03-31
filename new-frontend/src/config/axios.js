import axios from 'axios';

const baseURL = import.meta.env.MODE === 'production'
  ? 'https://your-backend-url.onrender.com'  // You'll update this with your Render URL
  : 'http://localhost:5000';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;