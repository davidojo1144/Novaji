import { View, Text, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { Minus, Plus, Trash2, CreditCard } from 'lucide-react-native';
import { useStripe } from '@stripe/stripe-react-native';

import { useCartStore } from '@/src/store/cartStore';
import { useAuthStore } from '@/src/store/authStore';
import api from '@/src/lib/api';
import { CartItem } from '@/src/types';

export default function CartScreen() {
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { user } = useAuthStore();
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await api.post('/payment/create-payment-intent', {
        amount: total,
        currency: 'usd',
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment sheet params:', error);
      Alert.alert('Error', 'Unable to initialize payment');
      return null;
    }
  };

  const initializePaymentSheet = async () => {
    const data = await fetchPaymentSheetParams();
    if (!data) return;

    const { clientSecret } = data;

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Novaji Store',
      paymentIntentClientSecret: clientSecret,
      defaultBillingDetails: {
        name: user?.name,
        email: user?.email,
      },
    });

    if (error) {
      Alert.alert('Error', error.message);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      clearCart();
      router.replace('/(tabs)/explore');
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="flex-row bg-white p-4 rounded-2xl shadow-sm mb-4 mx-4 border border-gray-100">
      <Image 
        source={{ uri: item.image }} 
        className="w-24 h-24 rounded-xl mr-4 bg-gray-100"
        resizeMode="cover"
      />
      <View className="flex-1 justify-between py-1">
        <View>
          <Text className="text-lg font-bold text-gray-900 leading-tight" numberOfLines={2}>{item.name}</Text>
          <Text className="text-blue-600 font-extrabold text-lg mt-1">${item.price}</Text>
        </View>
        
        <View className="flex-row justify-between items-center mt-3">
          <View className="flex-row items-center bg-gray-50 rounded-full border border-gray-200">
            <TouchableOpacity 
              onPress={() => {
                if (item.quantity > 1) {
                  updateQuantity(item.id, item.quantity - 1);
                } else {
                  removeItem(item.id);
                }
              }}
              className="p-2 w-8 h-8 items-center justify-center"
            >
              <Minus size={14} color="#374151" />
            </TouchableOpacity>
            <Text className="px-3 font-bold text-gray-900 text-base">{item.quantity}</Text>
            <TouchableOpacity 
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 w-8 h-8 items-center justify-center"
            >
              <Plus size={14} color="#374151" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            onPress={() => removeItem(item.id)}
            className="bg-red-50 p-2 rounded-full"
          >
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerTitle: 'Shopping Cart', headerBackTitle: 'Back' }} />
      {items.length === 0 ? (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-gray-500 text-lg mb-4">Your cart is empty</Text>
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-blue-600 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-bold">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          
          <View className="absolute bottom-0 left-0 right-0 bg-white p-6 shadow-2xl rounded-t-3xl border border-gray-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500 text-base">Subtotal</Text>
              <Text className="text-gray-900 font-medium">${total.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-6">
              <Text className="text-gray-500 text-base">Tax (5%)</Text>
              <Text className="text-gray-900 font-medium">${(total * 0.05).toFixed(2)}</Text>
            </View>
            <View className="h-[1px] bg-gray-100 mb-4" />
            <View className="flex-row justify-between mb-6">
              <Text className="text-gray-900 text-xl font-bold">Total</Text>
              <Text className="text-blue-600 text-2xl font-extrabold">${(total * 1.05).toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              onPress={openPaymentSheet}
              className="bg-blue-600 py-4 rounded-2xl flex-row justify-center items-center shadow-lg shadow-blue-200"
            >
              <CreditCard size={20} color="white" className="mr-2" />
              <Text className="text-white font-bold text-lg">Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
