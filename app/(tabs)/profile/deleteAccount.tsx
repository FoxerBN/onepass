import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

export default function DeleteAccount() {
  const router = useRouter();

 
  return (
    <View style={styles.container}>
      <AntDesign name="deleteuser" size={50} color="whitesmoke" />
      <TouchableOpacity
        style={styles.button}
        onPressOut={() => {
          router.push({
            pathname: "/(modal)/confirmModal",
          });
        }}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.buttonText,
    fontFamily: "SpaceMono",
  },
  button: {
    backgroundColor: Colors.buttonPrimary,
    padding: 10,
    borderRadius: 5,
  },
});
