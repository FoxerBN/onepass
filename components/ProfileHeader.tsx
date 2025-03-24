import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import React from "react";

export function ProfileHeader() {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

  // Trigger animation on component mount
  React.useEffect(() => {
    rotation.value = withRepeat(withSpring(360), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyles}>
        <Ionicons name="person-circle" size={80} color={Colors.primary} />
      </Animated.View>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>
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
