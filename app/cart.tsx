import { View, Text, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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
    <View className="flex-row bg-white p-4 rounded-xl shadow-sm mb-4 mx-4">
      <Image 
        source={{ uri: item.image }} 
        className="w-20 h-20 rounded-lg mr-4"
        resizeMode="cover"
      />
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>{item.name}</Text>
          <Text className="text-blue-600 font-bold mt-1">${item.price}</Text>
        </View>
        
        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row items-center bg-gray-100 rounded-lg">
            <TouchableOpacity 
              onPress={() => {
                if (item.quantity > 1) {
                  updateQuantity(item.id, item.quantity - 1);
                } else {
                  removeItem(item.id);
                }
              }}
              className="p-2"
            >
              <Minus size={16} color="#11181C" />
            </TouchableOpacity>
            <Text className="px-2 font-bold text-gray-900">{item.quantity}</Text>
            <TouchableOpacity 
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2"
            >
              <Plus size={16} color="#11181C" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Trash2 size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 bg-white shadow-sm mb-2">
        <Text className="text-2xl font-bold text-gray-900">Shopping Cart</Text>
      </View>

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
          
          <View className="absolute bottom-0 left-0 right-0 bg-white p-6 shadow-lg border-t border-gray-100">
            <View className="flex-row justify-between mb-4">
              <Text className="text-gray-500 text-lg">Total</Text>
              <Text className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              onPress={openPaymentSheet}
              className="bg-blue-600 py-4 rounded-xl flex-row justify-center items-center"
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
