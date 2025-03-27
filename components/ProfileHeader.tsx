import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
export function ProfileHeader() {
  const rotation = useSharedValue(0);
  const [data, setData] = useState<string | null>(null);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(withSpring(360), -1, true);
    const loadData = async () => {
      const userData = await AsyncStorage.getItem("userData");
      setData(userData);
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyles}>
        <Ionicons name="person-circle" size={80} color={Colors.primary} />
      </Animated.View>

      <Text style={styles.email}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.secondary,
    margin: 16,
    borderRadius: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.text,
  },
  email: {
    fontSize: 16,
    color: Colors.icon,
  },
});
