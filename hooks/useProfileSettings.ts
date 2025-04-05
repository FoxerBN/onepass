import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";

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
  // 2. Consolidated Messages State
  //    for inline feedback
  // ---------------------------------
  const [messages, setMessages] = useState({
    nickname: "",
    pin: "",
    encPin: "",
    photo: "",
  });

  // ---------------------------------
  // 3. Loaded Data
  // ---------------------------------
  const [userData, setUserData] = useState<UserData>({
    appNick: "",
    photo: null,
  });
  const [storedPin, setStoredPin] = useState<string | null>(null);
  const [storedEncPin, setStoredEncPin] = useState<string | null>(null);

  // ---------------------------------
  // 4. Effect: Load from Storage
  // ---------------------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const data = JSON.parse(storedUserData) as UserData;
          setUserData(data);
          // Initialize inputs
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
  // 5. Helper: Set feedback message
  //    with an auto-clear after 3s
  // ---------------------------------
  function setFeedback(
    section: "nickname" | "pin" | "encPin" | "photo",
    text: string
  ) {
    setMessages((prev) => ({ ...prev, [section]: text }));
    setTimeout(() => {
      setMessages((prev) => ({ ...prev, [section]: "" }));
    }, 3000);
  }

  // ---------------------------------
  // 6. Handlers: Nickname
  // ---------------------------------
  async function handleNicknameConfirm() {
    if (!input.nickname.trim()) {
      setFeedback("nickname", "Nickname cannot be empty.");
      return;
    }
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const data = JSON.parse(storedUserData) as UserData;
        data.appNick = input.nickname;
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
        setFeedback("nickname", "Nickname updated successfully.");
      }
    } catch (error) {
      console.error("Error updating nickname", error);
      setFeedback("nickname", "Failed to update nickname.");
    }
  }

  // ---------------------------------
  // 7. Handlers: App PIN
  // ---------------------------------
  async function handlePinConfirm() {
    if (!storedPin) {
      setFeedback("pin", "Stored PIN not found.");
      return;
    }
    if (input.oldPin !== storedPin) {
      setFeedback("pin", "Old PIN is incorrect.");
      return;
    }
    if (input.newPin.length < 4) {
      setFeedback("pin", "New PIN must be at least 4 digits.");
      return;
    }
    if (input.newPin !== input.confirmPin) {
      setFeedback("pin", "New PIN entries do not match.");
      return;
    }
    try {
      await SecureStore.setItemAsync("pin", input.newPin);
      setStoredPin(input.newPin);
      setFeedback("pin", "PIN updated successfully.");

      // Clear the input fields
      setInput((prev) => ({
        ...prev,
        oldPin: "",
        newPin: "",
        confirmPin: "",
      }));
    } catch (error) {
      console.error("Error updating PIN", error);
      setFeedback("pin", "Failed to update PIN.");
    }
  }

  // ---------------------------------
  // 8. Handlers: Encryption PIN
  // ---------------------------------
  async function handleEncPinConfirm() {
    if (!storedEncPin) {
      setFeedback("encPin", "Stored encryption PIN not found.");
      return;
    }
    if (input.oldEncPin !== storedEncPin) {
      setFeedback("encPin", "Old encryption PIN is incorrect.");
      return;
    }
    if (input.newEncPin.length < 4) {
      setFeedback("encPin", "New encryption PIN must be at least 4 digits.");
      return;
    }
    if (input.newEncPin !== input.confirmEncPin) {
      setFeedback("encPin", "New encryption PIN entries do not match.");
      return;
    }
    finalizeEncPinChange();
  }

  async function finalizeEncPinChange() {

    try {
      await SecureStore.setItemAsync("decryptionPin", input.newEncPin);
      setStoredEncPin(input.newEncPin);
      setFeedback("encPin", "Encryption PIN updated successfully.");
 
      setTimeout(() => {
        console.log("Attempting navigation to edit hint modal");
        router.push("/(modal)/editHintModal");
      }, 100);

      setInput((prev) => ({
        ...prev,
        oldEncPin: "",
        newEncPin: "",
        confirmEncPin: "",
      }));
    } catch (error) {
      console.error("Error in finalizeEncPinChange:", error);
      setFeedback("encPin", "Failed to update encryption PIN.");
    }
  }

  // ---------------------------------
  // 9. Handlers: Profile Photo
  // ---------------------------------
  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setFeedback("photo", "Permission to access media library is required.");
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
        // Update local input
        setInput((prev) => ({ ...prev, photo: newPath }));
      } catch (error) {
        console.error("Error saving photo", error);
        setFeedback("photo", "Failed to save photo.");
      }
    }
  }

  async function handlePhotoConfirm() {
    if (!input.photo) return;
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const data = JSON.parse(storedUserData) as UserData;
        data.photo = input.photo;
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
        setFeedback("photo", "Profile photo updated successfully.");
      }
    } catch (error) {
      console.error("Error updating photo", error);
      setFeedback("photo", "Failed to update profile photo.");
    }
  }

  // ---------------------------------
  // 10. Return All State + Methods
  // ---------------------------------
  return {
    // States
    input,
    setInput,
    messages,
    userData,

    // PIN storage references
    storedPin,
    storedEncPin,

    // Nickname
    handleNicknameConfirm,

    // App PIN
    handlePinConfirm,

    // Enc PIN
    handleEncPinConfirm,
    finalizeEncPinChange, // optional if using a modal confirm

    // Photo
    handlePickImage,
    handlePhotoConfirm,
  };
}
