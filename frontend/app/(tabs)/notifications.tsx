import { View, Text, ScrollView } from 'react-native';
import { FileText, ThumbsUp, Bell, MessageSquare } from 'lucide-react-native';

export default function NotificationsScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <Text className="text-2xl font-bold text-white mb-1">Notifications</Text>
        <Text className="text-indigo-100">Stay updated with activities</Text>
      </View>
      
      {/* Notifications List */}
      <View className="p-4 space-y-3">
        {[
          { text: 'New notes uploaded in Data Structures', time: '10 min ago', unread: true, icon: <FileText size={20} color="#4F46E5" /> },
          { text: 'Your post received 10 upvotes', time: '1 hour ago', unread: true, icon: <ThumbsUp size={20} color="#4F46E5" /> },
          { text: 'New announcement: Exam schedule', time: '2 hours ago', unread: false, icon: <Bell size={20} color="#6B7280" /> },
          { text: 'Someone commented on your project', time: '5 hours ago', unread: false, icon: <MessageSquare size={20} color="#6B7280" /> },
        ].map((notif, idx) => (
          <View
            key={idx}
            className={`p-4 rounded-xl flex-row items-start gap-3 ${
              notif.unread ? 'bg-indigo-50 border-l-4 border-indigo-600' : 'bg-white shadow-sm'
            }`}
          >
            <View className={`p-2 rounded-lg ${notif.unread ? 'bg-indigo-100' : 'bg-gray-100'}`}>
              {notif.icon}
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-medium">{notif.text}</Text>
              <Text className="text-gray-500 text-sm mt-1">{notif.time}</Text>
            </View>
            {notif.unread && <View className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}