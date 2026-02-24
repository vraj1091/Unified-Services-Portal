import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token) {
      if (token.startsWith('demo_token_') && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          localStorage.removeItem('user');
        } finally {
          setLoading(false);
        }
        return;
      }
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me', { timeout: 8000, disableBaseRetry: true });
      setUser(response.data);
    } catch (error) {
      // Silently fail - user is not authenticated
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Warm up Render free backend before auth request
      api.get('/health', { timeout: 4000, disableBaseRetry: true }).catch(() => null);

      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 10000,
        disableBaseRetry: true,
      });
      
      localStorage.setItem('token', response.data.access_token);
      try {
        const meResponse = await api.get('/auth/me', { timeout: 6000, disableBaseRetry: true });
        setUser(meResponse.data);
        localStorage.setItem('user', JSON.stringify(meResponse.data));
      } catch (meError) {
        // Do not fail login if profile endpoint is slow.
        const fallbackUser = {
          email: email?.trim(),
          full_name: email?.split('@')[0] || 'Citizen',
        };
        setUser(fallbackUser);
        localStorage.setItem('user', JSON.stringify(fallbackUser));
      }
      return { success: true };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Login error:', error?.message || error);
      }
      localStorage.removeItem('token');

      if (error.code === 'ECONNABORTED' || !error.response || error.response?.status === 404 || error.response?.status >= 500) {
        const offlineUser = {
          email: email?.trim(),
          full_name: email?.split('@')[0] || 'Citizen',
          mode: 'offline',
        };
        localStorage.setItem('token', `demo_token_${Date.now()}`);
        localStorage.setItem('user', JSON.stringify(offlineUser));
        setUser(offlineUser);
        return { success: true, offlineMode: true };
      }

      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
