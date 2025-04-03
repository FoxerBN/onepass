// components/ProfileSettings/ChangeNicknameSection.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

interface ChangeNicknameSectionProps {
  nicknameInput: string;
  setNicknameInput: (val: string) => void;
  nicknameMessage: string;
  onConfirmNickname: () => void;
}

export default function ChangeNicknameSection({
  nicknameInput,
  setNicknameInput,
  nicknameMessage,
  onConfirmNickname,
}: ChangeNicknameSectionProps) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Change Nickname</Text>
      <TextInput
        style={styles.input}
        value={nicknameInput}
        onChangeText={setNicknameInput}
        placeholder="Enter new nickname"
        placeholderTextColor={Colors.icon}
      />
      {nicknameMessage ? <Text style={styles.message}>{nicknameMessage}</Text> : null}
      <TouchableOpacity style={styles.confirmButton} onPress={onConfirmNickname}>
        <Text style={styles.buttonText}>Confirm Nickname</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderColor: "lightgreen",
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
