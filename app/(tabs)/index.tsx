import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/src/store/authStore';
import { useRouter } from 'expo-router';
import { Bell, Search, User, CreditCard, Send, Smartphone, Wifi, ShoppingBag, ArrowRight } from 'lucide-react-native';

const quickActions = [
  { id: 1, title: 'Send Money', icon: Send, color: 'bg-green-100', iconColor: '#16a34a' },
  { id: 2, title: 'Pay Bills', icon: CreditCard, color: 'bg-orange-100', iconColor: '#ea580c' },
  { id: 3, title: 'Top Up', icon: Smartphone, color: 'bg-blue-100', iconColor: '#2563eb' },
  { id: 4, title: 'Internet', icon: Wifi, color: 'bg-purple-100', iconColor: '#9333ea' },
];

const recentTransactions = [
  { id: 1, title: 'Netflix Subscription', date: 'Today, 10:23 AM', amount: '-$15.99', type: 'debit' },
  { id: 2, title: 'Salary Deposit', date: 'Yesterday, 09:00 AM', amount: '+$2,500.00', type: 'credit' },
  { id: 3, title: 'Grocery Store', date: 'Yesterday, 06:45 PM', amount: '-$84.32', type: 'debit' },
];

export default function HomeScreen() {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-4 flex-row justify-between items-center bg-white shadow-sm pb-6 rounded-b-3xl">
          <View>
            <Text className="text-gray-500 text-sm font-medium">Welcome back,</Text>
            <Text className="text-2xl font-bold text-gray-900 mt-1">{user?.name || 'Guest'}</Text>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity className="p-3 bg-gray-100 rounded-full">
              <Search size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity className="p-3 bg-gray-100 rounded-full relative">
              <Bell size={24} color="#374151" />
              <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <View className="px-6 mt-6">
          <View className="bg-blue-600 rounded-3xl p-6 shadow-xl shadow-blue-200">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-blue-100 text-sm font-medium">Total Balance</Text>
                <Text className="text-white text-3xl font-bold mt-2">$12,450.00</Text>
              </View>
              <View className="bg-blue-500 p-2 rounded-lg">
                <CreditCard size={24} color="white" />
              </View>
            </View>
            <View className="mt-8 flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-white/20 py-3 rounded-xl items-center flex-row justify-center">
                <Plus size={18} color="white" className="mr-2" />
                <Text className="text-white font-bold">Add Money</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => router.push('/(tabs)/explore')}
                className="flex-1 bg-white py-3 rounded-xl items-center flex-row justify-center"
              >
                <ShoppingBag size={18} color="#2563eb" className="mr-2" />
                <Text className="text-blue-600 font-bold">Shop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mt-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} className="items-center w-[22%]">
                <View className={`w-14 h-14 ${action.color} rounded-2xl items-center justify-center mb-2 shadow-sm`}>
                  <action.icon size={24} color={action.iconColor} />
                </View>
                <Text className="text-xs font-medium text-gray-700 text-center" numberOfLines={1}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="px-6 mt-8 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">Recent Transactions</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-600 font-medium mr-1">See All</Text>
              <ArrowRight size={16} color="#2563eb" />
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-2xl p-2 shadow-sm">
            {recentTransactions.map((transaction, index) => (
              <View key={transaction.id} className={`flex-row justify-between items-center p-4 ${index !== recentTransactions.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <View className="flex-row items-center gap-4">
                  <View className={`w-10 h-10 rounded-full items-center justify-center ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft size={20} color="#16a34a" />
                    ) : (
                      <ArrowUpRight size={20} color="#ef4444" />
                    )}
                  </View>
                  <View>
                    <Text className="text-gray-900 font-bold">{transaction.title}</Text>
                    <Text className="text-gray-500 text-xs mt-0.5">{transaction.date}</Text>
                  </View>
                </View>
                <Text className={`font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
