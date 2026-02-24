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
      const timer = setTimeout(() => {
        router.replace('/(auth)/register');
      }, 0);
      return () => clearTimeout(timer);
    } else if (isAuthenticated && inAuthGroup) {
      const timer = setTimeout(() => {
        router.replace('/(tabs)');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, segments, navigationState?.key]);

  if (!navigationState?.key) {
    // Return null or a loading spinner while waiting for navigation to be ready
    return null; 
  }

  return <>{children}</>;
}
