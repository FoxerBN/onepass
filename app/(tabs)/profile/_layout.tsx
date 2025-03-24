// app/(tabs)/profile/_layout.tsx
import { Stack } from "expo-router";
import { Colors } from "../../../constants/Colors";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.card,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: Colors.background,
        },
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="settings"
        options={{ headerShown: true, title: "Settings" }}
      />
      <Stack.Screen
        name="help"
        options={{ headerShown: true, title: "Help & Support" }}
      />
      <Stack.Screen
        name="deleteAccount"
        options={{ headerShown: true, title: "Delete Account" }}
      />
    </Stack>
  );
}
