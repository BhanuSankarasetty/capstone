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
      // Mock: Check localStorage for user
      const storedUser = localStorage.getItem('fyp_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
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

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock Admin Login
      if (credentials.email === 'admin' && credentials.password === 'admin') {
        const adminUser = {
          id: 'admin-123',
          name: 'Admin User',
          email: 'admin@fyp.com',
          role: 'admin',
          avatar: 'https://github.com/shadcn.png'
        };
        localStorage.setItem('fyp_user', JSON.stringify(adminUser));
        setUser(adminUser);
        toast.success('Logged in as Admin!');
        navigate('/admin');
        return adminUser;
      }

      // Mock User/Vendor Login
      // For demo purposes, we'll just create a user based on email if not admin
      // In a real mock, we might check against a list of registered users in localStorage
      const mockUser = {
        id: 'user-' + Date.now(),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'user', // Default to user, or could be 'vendor' based on email pattern
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`
      };

      localStorage.setItem('fyp_user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Logged in successfully! (Mock)');
      navigate('/');
      return mockUser;

    } catch (error) {
      toast.error('Login failed.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      localStorage.removeItem('fyp_user');
      setUser(null);
      queryClient.clear();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed.');
    }
  };

  const signup = async (userData) => {
    try {
      setIsLoading(true);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser = {
        id: 'user-' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
      };

      // In a real app, we'd save this to a database. 
      // Here we just log them in immediately for convenience.
      localStorage.setItem('fyp_user', JSON.stringify(newUser));
      setUser(newUser);

      toast.success('Account created successfully! (Mock)');
      navigate('/');
      return newUser;
    } catch (error) {
      toast.error('Signup failed.');
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