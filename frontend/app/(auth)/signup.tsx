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
import { User, Mail, Lock, Book } from 'lucide-react-native';

export default function SignupScreen() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    usn: '',
    email: '',
    password: '',
    fullName: '',
    branch: 'CSE',
    semester: '3',
    college: '',
  });
  const { register } = useAuth();

  const branches = ['CSE', 'ISE', 'ECE', 'ME', 'CE', 'EEE'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const handleSignup = async () => {
    // Basic validation
    if (!form.usn || !form.email || !form.password || !form.fullName || !form.college) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        ...form,
        semester: parseInt(form.semester),
        year: new Date().getFullYear(),
        section: 'A',
      });

      if (result.success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Registration Failed', result.error);
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
        {/* Signup Form */}
        <View className="bg-white rounded-3xl p-8 shadow-2xl mt-12">
          <Text className="text-2xl font-bold text-gray-800 mb-8">
            Create Account
          </Text>

          <View className="space-y-4">
            {/* Full Name */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Full Name
              </Text>
              <TextInput
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-800"
                placeholder="Enter your full name"
                value={form.fullName}
                onChangeText={(text) => setForm({ ...form, fullName: text })}
              />
            </View>

            {/* USN */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                USN Number
              </Text>
              <TextInput
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-800"
                placeholder="Enter your USN"
                value={form.usn}
                onChangeText={(text) => setForm({ ...form, usn: text.toUpperCase() })}
                autoCapitalize="characters"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                College Email
              </Text>
              <TextInput
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-800"
                placeholder="your.email@college.edu"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Branch & Semester */}
            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Branch
                </Text>
                <View className="border border-gray-300 rounded-xl px-4 py-3">
                  {/* You can use Picker or create a custom dropdown */}
                  <TextInput
                    className="text-gray-800"
                    placeholder="CSE"
                    value={form.branch}
                    onChangeText={(text) => setForm({ ...form, branch: text })}
                  />
                </View>
              </View>

              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Semester
                </Text>
                <View className="border border-gray-300 rounded-xl px-4 py-3">
                  <TextInput
                    className="text-gray-800"
                    placeholder="3"
                    value={form.semester}
                    onChangeText={(text) => setForm({ ...form, semester: text })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {/* College */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                College
              </Text>
              <TextInput
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-800"
                placeholder="College name"
                value={form.college}
                onChangeText={(text) => setForm({ ...form, college: text })}
              />
            </View>

            {/* Password */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password
              </Text>
              <TextInput
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-800"
                placeholder="Create a strong password"
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                secureTextEntry
              />
            </View>

            {/* Create Account Button */}
            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              className={`w-full py-4 rounded-xl mt-4 ${
                loading ? 'bg-indigo-400' : 'bg-indigo-600'
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {loading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View className="items-center mt-4">
              <Text className="text-gray-600">
                Already have an account?{' '}
                <Link href="/(auth)/login" className="text-indigo-600 font-semibold">
                  Sign In
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}