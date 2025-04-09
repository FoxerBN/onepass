// app/(modal)/showPass.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Colors } from "../../constants/Colors";
import { useLocalSearchParams, router } from "expo-router";
import Toast from "react-native-toast-message";
export default function ShowPass() {
  const { password: passParam } = useLocalSearchParams();
  // Get the password from the query parameter (fallback to default if not provided)
  const password = typeof passParam === "string" ? passParam : "MySuperSecret123";

  const [revealed, setRevealed] = useState(false);

  // Copy the password to the clipboard
  const handleCopyPassword = async () => {
    await Clipboard.setStringAsync(password);
    Toast.show({
        type: "success",
        text1: "Copied",
        text2: "Password copied to clipboard",
        position: "top",
        visibilityTime: 2000,
      });
  };

  // Close the modal and navigate back
  const closeModal = () => {
    router.back();
  };

  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Red close button */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Password Details</Text>
          {/* Display the password (masked by default) */}
          <Text style={styles.passwordText}>
            {revealed ? password : "•".repeat(password.length)}
          </Text>
          <View style={styles.buttonRow}>
            {/* Copy Password Button */}
            <TouchableOpacity style={styles.actionButton} onPress={handleCopyPassword}>
              <Text style={styles.actionButtonText}>Copy Password</Text>
            </TouchableOpacity>
            {/* Eye Button: When held, reveal the real password */}
            <TouchableOpacity
              style={styles.actionButton}
              onPressIn={() => setRevealed(true)}
              onPressOut={() => setRevealed(false)}
            >
              <Text style={styles.actionButtonText}>Hold to Show</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.inputBackground,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    color: Colors.text,
    fontFamily: "SpaceMono",
    marginBottom: 20,
  },
  passwordText: {
    fontSize: 20,
    color: Colors.text,
    fontFamily: "SpaceMono",
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  actionButton: {
    backgroundColor: Colors.buttonPrimary,
    padding: 8,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  actionButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontFamily: "SpaceMono",
    fontWeight: "600",
  },
});
