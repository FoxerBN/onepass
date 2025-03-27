import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export const useRemoveData = () => {
  const router = useRouter();

  const removeData = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
      await SecureStore.deleteItemAsync("pin");
      await SecureStore.deleteItemAsync("authToken");
      Alert.alert("Data Removed", "User data has been removed from SecureStore.");
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Error", "Failed to remove data.");
    }
  };

  return { removeData };
};
