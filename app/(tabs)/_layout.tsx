// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const [paddingBottom, setPaddingBottom] = useState(10);

  useEffect(() => {
    // Add some padding to ensure the tab bar doesn't overlap with the edge of the screen
    setPaddingBottom(Math.max(10, insets.bottom));
  }, [insets.bottom]);

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              backgroundColor: Colors.card,
              borderTopColor: Colors.border,
              height: 60 + paddingBottom,
              paddingBottom: paddingBottom,
            },
            default: {
              backgroundColor: Colors.card,
              borderTopColor: Colors.border,
              height: 60 + paddingBottom,
              paddingBottom: paddingBottom,
            },
          }),
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.icon,
          tabBarLabelStyle: {
            fontWeight: "500",
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Animated.View
                style={{ transform: [{ scale: focused ? 1.1 : 1 }] }}
              >
                <Ionicons name="home" size={24} color={color} />
              </Animated.View>
            ),
          }}
        />
        <Tabs.Screen
          name="passwords"
          options={{
            title: "Passwords",
            tabBarIcon: ({ color, focused }) => (
              <Animated.View
                style={{ transform: [{ scale: focused ? 1.1 : 1 }] }}
              >
                <MaterialIcons name="password" size={24} color={color} />
              </Animated.View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Animated.View
                style={{ transform: [{ scale: focused ? 1.1 : 1 }] }}
              >
                <MaterialIcons name="account-circle" size={24} color={color} />
              </Animated.View>
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
