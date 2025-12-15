import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Book, TrendingUp } from 'lucide-react-native';

export default function ExploreScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <Text className="text-2xl font-bold text-white mb-1">Explore</Text>
        <Text className="text-indigo-100">Discover subjects and resources</Text>
      </View>

      {/* Content */}
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-900 mb-4">Popular Subjects</Text>
        
        <View className="grid grid-cols-2 gap-4">
          {[
            { name: 'Data Structures', count: 45, color: 'bg-blue-500' },
            { name: 'DBMS', count: 38, color: 'bg-green-500' },
            { name: 'Operating Systems', count: 32, color: 'bg-purple-500' },
            { name: 'Computer Networks', count: 28, color: 'bg-orange-500' },
          ].map((subject) => (
            <TouchableOpacity
              key={subject.name}
              className={`${subject.color} rounded-xl p-6`}
            >
              <Book size={28} color="white" className="mb-3" />
              <Text className="font-bold text-white text-base mb-1">{subject.name}</Text>
              <Text className="text-white/90 text-sm">{subject.count} resources</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Trending This Week</Text>
          
          <View className="space-y-3">
            {[
              { title: 'OS Process Scheduling Notes', downloads: 234 },
              { title: 'DBMS Normalization Guide', downloads: 198 },
              { title: 'Data Structures Cheat Sheet', downloads: 176 },
            ].map((item, idx) => (
              <View key={idx} className="bg-white p-4 rounded-xl shadow-sm flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg items-center justify-center">
                    <Text className="text-white font-bold">{idx + 1}</Text>
                  </View>
                  <View>
                    <Text className="font-semibold text-gray-900">{item.title}</Text>
                    <Text className="text-gray-500 text-sm">{item.downloads} downloads</Text>
                  </View>
                </View>
                <TrendingUp size={20} color="#10B981" />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}