import { Stack } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

export default function AuthLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
        animation: "slide_from_right",
        animationDuration: 200,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        presentation: "card",
        fullScreenGestureEnabled: true,
      }}
    />
  );
}
