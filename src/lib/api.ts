import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('TOKEN');
  console.log('token', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    window.location.href = '/login';
  }
  return config;
});
