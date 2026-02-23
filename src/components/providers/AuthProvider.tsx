import React, { useEffect } from 'react';
import { useAuthStore } from '@/src/store/authStore';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to register screen by default for new users
      router.replace('/(auth)/register');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, navigationState?.key]);

  if (!navigationState?.key) {
    // Return null or a loading spinner while waiting for navigation to be ready
    return null; 
  }

  return <>{children}</>;
}
