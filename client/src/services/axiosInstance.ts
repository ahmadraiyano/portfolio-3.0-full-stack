import axios from 'axios';

/**
 * Single Axios instance for the whole app. Base URL comes from the
 * environment so the same build works against localhost and production.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the admin JWT (if present) to every outgoing request.
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error responses so callers can rely on `error.message`.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const message =
      (axios.isAxiosError(error) && (error.response?.data as { message?: string })?.message) ||
      (error instanceof Error && error.message) ||
      'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
