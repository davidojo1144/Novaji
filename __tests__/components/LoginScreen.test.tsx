import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '@/app/(auth)/login';

// Mock dependencies
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('@/src/store/authStore', () => ({
  useAuthStore: () => ({
    login: jest.fn(),
  }),
}));

jest.mock('@/src/lib/api', () => ({
  post: jest.fn(),
}));

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    expect(getByText('Welcome Back')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
  });

  it('validates empty inputs', async () => {
    const { getByText, findByText } = render(<LoginScreen />);
    
    fireEvent.press(getByText('Sign In'));

    const emailError = await findByText('Invalid email address');
    const passwordError = await findByText('Password must be at least 6 characters');

    expect(emailError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });
});
