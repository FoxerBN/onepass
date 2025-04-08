// app/(modal)/confirmDeletePass.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constants/Colors";

export default function ConfirmDeletePass() {
  const { index } = useLocalSearchParams(); 
  // "index" is passed in like: 
  // router.push("/(modal)/confirmDeletePass?index=0") 
  const router = useRouter();

  async function handleDelete() {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (!storedUserData) {
        Alert.alert("Error", "No user data found.");
        return;
      }
      const userData = JSON.parse(storedUserData);

      if (!Array.isArray(userData.passwords)) {
        Alert.alert("Error", "No passwords found to delete.");
        return;
      }

      // Remove the password at "index"
      const idx = Number(index);
      if (isNaN(idx) || idx < 0 || idx >= userData.passwords.length) {
        Alert.alert("Error", "Invalid password index.");
        return;
      }

      userData.passwords.splice(idx, 1);

      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      // Go back to the main screen
      router.back();
    } catch (error) {
      console.error("Error deleting password", error);
      Alert.alert("Error", "Failed to delete password.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Delete</Text>
      <Text style={styles.message}>Are you sure you want to delete this password?</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Yes, Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ----------------------
// Styles
// ----------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    color: Colors.text,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "SpaceMono",
  },
  message: {
    color: Colors.text,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "SpaceMono",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 12,
    width: "40%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 15,
    borderRadius: 12,
    width: "40%",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
