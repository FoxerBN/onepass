import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import { useCallback } from "react";

export const useImagePicker = (onImagePicked: (uri: string) => void) => {
  const handlePickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission needed",
          text2: "Permission to access media library is required!",
          position: "top",
          visibilityTime: 3000,
        });
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        const newPath = FileSystem.documentDirectory + "profilePhoto.jpg";
        try {
          await FileSystem.copyAsync({
            from: result.assets[0].uri,
            to: newPath,
          });
          onImagePicked(newPath);
        } catch (error) {
          console.error("Error saving photo", error);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to save photo.",
            position: "top",
            visibilityTime: 3000,
          });
        }
      }
    }, [onImagePicked]);
  
    return { handlePickImage };
  };