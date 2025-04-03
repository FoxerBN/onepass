import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Colors } from "../../../constants/Colors";
// optional: import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileSettingsScreen() {
  const router = useRouter();
  // const insets = useSafeAreaInsets(); // if you want safe area usage

  const [appNick, setAppNick] = useState("");
  const [pin, setPin] = useState("");
  const [encPin, setEncPin] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  // For showing user data loaded from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        const storedPin = await SecureStore.getItemAsync("pin");
        const storedEncPin = await SecureStore.getItemAsync("decryptionPin");

        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setAppNick(parsedData.appNick || "");
          setPhoto(parsedData.photo || null);
        }

        if (storedPin) setPin(storedPin);
        if (storedEncPin) setEncPin(storedEncPin);
      } catch (error) {
        console.log("Error loading data: ", error);
      }
    };
    loadData();
  }, []);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "We need camera roll permission!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      try {
        const newPath = FileSystem.documentDirectory + "profilePhoto.jpg";
        await FileSystem.copyAsync({
          from: result.assets[0].uri,
          to: newPath,
        });
        setPhoto(newPath);
      } catch (error) {
        console.error("Error saving photo", error);
        Alert.alert("Error", "Failed to save photo.");
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      // 1. Update userData in AsyncStorage
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        const updatedData = {
          ...parsedData,
          appNick,
          photo,
        };
        await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
      }

      // 2. Update PIN in SecureStore
      if (pin) {
        await SecureStore.setItemAsync("pin", pin);
      }

      // 3. Update encryption PIN in SecureStore
      if (encPin) {
        await SecureStore.setItemAsync("decryptionPin", encPin);
      }

      Alert.alert("Success", "Your settings have been updated!");
      // Optionally navigate somewhere or close screen
      // router.back();
    } catch (error) {
      console.log("Error saving changes: ", error);
      Alert.alert("Error", "Failed to update settings.");
    }
  };

  const handleEditHint = () => {
    // Navigate to your modal route to edit the hint
    router.push("/(modal)/editHintModal");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>

      {/* Nickname */}
      <Text style={styles.label}>App Nick:</Text>
      <TextInput
        style={styles.input}
        value={appNick}
        onChangeText={setAppNick}
        placeholder="Enter your nickname"
        placeholderTextColor={Colors.icon}
      />

      {/* Change Profile Photo */}
      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        <Text style={styles.imagePickerText}>
          {photo ? "Change Profile Photo" : "Pick Profile Photo"}
        </Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={styles.previewImage} />}

      {/* Change PIN */}
      <Text style={styles.label}>App PIN:</Text>
      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        placeholder="Enter new PIN"
        secureTextEntry
        placeholderTextColor={Colors.icon}
      />

      {/* Change Encryption PIN */}
      <Text style={styles.label}>Encryption PIN:</Text>
      <TextInput
        style={styles.input}
        value={encPin}
        onChangeText={setEncPin}
        placeholder="Enter new encryption PIN"
        secureTextEntry
        placeholderTextColor={Colors.icon}
      />

      {/* Button to show a modal for changing the hint */}
      <TouchableOpacity style={styles.button} onPress={handleEditHint}>
        <Text style={styles.buttonText}>Edit Encryption Hint</Text>
      </TouchableOpacity>

      {/* Save changes */}
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    // paddingTop: insets.top || 20, // if using safe area
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "SpaceMono",
  },
  label: {
    color: Colors.text,
    marginTop: 10,
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
  imagePicker: {
    backgroundColor: Colors.buttonPrimary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  imagePickerText: {
    color: Colors.buttonText,
    fontFamily: "SpaceMono",
    fontSize: 16,
    fontWeight: "600",
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginTop: 10,
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
