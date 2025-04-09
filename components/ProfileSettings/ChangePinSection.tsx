import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

interface ChangePinSectionProps {
  oldPinInput: string;
  setOldPinInput: (val: string) => void;
  newPinInput: string;
  setNewPinInput: (val: string) => void;
  confirmNewPinInput: string;
  setConfirmNewPinInput: (val: string) => void;
  pinMessage: string;
  onConfirmPin: () => void;
}

export default function ChangePinSection({
  oldPinInput,
  setOldPinInput,
  newPinInput,
  setNewPinInput,
  confirmNewPinInput,
  setConfirmNewPinInput,
  pinMessage,
  onConfirmPin,
}: ChangePinSectionProps) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Change App PIN</Text>
      <TextInput
        style={styles.input}
        value={oldPinInput}
        onChangeText={setOldPinInput}
        placeholder="Enter old PIN"
        secureTextEntry
        placeholderTextColor={Colors.icon}
      />
      <TextInput
        style={styles.input}
        value={newPinInput}
        onChangeText={setNewPinInput}
        placeholder="Enter new PIN"
        secureTextEntry
        placeholderTextColor={Colors.icon}
      />
      <TextInput
        style={styles.input}
        value={confirmNewPinInput}
        onChangeText={setConfirmNewPinInput}
        placeholder="Re-enter new PIN"
        secureTextEntry
        placeholderTextColor={Colors.icon}
      />
      {pinMessage ? <Text style={styles.message}>{pinMessage}</Text> : null}
      <TouchableOpacity style={styles.confirmButton} onPress={onConfirmPin}>
        <Text style={styles.buttonText}>Confirm App PIN</Text>
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
