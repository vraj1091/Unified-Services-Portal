import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
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
      await api.get('/health', { timeout: 15000 }).catch(() => null);

      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 65000
      });
      
      localStorage.setItem('token', response.data.access_token);
      const meResponse = await api.get('/auth/me', { timeout: 30000 });
      setUser(meResponse.data);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('token');

      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          error: 'Server is taking too long to respond. Please try again in a few seconds.'
        };
      }

      if (!error.response) {
        return {
          success: false,
          error: 'Unable to reach server. Please check deployment status and try again.'
        };
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
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
