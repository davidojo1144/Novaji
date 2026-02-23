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

    // Add a small delay or check if the root layout is fully mounted
    // by ensuring we are not in the initial render phase
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
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
