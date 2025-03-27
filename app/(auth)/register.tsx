import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [appNick, setAppNick] = useState("");
  const [pin, setPin] = useState("");
  const [pinHint, setPinHint] = useState("");
  const [decryptionPin, setDecryptionPin] = useState("");


  const validateStep = () => {
    if (currentStep === 1) {
      if (!firstName.trim() || !lastName.trim()) {
        Alert.alert("Error", "Please enter both first and last names.");
        return false;
      }
    } else if (currentStep === 2) {
      if (!appNick.trim()) {
        Alert.alert("Error", "Please enter an app nickname.");
        return false;
      }
    } else if (currentStep === 3) {
      if (pin.length < 4) {
        Alert.alert("Error", "Please enter a PIN with at least 4 digits.");
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    if (validateStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        const userData = { firstName, lastName, appNick, pinHint,passwords: [] };
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        await SecureStore.setItemAsync("pin", pin);
        await SecureStore.setItemAsync("decryptionPin", decryptionPin);
        router.replace("/(tabs)");
      }
    }
  };
  
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/register-background.webp")}
      style={styles.background}
    >
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
        <Text style={styles.title}>Create Account</Text>
      </Animated.View>
      <Animated.View
        entering={FadeInUp.duration(800).delay(200).springify()}
        style={styles.form}
      >
        {/* Step 1: First and Last Name */}
        {currentStep === 1 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor={Colors.icon}
              autoCapitalize="words"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor={Colors.icon}
              autoCapitalize="words"
              value={lastName}
              onChangeText={setLastName}
            />
          </>
        )}

        {/* Step 2: App Nick */}
        {currentStep === 2 && (
          <>
          <TextInput
            style={styles.input}
            placeholder="App Nick"
            placeholderTextColor={Colors.icon}
            autoCapitalize="none"
            value={appNick}
            onChangeText={setAppNick}
          />
          <TextInput
              style={styles.input}
              placeholder="Decryption pass hint (e.g., Date of Birth)"
              placeholderTextColor={Colors.icon}
              autoCapitalize="none"
              value={pinHint}
              onChangeText={setPinHint}
            />
            </>
        )}

        {/* Step 3: PIN */}
        {currentStep === 3 && (
          <>
          <TextInput
            style={styles.input}
            placeholder="PIN (for login to app)"
            placeholderTextColor={Colors.icon}
            secureTextEntry
            keyboardType="numeric"
            value={pin}
            onChangeText={setPin}
          />
          <TextInput
            style={styles.input}
            placeholder="PIN (for decryption)"
            placeholderTextColor={Colors.icon}
            secureTextEntry
            value={decryptionPin}
            onChangeText={setDecryptionPin}
          />
          </>
        )}

        <View style={styles.buttonRow}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentStep < 3 ? "Next" : "Register"}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  background: {
    flex: 1,
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.buttonPrimary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },
});
