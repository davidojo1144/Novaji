import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';

import { useAuthStore } from '@/src/store/authStore';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real app, you would create an account and get a token
    login({ id: '2', email: data.email, name: data.name }, 'dummy-token');
    
    // AuthProvider will handle redirect
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
        <Text className="text-gray-500 mt-2">Sign up to get started</Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">Name</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 text-gray-900`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="John Doe"
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm mt-1">{errors.name.message}</Text>
          )}
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 text-gray-900`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>
          )}
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 text-gray-900`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
          )}
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1">Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 text-gray-900`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`w-full py-4 rounded-lg items-center justify-center mt-6 ${
            isSubmitting ? 'bg-blue-400' : 'bg-blue-600'
          }`}
        >
          <Text className="text-white font-bold text-lg">
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-600">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text className="text-blue-600 font-bold">Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
