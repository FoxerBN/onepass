// app/(modal)/addPassword.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { ICON_OPTIONS } from "../../constants/IconsOptions";

export default function AddPasswordScreen() {
  const router = useRouter();

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  // 3) Selecting icon
  function handleSelectIcon(iconId: string) {
    setSelectedIcon(iconId);
  }

  // 4) Save new password entry
  async function handleSavePassword() {
    if (!nickname.trim() || !password.trim()) {
      Alert.alert("Error", "Nickname/login and Password cannot be empty.");
      return;
    }
    if (!selectedIcon) {
      Alert.alert("Error", "Please select an icon.");
      return;
    }
    try {
      // Load user data from AsyncStorage
      const storedUserData = await AsyncStorage.getItem("userData");
      if (!storedUserData) {
        Alert.alert("Error", "No user data found.");
        return;
      }
      const userData = JSON.parse(storedUserData);

      // Make sure userData.passwords exists
      if (!Array.isArray(userData.passwords)) {
        userData.passwords = [];
      }

      // Build new password entry
      const newPasswordEntry = {
        iconId: selectedIcon, // store just the ID
        nickname: nickname,
        password: password,
      };
      userData.passwords.push(newPasswordEntry);

      // Save back
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      // Go back to the main password screen
      router.back();
    } catch (error) {
      console.error("Error saving password", error);
      Alert.alert("Error", "Failed to save password.");
    }
  }

  // Renders each icon in a FlatList
  function renderIconItem({ item }: { item: (typeof ICON_OPTIONS)[0] }) {
    const isSelected = item.id === selectedIcon;
    return (
      <TouchableOpacity
        style={[styles.iconContainer, isSelected && styles.iconSelected]}
        onPress={() => handleSelectIcon(item.id)}
      >
        <Image source={item.source} style={styles.iconImage} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Password</Text>

      {/* Icon Picker */}
      <Text style={styles.label}>Select an Icon</Text>
      <FlatList
        data={ICON_OPTIONS}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderIconItem}
        contentContainerStyle={styles.iconList}
      />

      {/* Nickname/login input */}
      <Text style={styles.label}>Nickname / Login</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Google email"
          placeholderTextColor={Colors.icon}
          value={nickname}
          onChangeText={setNickname}
        />

        {/* Password input */}
        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="••••••••••••"
          placeholderTextColor={Colors.icon}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
        <Text style={styles.saveButtonText}>Save Password</Text>
      </TouchableOpacity>

      {/* Cancel button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
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
    fontSize: 22,
    color: Colors.text,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "SpaceMono",
  },
  label: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 6,
    fontFamily: "SpaceMono",
    fontWeight: "600",
  },
  iconList: {
    maxHeight: 30,
    paddingBottom: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  iconSelected: {
    borderColor: Colors.primary,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    fontFamily: "SpaceMono",
    backgroundColor: Colors.inputBackground,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: Colors.buttonPrimary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 5,
  },
  saveButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SpaceMono",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SpaceMono",
  },
});
