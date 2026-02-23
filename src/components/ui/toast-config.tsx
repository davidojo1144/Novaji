import { View, Text } from 'react-native';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#22c55e', backgroundColor: '#f0fdf4', borderRadius: 12, borderLeftWidth: 6 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#15803d'
      }}
      text2Style={{
        fontSize: 14,
        color: '#166534'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#ef4444', backgroundColor: '#fef2f2', borderRadius: 12, borderLeftWidth: 6 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b91c1c'
      }}
      text2Style={{
        fontSize: 14,
        color: '#991b1b'
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#3b82f6', backgroundColor: '#eff6ff', borderRadius: 12, borderLeftWidth: 6 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1d4ed8'
      }}
      text2Style={{
        fontSize: 14,
        color: '#1e40af'
      }}
    />
  ),
};
