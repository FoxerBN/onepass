// app/_layout.tsx
import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import "react-native-reanimated";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

declare global {
  var isAuthenticated: boolean;
}

// A simple global for demo only; real apps would use Context/Redux or secure storage
global.isAuthenticated = false;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Hide navigation bar on Android
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
      // Set the color of navigation bar if it becomes visible
      NavigationBar.setBackgroundColorAsync(Colors.background);
    }
  }, []);

  // Hide splash when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Auth check
  useEffect(() => {
    if (!fontsLoaded) return;

    // Are we in the auth group?
    const inAuthGroup = segments[0] === "(auth)";

    if (!inAuthGroup && !global.isAuthenticated) {
      router.replace("/(auth)/login");
    } else if (inAuthGroup && global.isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [segments, fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
          contentStyle: {
            backgroundColor: Colors.background,
          },
          fullScreenGestureEnabled: true,
        }}
      >
        {/* We let expo-router handle the (auth) and (tabs) groups automatically */}
      </Stack>
      <StatusBar style="light" hidden={true} />
    </ThemeProvider>
  );
}
