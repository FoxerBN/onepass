// components/ProfileSettings/ChangeEncryptionPinSection.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

interface ChangeEncryptionPinSectionProps {
  oldEncPinInput: string;
  setOldEncPinInput: (val: string) => void;
  newEncPinInput: string;
  setNewEncPinInput: (val: string) => void;
  confirmNewEncPinInput: string;
  setConfirmNewEncPinInput: (val: string) => void;
  encPinMessage: string;
  onConfirmEncPin: () => void;
}

export default function ChangeEncryptionPinSection({
  oldEncPinInput,
  setOldEncPinInput,
  newEncPinInput,
  setNewEncPinInput,
  confirmNewEncPinInput,
  setConfirmNewEncPinInput,
  encPinMessage,
  onConfirmEncPin,
}: ChangeEncryptionPinSectionProps) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Change Encryption PIN</Text>
      <TextInput
        style={styles.input}
        value={oldEncPinInput}
        onChangeText={setOldEncPinInput}
        placeholder="Enter old encryption PIN"
        secureTextEntry
        placeholderTextColor={Colors.icon}
      />
      <TextInput
        style={styles.input}
        value={newEncPinInput}
        onChangeText={setNewEncPinInput}
        placeholder="Enter new encryption PIN"
        secureTextEntry
        placeholderTextColor={Colors.icon}
      />
      <TextInput
        style={styles.input}
        value={confirmNewEncPinInput}
        onChangeText={setConfirmNewEncPinInput}
        placeholder="Re-enter new encryption PIN"
        secureTextEntry
        placeholderTextColor={Colors.icon}
      />
      {encPinMessage ? <Text style={styles.message}>{encPinMessage}</Text> : null}
      <TouchableOpacity style={styles.confirmButton} onPress={onConfirmEncPin}>
        <Text style={styles.buttonText}>Confirm Encryption PIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderColor: "lightblue",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
    fontFamily: "SpaceMono",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
    fontFamily: "SpaceMono",
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: Colors.buttonPrimary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SpaceMono",
  },
  message: {
    color: "red",
    marginBottom: 5,
    fontFamily: "SpaceMono",
  },
});
