import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

interface ChangeProfilePhotoSectionProps {
  photo: string | null;
  setPhoto: (val: string | null) => void;
  photoMessage: string;
  onConfirmPhoto: () => void;
  onPickImage: () => void; // direct call to hook method
}

export default function ChangeProfilePhotoSection({
  photo,
  setPhoto,
  photoMessage,
  onConfirmPhoto,
  onPickImage,
}: ChangeProfilePhotoSectionProps) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Change Profile Photo</Text>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.previewImage} />
      ) : (
        <Text style={{ color: Colors.text }}>No photo selected</Text>
      )}

      <TouchableOpacity style={styles.confirmButton} onPress={onPickImage}>
        <Text style={styles.buttonText}>Pick Photo</Text>
      </TouchableOpacity>

      {photo && (
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirmPhoto}>
          <Text style={styles.buttonText}>Confirm Photo</Text>
        </TouchableOpacity>
      )}

      {photoMessage ? <Text style={styles.message}>{photoMessage}</Text> : null}
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
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginBottom: 10,
  },
});
