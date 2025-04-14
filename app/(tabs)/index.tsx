import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function HomeScreen() {
  const [length, setLength] = useState("12");
  const [generatedPassword, setGeneratedPassword] = useState("");

  function generateRandomPassword(passLength: number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";
    for (let i = 0; i < passLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  const handleGeneratePress = () => {
    const passLength = parseInt(length, 10);
    if (!passLength || passLength < 4) {
      Toast.show({
        type: "error",
        text1: "Invalid Length",
        text2: "Password length must be 4 or more.",
      });
      return;
    }
    const newPassword = generateRandomPassword(passLength);
    setGeneratedPassword(newPassword);
  };

  const handleCopyPress = async () => {
    if (!generatedPassword) return;
    await Clipboard.setStringAsync(generatedPassword);
    Toast.show({
      type: "success",
      text1: "Copied!",
      text2: "Password has been copied to clipboard.",
    });
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Text style={styles.title}>Password Generator</Text>

        {/* Input for password length */}
        <Text style={styles.label}>Password Length</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={length}
          onChangeText={setLength}
          placeholder="Enter length (e.g., 12)"
          placeholderTextColor={Colors.icon}
        />

        {/* Generate button */}
        <TouchableOpacity style={styles.button} onPress={handleGeneratePress}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>

        {/* Display generated password (if any) */}
        {generatedPassword ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{generatedPassword}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyPress}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.hint}>Enter a length and tap "Generate"</Text>
        )}
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontFamily: "SpaceMono",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontFamily: "SpaceMono",
    fontSize: 16,
    color: Colors.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
    marginBottom: 12,
    fontFamily: "SpaceMono",
  },
  button: {
    backgroundColor: Colors.buttonPrimary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.buttonText,
    fontFamily: "SpaceMono",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    backgroundColor: "grey",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  resultText: {
    color: Colors.text,
    fontFamily: "SpaceMono",
    fontSize: 16,
    marginBottom: 10,
  },
  hint: {
    color: Colors.text,
    fontFamily: "SpaceMono",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  copyButton: {
    backgroundColor: Colors.buttonPrimary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyButtonText: {
    color: Colors.buttonText,
    fontFamily: "SpaceMono",
    fontSize: 14,
    fontWeight: "600",
  },
});
