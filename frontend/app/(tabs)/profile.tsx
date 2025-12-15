import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { User, Bookmark, Upload, Award, Mail, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <View className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 items-center">
        <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
          <Text className="text-indigo-600 text-3xl font-bold">
            {user?.fullName?.charAt(0) || 'U'}
          </Text>
        </View>
        <Text className="text-2xl font-bold text-white">{user?.fullName || 'Student'}</Text>
        <Text className="text-indigo-100">{user?.usn || 'USN'}</Text>
        <Text className="text-indigo-100 text-sm mt-1">
          {user?.branch} • {user?.semester} Semester
        </Text>

        <View className="flex-row justify-center space-x-8 mt-6">
          <View className="items-center">
            <Text className="text-3xl font-bold text-white">350</Text>
            <Text className="text-indigo-100 text-sm">Points</Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-white">24</Text>
            <Text className="text-indigo-100 text-sm">Uploads</Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-white">156</Text>
            <Text className="text-indigo-100 text-sm">Helped</Text>
          </View>
        </View>
      </View>

      {/* Profile Options */}
      <View className="p-4">
        {[
          { icon: <User size={20} color="#4F46E5" />, label: 'Edit Profile', desc: 'Update your information' },
          { icon: <Bookmark size={20} color="#4F46E5" />, label: 'Saved Posts', desc: '12 saved items' },
          { icon: <Upload size={20} color="#4F46E5" />, label: 'My Uploads', desc: '24 contributions' },
          { icon: <Award size={20} color="#4F46E5" />, label: 'Achievements', desc: '8 badges earned' },
          { icon: <Mail size={20} color="#4F46E5" />, label: 'Messages', desc: 'Unread messages' },
        ].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            className="w-full bg-white p-4 rounded-xl shadow-sm mb-2 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="p-2 bg-indigo-100 rounded-lg mr-3">
                {item.icon}
              </View>
              <View>
                <Text className="font-medium text-gray-900">{item.label}</Text>
                <Text className="text-gray-500 text-sm">{item.desc}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full bg-red-50 p-4 rounded-xl mt-4 items-center"
        >
          <View className="flex-row items-center">
            <LogOut size={20} color="#DC2626" />
            <Text className="text-red-600 font-semibold ml-2">Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}