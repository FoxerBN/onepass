import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import Toast from "react-native-toast-message"; // 🧨 toast import

// Types for user data
type UserData = {
  appNick: string;
  photo: string | null;
  // you could add pinHint, etc. as well
};

export function useProfileSettings() {
  // ---------------------------------
  // 1. Consolidated Input State
  // ---------------------------------
  const [input, setInput] = useState({
    nickname: "",
    oldPin: "",
    newPin: "",
    confirmPin: "",
    oldEncPin: "",
    newEncPin: "",
    confirmEncPin: "",
    photo: null as string | null,
  });

  // ---------------------------------
  // 2. Loaded Data
  // ---------------------------------
  const [userData, setUserData] = useState<UserData>({
    appNick: "",
    photo: null,
  });
  const [storedPin, setStoredPin] = useState<string | null>(null);
  const [storedEncPin, setStoredEncPin] = useState<string | null>(null);

  // ---------------------------------
  // Toast Helper
  // ---------------------------------
  function showToast(
    type: "success" | "error",
    title: string,
    message?: string
  ) {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 3000,
    });
  }

  // ---------------------------------
  // Load from Storage
  // ---------------------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const data = JSON.parse(storedUserData) as UserData;
          setUserData(data);
          setInput((prev) => ({
            ...prev,
            nickname: data.appNick,
            photo: data.photo,
          }));
        }
        const pin = await SecureStore.getItemAsync("pin");
        if (pin) setStoredPin(pin);

        const encPin = await SecureStore.getItemAsync("decryptionPin");
        if (encPin) setStoredEncPin(encPin);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };
    loadData();
  }, []);

  // ---------------------------------
  // Nickname Handler
  // ---------------------------------
  async function handleNicknameConfirm() {
    if (!input.nickname.trim()) {
      showToast("error", "Nickname cannot be empty.");
      return;
    }
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const data = JSON.parse(storedUserData) as UserData;
        data.appNick = input.nickname;
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
        showToast("success", "Nickname updated!");
      }
    } catch (error) {
      console.error("Error updating nickname", error);
      showToast("error", "Failed to update nickname.");
    }
  }

  // ---------------------------------
  // App PIN Handler
  // ---------------------------------
  async function handlePinConfirm() {
    if (!storedPin) {
      showToast("error", "Stored PIN not found.");
      return;
    }
    if (input.oldPin !== storedPin) {
      showToast("error", "Old PIN is incorrect.");
      return;
    }
    if (input.newPin.length < 4) {
      showToast("error", "New PIN must be at least 4 digits.");
      return;
    }
    if (input.newPin !== input.confirmPin) {
      showToast("error", "New PIN entries do not match.");
      return;
    }
    try {
      await SecureStore.setItemAsync("pin", input.newPin);
      setStoredPin(input.newPin);
      showToast("success", "PIN updated!");
      setInput((prev) => ({
        ...prev,
        oldPin: "",
        newPin: "",
        confirmPin: "",
      }));
    } catch (error) {
      console.error("Error updating PIN", error);
      showToast("error", "Failed to update PIN.");
    }
  }

  // ---------------------------------
  // Encryption PIN Handler
  // ---------------------------------
  async function handleEncPinConfirm() {
    if (!storedEncPin) {
      showToast("error", "Stored encryption PIN not found.");
      return;
    }
    if (input.oldEncPin !== storedEncPin) {
      showToast("error", "Old encryption PIN is incorrect.");
      return;
    }
    if (input.newEncPin.length < 4) {
      showToast("error", "New encryption PIN must be at least 4 digits.");
      return;
    }
    if (input.newEncPin !== input.confirmEncPin) {
      showToast("error", "New encryption PIN entries do not match.");
      return;
    }
    finalizeEncPinChange();
  }

  async function finalizeEncPinChange() {
    try {
      await SecureStore.setItemAsync("decryptionPin", input.newEncPin);
      setStoredEncPin(input.newEncPin);
      showToast("success", "Encryption PIN updated");

      setTimeout(() => {
        router.push("/(modal)/editHintModal");
      }, 300);

      setInput((prev) => ({
        ...prev,
        oldEncPin: "",
        newEncPin: "",
        confirmEncPin: "",
      }));
    } catch (error) {
      console.error("Error updating encryption PIN", error);
      showToast("error", "Failed to update encryption PIN.");
    }
  }

  // ---------------------------------
  // Pick Profile Photo
  // ---------------------------------
  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showToast("error", "Permission to access media library is required.");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
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
  
        // Update local state right away so the UI shows the new photo
        setInput((prev) => ({ ...prev, photo: newPath }));
  
        // Optional: also update userData if you want immediate sync
        setUserData((prev) => ({ ...prev, photo: newPath }));
  
      } catch (error) {
        console.error("Error saving photo", error);
        showToast("error", "Failed to save photo.");
      }
    }
  }
  

  // ---------------------------------
  // Save Profile Photo
  // ---------------------------------
  async function handlePhotoConfirm() {
    if (!input.photo) return;
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const data = JSON.parse(storedUserData) as UserData;
        data.photo = input.photo;
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
        showToast("success", "Profile photo updated");
      }
    } catch (error) {
      console.error("Error updating photo", error);
      showToast("error", "Failed to update profile photo.");
    }
  }

  // ---------------------------------
  // Return All State + Methods
  // ---------------------------------
  return {
    input,
    setInput,
    userData,
    storedPin,
    storedEncPin,
    handleNicknameConfirm,
    handlePinConfirm,
    handleEncPinConfirm,
    finalizeEncPinChange,
    handlePickImage,
    handlePhotoConfirm,
  };
}
