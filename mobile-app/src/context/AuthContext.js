import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { setAuthToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const buildDemoUser = (email, extra = {}) => {
    const baseName = (email || 'demo.user').split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    const prettyName = baseName
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    return {
      id: 1,
      email: email || 'demo@example.com',
      full_name: prettyName || 'Demo User',
      mobile: '9876543210',
      city: 'Ahmedabad',
      ...extra,
    };
  };

  const persistSession = async ({ nextToken, nextUser, isDemo }) => {
    await AsyncStorage.setItem('token', nextToken);
    await AsyncStorage.setItem('user', JSON.stringify(nextUser));
    await AsyncStorage.setItem('demoMode', isDemo ? 'true' : 'false');

    setToken(nextToken);
    setUser(nextUser);
    setDemoMode(isDemo);

    setAuthToken(isDemo ? null : nextToken);
  };

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      const storedDemoMode = await AsyncStorage.getItem('demoMode');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setDemoMode(storedDemoMode === 'true');
        setAuthToken(storedDemoMode === 'true' ? null : storedToken);
      }
    } catch (error) {
      console.error('Failed to load auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Validate input
    if (!email || !password) {
      return {
        success: false,
        message: 'Please enter email and password',
      };
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const response = await api.post('/api/auth/login', {
        email: normalizedEmail,
        password,
      });

      const accessToken = response?.data?.access_token;
      if (!accessToken) {
        throw new Error('No access token received from server');
      }

      setAuthToken(accessToken);

      const meResponse = await api.get('/api/auth/me');
      const backendUser = meResponse?.data || buildDemoUser(normalizedEmail);

      await persistSession({
        nextToken: accessToken,
        nextUser: backendUser,
        isDemo: false,
      });

      return {
        success: true,
        message: 'Login successful',
      };
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
        setAuthToken(null);
        return {
          success: false,
          message: error.message || 'Invalid email or password',
        };
      }

      // Fallback to demo mode when backend is unavailable.
      try {
        const demoToken = `demo_token_${Date.now()}`;
        const demoUser = buildDemoUser(normalizedEmail);

        await persistSession({
          nextToken: demoToken,
          nextUser: demoUser,
          isDemo: true,
        });

        return {
          success: true,
          message: 'Backend unavailable. Signed in with demo mode.',
          demoMode: true,
        };
      } catch (storageError) {
        console.error('Storage error:', storageError);
        return {
          success: false,
          message: 'Failed to save login data',
        };
      }
    }
  };

  const register = async (userData) => {
    // Validate input
    if (!userData.email || !userData.password) {
      return {
        success: false,
        message: 'Please fill in all required fields',
      };
    }

    try {
      await api.post('/api/auth/register', {
        full_name: userData.full_name,
        email: userData.email.trim().toLowerCase(),
        mobile: userData.mobile,
        city: userData.city,
        password: userData.password,
      });

      return {
        success: true,
        message: 'Registration successful. Please sign in.',
      };
    } catch (error) {
      // Keep app usable without backend: allow demo registration flow.
      if (!error?.response) {
        return {
          success: true,
          message: 'Backend unavailable. You can still sign in using demo mode.',
        };
      }

      return {
        success: false,
        message: error.message || 'Registration failed. Please verify your details.',
      };
    }
  };

  const logout = async () => {
    // Clear in-memory auth first so UI always exits immediately,
    // even if local storage cleanup fails on a given platform.
    setToken(null);
    setUser(null);
    setDemoMode(false);
    setAuthToken(null);

    try {
      await AsyncStorage.multiRemove(['token', 'user', 'demoMode']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const value = {
    user,
    token,
    loading,
    demoMode,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
