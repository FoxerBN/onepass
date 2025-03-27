import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useLogin } from "../../hooks/useLogin";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { showPinInput, loading, loginWithPin } = useLogin();
  const [pin, setPin] = useState("");

  const handleLoginPress = () => {
    loginWithPin(pin);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top || 20, paddingBottom: insets.bottom || 20 }]}>
      <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.headerContainer}>
        <Text style={styles.title}>Welcome Back</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(800).delay(200).springify()} style={styles.form}>
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
            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
              <Text style={styles.buttonText}>Login with PIN</Text>
            </TouchableOpacity>
          </>
        )}
        {/* Additional options like register can be added here */}
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
});
