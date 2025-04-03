import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Colors } from "@/constants/Colors";
import Animated, { FadeIn, SlideInLeft } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const menuItems = [
    {
      icon: "settings-outline",
      label: "Settings",
      onPress: () => router.push("/(tabs)/profile/settings"),
    },
    {
      icon: "help-circle-outline",
      label: "Help & Support",
      onPress: () => router.push("/(tabs)/profile/help"),
    },
    {
      icon: "trash-outline",
      label: "Delete Account",
      onPress: () => router.push("/(tabs)/profile/deleteAccount"),
      color: Colors.error,
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <Ionicons name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      <Animated.View entering={FadeIn.duration(600)}>
        <ProfileHeader />
      </Animated.View>

      {isDrawerOpen && (
        <Animated.View
          entering={SlideInLeft.duration(200).springify()}
          style={[styles.drawer, { top: 60 + insets.top }]}
        >
          <ScrollView>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color || Colors.text}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    item.color && { color: item.color },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    color: Colors.text,
    fontFamily: "SpaceMono",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.text,
    fontFamily: "SpaceMono",
  },
  email: {
    fontSize: 16,
    color: Colors.icon,
  },
  drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: Colors.text,
    fontFamily: "SpaceMono"
  },
});
