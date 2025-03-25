import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [pin, setPin] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);

  // On mount, check for user data and try biometric authentication
  useEffect(() => {
    const checkUserAndAuthenticate = async () => {
      const userData = await SecureStore.getItemAsync("userData");
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
          global.isAuthenticated = true;
          router.replace("/(tabs)");
        } else {
          setShowPinInput(true);
        }
      } else {
        setShowPinInput(true);
      }
    };

    checkUserAndAuthenticate();
  }, []);

  const handleLogin = async () => {
    const storedData = await SecureStore.getItemAsync("userData");
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
      global.isAuthenticated = true;
      router.replace("/(tabs)");
    } else {
      Alert.alert("Login Failed", "Incorrect PIN.");
    }
  };

  const handleRemoveData = async () => {
    await SecureStore.deleteItemAsync("userData");
    Alert.alert("Data Removed", "User data has been removed from SecureStore.");
  };

  const handleRegisterPress = () => {
    router.push("/(auth)/register");
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top > 0 ? insets.top : 20,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 20,
        },
      ]}
    >
      <Animated.View
        entering={FadeInDown.duration(800).springify()}
        style={styles.headerContainer}
      >
        <Text style={styles.title}>Welcome Back</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(800).delay(200).springify()}
        style={styles.form}
      >
        {showPinInput && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter PIN"
              placeholderTextColor={Colors.icon}
              secureTextEntry
              value={pin}
              onChangeText={setPin}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login with PIN</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRemoveData}>
          <Text style={styles.linkText}>Remove Data (Test)</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
  },
  form: {
    gap: 15,
    width: width - 40,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.buttonPrimary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: Colors.linkText,
    textAlign: "center",
    marginTop: 15,
  },
  orText: {
    textAlign: "center",
    color: Colors.text,
    fontSize: 16,
    marginVertical: 10,
  },
});
