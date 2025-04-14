import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Animated,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Colors } from "../../constants/Colors";
import { useLocalSearchParams, router } from "expo-router";
import Toast from "react-native-toast-message";
import { handleCopyPassword, triggerShake } from "../../hooks/useShowPass";
export default function ShowPass() {
  const { password: passParam } = useLocalSearchParams();
  const password = typeof passParam === "string" ? passParam : "?";

  const [revealed, setRevealed] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinCorrect, setPinCorrect] = useState(false);
  const [storedPin, setStoredPin] = useState<string | null>(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getPin = async () => {
      const savedPin = await SecureStore.getItemAsync("decryptionPin");
      setStoredPin(savedPin);
    };
    getPin();
  }, []);

  

  const confirmPin = () => {
    if (pinInput === storedPin) {
      setPinCorrect(true);
    } else {
      triggerShake(shakeAnim);
      Toast.show({
        type: "error",
        text1: "Invalid PIN",
        text2: "The decryption PIN is incorrect.",
        position: "top",
        visibilityTime: 2000,
      });
      setTimeout(() => setPinInput(""), 300);
    }
  };

  const closeModal = () => {
    router.back();
  };

  return (
    <Modal visible transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Password Details</Text>

          {!pinCorrect ? (
            <>
              <Animated.View style={{ transform: [{ translateX: shakeAnim }], width: "100%" }}>
                <TextInput
                  style={styles.pinInput}
                  value={pinInput}
                  onChangeText={setPinInput}
                  placeholder="Enter Decryption PIN"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#aaa"
                />
              </Animated.View>
              <TouchableOpacity style={styles.unlockButton} onPress={confirmPin}>
                <Text style={styles.actionButtonText}>Unlock</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.passwordText}>
                {revealed ? password : "•".repeat(password.length)}
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.actionButton} onPress={()=> handleCopyPassword(password)}>
                  <Text style={styles.actionButtonText}>Copy Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPressIn={() => setRevealed(true)}
                  onPressOut={() => setRevealed(false)}
                >
                  <Text style={styles.actionButtonText}>Hold to Show</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
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
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    marginTop: 10,
    alignItems: "center",
  },
  unlockButton:{
    padding: 10,
    backgroundColor: Colors.buttonPrimary,
    borderRadius: 10,
    alignItems: "center",
  },

  actionButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontFamily: "SpaceMono",
    fontWeight: "600",
  },
  pinInput: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    borderColor: "#888",
    borderWidth: 1,
    color: Colors.text,
    fontFamily: "SpaceMono",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
    backgroundColor: Colors.inputBackground,
  },
});
