import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { generateTokenWithExpiry } from '../hooks/useGenerateToken'
import Toast from "react-native-toast-message";
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
        SecureStore.canUseBiometricAuthentication();
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
      Toast.show({
            type: 'error',
            text1: "No user found",
            text2: "Please register an account first.",
            position: "top",
            visibilityTime: 3000,
          });
      router.replace("/(auth)/register");
      return;
    }

    const storedPin = await SecureStore.getItemAsync("pin");
    if (!storedPin) {
      Toast.show({
        type: 'error',
        text1: "PIN not found",
        text2: "Please register again.",
        position: "top",
        visibilityTime: 3000,
      });
      router.replace("/(auth)/register");
      return;
    }

    if (pin === storedPin) {
      await generateTokenWithExpiry();
      router.replace("/(tabs)");
    } else {
      Toast.show({
        type: 'error',
        text1: "Login Failed",
        text2: "ncorrect PIN.",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  return { showPinInput, loading, loginWithPin };
}
