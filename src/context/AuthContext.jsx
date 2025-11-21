// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios'; // Our configured axios instance
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data if authenticated
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Function to check auth status on app load/refresh
  const checkAuthStatus = async () => {
    try {
      // Endpoint to verify token and return user data
      const response = await axios.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/login', credentials);
      // Backend should set an httpOnly cookie with JWT
      setUser(response.data.user);
      toast.success('Logged in successfully!');
      navigate('/'); // Redirect to home or dashboard
      return response.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout'); // Endpoint to clear httpOnly cookie on backend
      setUser(null);
      queryClient.clear(); // Clear all React Query cache
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed.');
    }
  };

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/auth/register', userData);
      // For signup, we might auto-login or redirect to login page
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const authContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
  };

  if (isLoading) {
    // Or render a global spinner/skeleton while checking auth status
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl text-blue-600">
        Loading authentication...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};