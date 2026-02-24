import axios from 'axios';

const normalizeApiBaseUrl = (url) => {
  const cleaned = (url || '').trim().replace(/\/+$/, '');
  if (!cleaned) return '';
  if (cleaned.endsWith('/api')) return cleaned;
  return `${cleaned}/api`;
};

// Dynamic API base URL - works for Render and local development
const getApiBaseUrl = () => {
  const envApiUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
  if (envApiUrl) return envApiUrl;

  const hostname = window.location.hostname;
  
  // Development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000/api';
  }
  
  // Fallback to same-origin API path for proxied deployments
  return '/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  // Check if it's an admin route
  if (config.url?.includes('/admin')) {
    const adminToken = localStorage.getItem('admin_token');
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  // Fix double /api in URL
  if (config.url?.startsWith('/api/')) {
    config.url = config.url.replace('/api/', '/');
  }
  
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');
    const hasToken = !!localStorage.getItem('token');

    if (error.response?.status === 401 && !isAuthRequest && hasToken) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
