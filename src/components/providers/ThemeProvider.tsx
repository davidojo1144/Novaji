import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import React from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();

  return (
    <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </NavigationThemeProvider>
  );
}
