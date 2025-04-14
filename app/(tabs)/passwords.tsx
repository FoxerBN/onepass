// app/(tabs)/TabTwoScreen.tsx
import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ICON_OPTIONS } from "../../constants/IconsOptions";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const [passwords, setPasswords] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadPasswords();
    }, [])
  );

  async function loadPasswords() {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const data = JSON.parse(storedUserData);
        if (Array.isArray(data.passwords)) {
          setPasswords(data.passwords);
        } else {
          setPasswords([]);
        }
      }
    } catch (error) {
      console.error("Error loading user data", error);
    }
  }

  function handleShowPasswordModal(item: any) {
    router.push(`/(modal)/showPass?password=${encodeURIComponent(item.password)}`);
  }

  // Open the confirm-delete modal
  function handleDelete(index: number) {
    router.push(`/(modal)/confirmDeletePass?index=${index}`);
  }

  function renderPasswordItem({ item, index }: { item: any; index: number }) {
    const iconObj = ICON_OPTIONS.find((icon) => icon.id === item.iconId);

    return (
      <View style={styles.passwordItem}>
        {iconObj ? (
          <Image source={iconObj.source} style={styles.icon} />
        ) : (
          <View style={[styles.icon, { backgroundColor: "#999" }]} />
        )}
        <View style={styles.passwordDetails}>
          <Text style={styles.nickname}>{item.nickname}</Text>
          <Text style={styles.passText}>{"•".repeat(item.password.length)}</Text>
        </View>
        <TouchableOpacity onPress={() => handleShowPasswordModal(item)} style={styles.eyeButton}>
          <Text style={styles.eyeText}>Show</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(index)} style={styles.trashButton}>
          <Text style={styles.trashText}>🗑</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ProtectedRoute>
      <View style={[styles.container, { paddingTop: insets.top > 0 ? insets.top : 20 }]}>
        <Text style={styles.title}>Your Passwords</Text>
        {passwords.length === 0 ? (
          <Text style={styles.noPasswords}>No passwords saved yet.</Text>
        ) : (
          <FlatList
            data={passwords}
            keyExtractor={(_, idx) => idx.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={renderPasswordItem}
          />
        )}

        {/* Floating Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/(modal)/addPassword")}>
          <Text style={styles.addButtonText}>+ Add Password</Text>
        </TouchableOpacity>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "SpaceMono",
  },
  noPasswords: {
    color: Colors.text,
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
    fontFamily: "SpaceMono",
  },
  listContent: {
    paddingBottom: 80,
  },
  passwordItem: {
    flexDirection: "row",
    backgroundColor: "rgba(92, 163, 243, 0.33)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: "contain",
  },
  passwordDetails: {
    flex: 1,
  },
  nickname: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "SpaceMono",
  },
  passText: {
    color: Colors.text,
    fontSize: 14,
    fontFamily: "SpaceMono",
  },
  eyeButton: {
    marginRight: 10,
  },
  eyeText: {
    color: "whitesmoke",
    fontSize: 16,
    fontWeight: "600",
  },
  trashButton: {
    marginLeft: 2,
  },
  trashText: {
    fontSize: 26,
    color: "red",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: Colors.buttonPrimary,
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 6,
  },
  addButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SpaceMono",
  },
});
