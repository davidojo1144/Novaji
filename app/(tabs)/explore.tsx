import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ShoppingCart, Plus } from 'lucide-react-native';

import api from '@/src/lib/api';
import { useCartStore } from '@/src/store/cartStore';
import { Product } from '@/src/types';

export default function ProductListScreen() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/products');
      return response.data;
    },
  });

  const renderItem = ({ item }: { item: Product }) => (
    <View className="bg-white p-4 rounded-xl shadow-sm mb-4 mx-4">
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-48 rounded-lg mb-4"
        resizeMode="cover"
      />
      <View>
        <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
        <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-xl font-bold text-blue-600">${item.price}</Text>
          <TouchableOpacity
            onPress={() => addItem(item)}
            className="bg-blue-600 p-2 rounded-full"
          >
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-red-500 text-lg text-center mb-4">
          Failed to load products. Please check your connection.
        </Text>
        <TouchableOpacity 
          onPress={() => router.replace('/(tabs)/explore')}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center p-4 bg-white shadow-sm mb-2">
        <Text className="text-2xl font-bold text-gray-900">Products</Text>
        <TouchableOpacity 
          onPress={() => router.push('/cart')}
          className="relative p-2"
        >
          <ShoppingCart size={24} color="#11181C" />
          {cartItems.length > 0 && (
            <View className="absolute top-0 right-0 bg-red-500 w-5 h-5 rounded-full justify-center items-center">
              <Text className="text-white text-xs font-bold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
