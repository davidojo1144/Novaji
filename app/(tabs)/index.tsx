import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/src/store/authStore';
import { useRouter } from 'expo-router';
import { LogOut, Bell, Search, User } from 'lucide-react-native';

export default function HomeScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    // AuthProvider will handle redirect
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="flex-row justify-between items-center py-4">
          <View>
            <Text className="text-gray-500 text-sm">Welcome back,</Text>
            <Text className="text-2xl font-bold text-gray-900">{user?.name || 'Guest'}</Text>
          </View>
          <View className="flex-row gap-4">
            <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm">
              <Search size={24} className="text-gray-700" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm">
              <Bell size={24} className="text-gray-700" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner */}
        <View className="bg-blue-600 rounded-2xl p-6 mt-4 shadow-lg">
          <Text className="text-white text-lg font-bold">Discover New Features</Text>
          <Text className="text-blue-100 mt-2">Check out the latest updates to your dashboard and explore new possibilities.</Text>
          <TouchableOpacity className="bg-white px-4 py-2 rounded-lg self-start mt-4">
            <Text className="text-blue-600 font-bold">Explore Now</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View className="mt-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity key={item} className="w-[48%] bg-white p-4 rounded-xl shadow-sm">
                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mb-2">
                  <User size={20} className="text-blue-600" />
                </View>
                <Text className="font-bold text-gray-900">Action {item}</Text>
                <Text className="text-xs text-gray-500 mt-1">Description goes here</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button (Temporary for demo) */}
        <TouchableOpacity 
          onPress={handleLogout}
          className="flex-row items-center justify-center bg-red-50 p-4 rounded-xl mt-8 mb-8 border border-red-100"
        >
          <LogOut size={20} className="text-red-600 mr-2" />
          <Text className="text-red-600 font-bold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
