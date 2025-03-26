import { StyleSheet, Image, Platform, View, Text, Alert, Button } from 'react-native';
import { Colors } from "../../../constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
export default function TabTwoScreen() {
  const router = useRouter();

  const handleRemoveData = async () => {
    await AsyncStorage.clear();
    await SecureStore.deleteItemAsync("pin");
    await SecureStore.deleteItemAsync("authToken");
    Alert.alert("Data Removed", "User data has been removed from SecureStore.");
    router.replace("/(auth)/login");
  };
  
  return (
    <View style={styles.container}>
      <Button title="Delete Account" onPress={handleRemoveData} />
      <Text style={styles.text}>delete account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
  },
});
