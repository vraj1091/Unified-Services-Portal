import axios from 'axios';

const normalizeApiBaseUrl = (url) => {
  const cleaned = (url || '').trim().replace(/\/+$/, '');
  if (!cleaned) return '';
  if (cleaned.endsWith('/api')) return cleaned;
  return `${cleaned}/api`;
};

const getApiBaseUrls = () => {
  const envApiUrls = (import.meta.env.VITE_API_URLS || '')
    .split(',')
    .map((value) => normalizeApiBaseUrl(value))
    .filter(Boolean);

  const envApiUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
  if (envApiUrl) {
    envApiUrls.unshift(envApiUrl);
  }

  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    envApiUrls.push('http://localhost:8000/api');
    return [...new Set(envApiUrls)];
  }

  // Render preview/static aliases: keep frontend/backend suffix aligned.
  const renderMatch = hostname.match(/^gujarat-portal-(frontend|mobile)(-[a-z0-9]+)?\.onrender\.com$/i);
  if (renderMatch) {
    const suffix = renderMatch[2] || '';
    envApiUrls.push(`https://gujarat-portal-backend${suffix}.onrender.com/api`);
  }

  // Known backend host fallback for Render.
  envApiUrls.push('https://gujarat-portal-backend.onrender.com/api');

  return [...new Set(envApiUrls)];
};

const apiBaseUrls = getApiBaseUrls();

const api = axios.create({
  baseURL: apiBaseUrls[0],
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
    const originalRequest = error.config;
    const isNetworkIssue =
      !error.response &&
      (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.message === 'Network Error');

    if (isNetworkIssue && originalRequest && !originalRequest.__baseSwitched) {
      if (originalRequest.disableBaseRetry) {
        return Promise.reject(error);
      }

      const currentBase = originalRequest.baseURL || api.defaults.baseURL;
      const currentIndex = apiBaseUrls.findIndex((url) => currentBase?.startsWith(url));
      const fallbackBase = apiBaseUrls[currentIndex + 1];

      if (fallbackBase) {
        originalRequest.__baseSwitched = true;
        originalRequest.baseURL = fallbackBase;
        api.defaults.baseURL = fallbackBase;
        return api.request(originalRequest);
      }
    }

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
