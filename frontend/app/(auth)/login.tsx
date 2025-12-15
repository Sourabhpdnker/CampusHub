import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!form.identifier || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await login(form.identifier, form.password);
      if (result.success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-indigo-600 to-purple-700">
      <View className="flex-1 min-h-screen p-6">
        {/* Header */}
        <View className="items-center mt-16 mb-12">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6">
            <Text className="text-indigo-600 text-4xl font-bold">CC</Text>
          </View>
          <Text className="text-4xl font-bold text-white mb-2">
            Campus Connect
          </Text>
          <Text className="text-indigo-100 text-lg">
            Your College Community
          </Text>
        </View>

        {/* Login Form */}
        <View className="bg-white rounded-3xl p-8 shadow-2xl">
          <Text className="text-2xl font-bold text-gray-800 mb-8">
            Welcome Back!
          </Text>

          <View className="space-y-6">
            {/* Email/USN Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                USN or Email
              </Text>
              <View className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <TextInput
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-800"
                  placeholder="Enter USN or email"
                  value={form.identifier}
                  onChangeText={(text) => setForm({ ...form, identifier: text })}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password
              </Text>
              <View className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <TextInput
                  className="w-full pl-10 pr-12 py-3.5 border border-gray-300 rounded-xl text-gray-800"
                  placeholder="Enter your password"
                  value={form.password}
                  onChangeText={(text) => setForm({ ...form, password: text })}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className={`w-full py-4 rounded-xl ${
                loading ? 'bg-indigo-400' : 'bg-indigo-600'
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="items-center">
              <Text className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/(auth)/signup" className="text-indigo-600 font-semibold">
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}