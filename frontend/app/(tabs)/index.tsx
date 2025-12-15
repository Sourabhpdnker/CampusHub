import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, FileText, Users, Award, ThumbsUp, MessageSquare, Download, Bookmark, Share2 } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-gradient-to-r from-indigo-600 to-purple-600 pt-12 pb-6 px-6">
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-2xl font-bold text-white">Campus Connect</Text>
            <Text className="text-indigo-100">
              Welcome back, {user?.fullName?.split(' ')[0] || 'Student'}!
            </Text>
          </View>
          <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
            <Text className="text-indigo-600 font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <TextInput
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60"
            placeholder="Search notes, projects..."
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Sample Post */}
        <View className="bg-white rounded-xl shadow-sm mb-4">
          <View className="p-4">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-indigo-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold">RK</Text>
              </View>
              <View>
                <Text className="font-semibold text-gray-900">Rahul Kumar</Text>
                <Text className="text-gray-500 text-sm">1MS21CS001 • 2 hours ago</Text>
              </View>
            </View>
            
            <Text className="font-bold text-lg text-gray-900 mb-3">
              Data Structures Notes - Unit 3
            </Text>
            
            <View className="flex-row flex-wrap gap-2 mb-4">
              <View className="bg-indigo-100 px-3 py-1 rounded-full">
                <Text className="text-indigo-700 text-xs font-medium">Data Structures</Text>
              </View>
              <View className="bg-purple-100 px-3 py-1 rounded-full">
                <Text className="text-purple-700 text-xs font-medium">3rd Sem</Text>
              </View>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-700 text-xs font-medium">Notes</Text>
              </View>
            </View>

            {/* Actions */}
            <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
              <View className="flex-row space-x-6">
                <TouchableOpacity className="flex-row items-center">
                  <ThumbsUp size={18} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">45</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <MessageSquare size={18} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">12</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Download size={18} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">120</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row">
                <TouchableOpacity className="p-2">
                  <Bookmark size={18} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2">
                  <Share2 size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}