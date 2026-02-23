import React, { useEffect } from 'react';
import { useAuthStore } from '@/src/store/authStore';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // NOTE: Authentication flow is temporarily disabled to prevent navigation race conditions
    // until you are ready to integrate authentication fully.
    
    /*
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
    */
  }, [isAuthenticated, segments, navigationState?.key]);

  return <>{children}</>;
}
