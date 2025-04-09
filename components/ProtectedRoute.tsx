import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Colors } from "../constants/Colors";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      const expiry = await SecureStore.getItemAsync("tokenExpiry");
      console.log(token, expiry);
      
      if (!token || !expiry) {
        await SecureStore.deleteItemAsync("authToken");
        await SecureStore.deleteItemAsync("tokenExpiry");
        router.replace("/(auth)/login");
        return;
      }

      const now = Date.now();
      if (now > parseInt(expiry)) {
        await SecureStore.deleteItemAsync("authToken");
        await SecureStore.deleteItemAsync("tokenExpiry");
        router.replace("/(auth)/login");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.background,
        }}
      >
        <ActivityIndicator size="large" color={Colors.buttonPrimary} />
      </View>
    );
  }

  return <>{children}</>;
}
