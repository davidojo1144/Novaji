import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/src/store/authStore';
import { User, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6">
      <View className="items-center mt-10">
        <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
          <User size={48} className="text-blue-600" />
        </View>
        <Text className="text-2xl font-bold text-gray-900">{user?.name || 'User Name'}</Text>
        <Text className="text-gray-500">{user?.email || 'user@example.com'}</Text>
      </View>

      <View className="mt-12 space-y-4">
        <View className="bg-white p-4 rounded-xl shadow-sm">
          <Text className="font-bold text-gray-900 mb-1">Account Info</Text>
          <Text className="text-gray-500 text-sm">Manage your personal information</Text>
        </View>

        <View className="bg-white p-4 rounded-xl shadow-sm">
          <Text className="font-bold text-gray-900 mb-1">Preferences</Text>
          <Text className="text-gray-500 text-sm">Theme, notifications, language</Text>
        </View>

        <View className="bg-white p-4 rounded-xl shadow-sm">
          <Text className="font-bold text-gray-900 mb-1">Security</Text>
          <Text className="text-gray-500 text-sm">Password, 2FA, connected devices</Text>
        </View>
      </View>

      <TouchableOpacity 
        onPress={() => logout()}
        className="flex-row items-center justify-center bg-red-50 p-4 rounded-xl mt-auto mb-8 border border-red-100"
      >
        <LogOut size={20} className="text-red-600 mr-2" />
        <Text className="text-red-600 font-bold">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
