import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

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

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      const storedDemoMode = await AsyncStorage.getItem('demoMode');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setDemoMode(storedDemoMode === 'true');
        if (storedDemoMode !== 'true') {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
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

    console.log('Attempting login...');
    
    // Always use demo mode for now (backend not configured)
    // This ensures the app works immediately without any setup
    console.log('Using demo mode - backend not required');
    
    // Create demo user
    const demoUser = {
      id: 1,
      email: email,
      full_name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      mobile: '9876543210',
      city: 'Ahmedabad',
    };
    
    const demoToken = 'demo_token_' + Date.now();
    
    try {
      await AsyncStorage.setItem('token', demoToken);
      await AsyncStorage.setItem('user', JSON.stringify(demoUser));
      await AsyncStorage.setItem('demoMode', 'true');
      
      setToken(demoToken);
      setUser(demoUser);
      setDemoMode(true);
      
      console.log('Demo login successful');
      
      return { 
        success: true, 
        message: 'Login successful (Demo Mode)' 
      };
    } catch (error) {
      console.error('Storage error:', error);
      return {
        success: false,
        message: 'Failed to save login data',
      };
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

    console.log('Attempting registration...');
    
    // Always use demo mode for now (backend not configured)
    console.log('Using demo mode - backend not required');
    
    // Create demo user from registration data
    const demoUser = {
      id: 1,
      email: userData.email,
      full_name: userData.full_name || 'Demo User',
      mobile: userData.mobile || '9876543210',
      city: userData.city || 'Ahmedabad',
    };
    
    const demoToken = 'demo_token_' + Date.now();
    
    try {
      await AsyncStorage.setItem('token', demoToken);
      await AsyncStorage.setItem('user', JSON.stringify(demoUser));
      await AsyncStorage.setItem('demoMode', 'true');
      
      console.log('Demo registration successful');
      
      return { 
        success: true, 
        data: demoUser,
        message: 'Registration successful (Demo Mode)' 
      };
    } catch (error) {
      console.error('Storage error:', error);
      return {
        success: false,
        message: 'Failed to save registration data',
      };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('demoMode');
      setToken(null);
      setUser(null);
      setDemoMode(false);
      delete api.defaults.headers.common['Authorization'];
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
