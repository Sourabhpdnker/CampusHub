import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  usn: string;
  email: string;
  fullName: string;
  branch: string;
  semester: number;
  section?: string;
  college: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<any>;
  register: (userData: any) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user_data');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (identifier: string, password: string) => {
    try {
      // Mock API call - replace with actual API
      const mockUser = {
        id: '1',
        usn: identifier.toUpperCase(),
        email: 'test@college.edu',
        fullName: 'Test User',
        branch: 'CSE',
        semester: 3,
        section: 'A',
        college: 'Test College',
      };

      await AsyncStorage.setItem('@user_data', JSON.stringify(mockUser));
      await AsyncStorage.setItem('@auth_token', 'mock-jwt-token');
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData: any) => {
    try {
      // Mock API call - replace with actual API
      const newUser = {
        id: '1',
        ...userData,
      };

      await AsyncStorage.setItem('@user_data', JSON.stringify(newUser));
      await AsyncStorage.setItem('@auth_token', 'mock-jwt-token');
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['@user_data', '@auth_token']);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};