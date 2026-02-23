import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import React from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationThemeProvider value={DefaultTheme}>
      {children}
    </NavigationThemeProvider>
  );
}
