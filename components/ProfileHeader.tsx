import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ProfileHeader() {
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    appNick: string;
    photo?: string;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        setUserData(JSON.parse(userDataString));
      }
    };
    loadData();
  }, []);

  const { firstName, lastName, appNick } = userData || {};

  return (
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        {userData?.photo ? (
          <Image source={{ uri: userData.photo }} style={styles.profilePic} />
        ) : (
          <Ionicons name="person-circle" size={80} color={Colors.primary} />
        )}
      </View>
      {userData && (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.appNick}>@{appNick}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 600,
    alignItems: "center",
    backgroundColor: Colors.secondary,
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background || "#f0f0f0",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontFamily: "SpaceMono",
    color: Colors.text,
  },
  appNick: {
    fontSize: 16,
    color: Colors.icon,
    fontFamily: "SpaceMono",
  },
});
