import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message: string =
      (err.response?.data as { message?: string })?.message
      ?? err.message
      ?? 'Unexpected error';
    return Promise.reject(new Error(message));
  }
);

export default api;