import axios from 'axios';

// export const API_URL = '/api';
export const API_URL = 'http://localhost:8080';
// export const API_URL = 'https://solo-project-blog-back-nestjs.onrender.com';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers)
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    };
  return config;
});

export default $api;
