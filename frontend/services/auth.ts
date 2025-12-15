import api from '@/lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async login(identifier: string, password: string) {
    try {
      const response = await api.post('/auth/login', { identifier, password });
      
      if (response.data.success) {
        await AsyncStorage.setItem('@auth_token', response.data.token);
        await AsyncStorage.setItem('@user_data', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  },

  async register(userData: any) {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success) {
        await AsyncStorage.setItem('@auth_token', response.data.token);
        await AsyncStorage.setItem('@user_data', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed',
      };
    }
  },

  async logout() {
    await AsyncStorage.multiRemove(['@auth_token', '@user_data']);
    return { success: true };
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch user',
      };
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch profile',
      };
    }
  },
};