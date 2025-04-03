import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constants/Colors";

export default function EditHintModal() {
  const router = useRouter();
  const [pinHint, setPinHint] = useState("");

  useEffect(() => {
    const loadHint = async () => {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData.pinHint) setPinHint(parsedData.pinHint);
      }
    };
    loadHint();
  }, []);

  const handleSaveHint = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        parsedData.pinHint = pinHint;
        await AsyncStorage.setItem("userData", JSON.stringify(parsedData));
      }
      Alert.alert("Success", "Hint updated!");
      router.back(); // close the modal
    } catch (error) {
      console.error("Error updating hint", error);
      Alert.alert("Error", "Failed to update hint.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Encryption Hint</Text>
      <TextInput
        style={styles.input}
        value={pinHint}
        onChangeText={setPinHint}
        placeholder="Enter new hint"
        placeholderTextColor={Colors.icon}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveHint}>
        <Text style={styles.buttonText}>Save Hint</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
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
    marginBottom: 20,
  },
  button: {
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
});
