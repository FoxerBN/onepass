import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { generateTokenWithExpiry } from '../hooks/useGenerateToken'
export function useLogin() {
  const router = useRouter();
  const [showPinInput, setShowPinInput] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAndAuthenticate = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        router.replace("/(auth)/register");
        return;
      }

      const canUseBiometrics =
        await SecureStore.canUseBiometricAuthentication();
      if (canUseBiometrics) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate with Fingerprint",
          fallbackLabel: "Enter PIN",
        });

        if (result.success) {
          await generateTokenWithExpiry()
          router.replace("/(tabs)");
          return;
        }
      }
      setShowPinInput(true);
      setLoading(false);
    };

    checkUserAndAuthenticate();
  }, []);

  const loginWithPin = async (pin: string) => {
    const storedData = await AsyncStorage.getItem("userData");
    if (!storedData) {
      Alert.alert("No user found", "Please register an account first.");
      router.replace("/(auth)/register");
      return;
    }

    const storedPin = await SecureStore.getItemAsync("pin");
    if (!storedPin) {
      Alert.alert("Error", "PIN not found. Please register again.");
      router.replace("/(auth)/register");
      return;
    }

    if (pin === storedPin) {
      await generateTokenWithExpiry();
      router.replace("/(tabs)");
    } else {
      Alert.alert("Login Failed", "Incorrect PIN.");
    }
  };

  return { showPinInput, loading, loginWithPin };
}
