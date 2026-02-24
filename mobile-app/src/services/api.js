import axios from 'axios';
import { API_URL } from '../config';

// Check if we're in development mode
const isDevelopment = __DEV__;

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const warmupBackend = async () => {
  try {
    await api.get('/api/health', { timeout: 15000 });
    return true;
  } catch (error) {
    return false;
  }
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (isDevelopment) {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    if (isDevelopment) {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
api.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log('API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      if (isDevelopment) {
        console.error('Request timeout - Backend not responding');
      }
      error.message = 'Connection timeout. Please check if backend is running.';
    } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      if (isDevelopment) {
        console.error('Network error - Cannot reach backend');
      }
      error.message = 'Cannot connect to server. Please check your connection.';
    } else if (error.response) {
      // Server responded with error
      if (error.response.status === 401) {
        console.log('Unauthorized access');
        error.message = 'Invalid credentials. Please try again.';
      } else if (error.response.status === 404) {
        error.message = 'Resource not found.';
      } else if (error.response.status >= 500) {
        error.message = 'Server error. Please try again later.';
      }
    } else {
      console.error('Unknown error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
