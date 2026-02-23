import { View, Text, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/src/store/authStore';
import { User, LogOut, ChevronRight, Settings, Shield, Bell, CreditCard, CircleHelp, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const MenuSection = ({ title, items }: { title: string, items: any[] }) => (
    <View className="mb-6">
      <Text className="text-gray-500 font-bold text-sm mb-3 px-4 uppercase tracking-wider">{title}</Text>
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm mx-4">
        {items.map((item, index) => (
          <TouchableOpacity 
            key={index}
            className={`flex-row items-center justify-between p-4 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <View className="flex-row items-center gap-3">
              <View className={`w-10 h-10 rounded-full items-center justify-center ${item.color}`}>
                <item.icon size={20} color={item.iconColor} />
              </View>
              <Text className="text-gray-900 font-medium text-base">{item.label}</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const accountItems = [
    { label: 'Personal Information', icon: User, color: 'bg-blue-50', iconColor: '#2563eb' },
    { label: 'Payment Methods', icon: CreditCard, color: 'bg-green-50', iconColor: '#16a34a' },
    { label: 'Security', icon: Shield, color: 'bg-orange-50', iconColor: '#ea580c' },
  ];

  const preferencesItems = [
    { label: 'Notifications', icon: Bell, color: 'bg-purple-50', iconColor: '#9333ea' },
    { label: 'Help & Support', icon: CircleHelp, color: 'bg-pink-50', iconColor: '#db2777' },
    { label: 'Terms & Privacy', icon: FileText, color: 'bg-gray-100', iconColor: '#4b5563' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-white pb-6 pt-2 rounded-b-3xl shadow-sm mb-6">
          <View className="items-center">
            <View className="relative">
              <View className="w-28 h-28 bg-gray-100 rounded-full items-center justify-center border-4 border-white shadow-sm">
                <User size={48} color="#9ca3af" />
              </View>
              <View className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-2 border-white">
                <Settings size={16} color="white" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-gray-900 mt-4">{user?.name || 'Guest User'}</Text>
            <Text className="text-gray-500 text-base">{user?.email || 'guest@example.com'}</Text>
            
            <View className="flex-row gap-3 mt-6">
              <View className="bg-blue-50 px-4 py-2 rounded-full">
                <Text className="text-blue-700 font-bold text-xs uppercase tracking-wide">Premium Member</Text>
              </View>
              <View className="bg-green-50 px-4 py-2 rounded-full">
                <Text className="text-green-700 font-bold text-xs uppercase tracking-wide">Verified</Text>
              </View>
            </View>
          </View>
        </View>

        <MenuSection title="Account" items={accountItems} />
        <MenuSection title="Preferences" items={preferencesItems} />

        <View className="px-4 mb-10">
          <TouchableOpacity 
            onPress={handleLogout}
            className="flex-row items-center justify-center bg-red-50 py-4 rounded-2xl border border-red-100 active:bg-red-100"
          >
            <LogOut size={20} color="#dc2626" className="mr-2" />
            <Text className="text-red-600 font-bold text-lg ml-2">Log Out</Text>
          </TouchableOpacity>
          <Text className="text-center text-gray-400 text-xs mt-4">Version 1.0.0 (Build 1024)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
