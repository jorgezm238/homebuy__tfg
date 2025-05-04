// resources/js/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // prefijo para tus rutas API
  withCredentials: true,               // importante para Sanctum
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
