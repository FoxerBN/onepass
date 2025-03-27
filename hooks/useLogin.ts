import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

// Custom hook encapsulating login logic
export function useLogin() {
  const router = useRouter();
  const [showPinInput, setShowPinInput] = useState(false);
  const [loading, setLoading] = useState(true);

  // Runs on mount to check if user exists and try biometric auth
  useEffect(() => {
    const checkUserAndAuthenticate = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        // If no user data exists, redirect to register
        router.replace("/(auth)/register");
        return;
      }

      // Check for biometric support
      const canUseBiometrics =
        await SecureStore.canUseBiometricAuthentication();
      if (canUseBiometrics) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate with Fingerprint",
          fallbackLabel: "Enter PIN",
        });

        if (result.success) {
          // Generate and store a token if biometric auth succeeds
          const token = generateToken();
          await SecureStore.setItemAsync("authToken", token);
          router.replace("/(tabs)");
          return;
        }
      }

      // If biometric fails or isn't available, enable PIN input
      setShowPinInput(true);
      setLoading(false);
    };

    checkUserAndAuthenticate();
  }, []);

  // Function to handle PIN login
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
      const token = generateToken();
      await SecureStore.setItemAsync("authToken", token);
      router.replace("/(tabs)");
    } else {
      Alert.alert("Login Failed", "Incorrect PIN.");
    }
  };

  // Helper function to generate a pseudo-random token
  const generateToken = () => {
    return (
      Math.random().toString(36).substring(2) +
      Date.now().toString(36)
    );
  };

  return { showPinInput, loading, loginWithPin };
}
