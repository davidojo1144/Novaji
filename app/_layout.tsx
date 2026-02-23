import '../src/styles/global.css';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';

import { QueryProvider } from '@/src/components/providers/QueryProvider';
import { ThemeProvider } from '@/src/components/providers/ThemeProvider';
import { AuthProvider } from '@/src/components/providers/AuthProvider';
import { toastConfig } from '@/src/components/ui/toast-config';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <Toast config={toastConfig} />
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </StripeProvider>
  );
}
