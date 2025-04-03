import * as SecureStore from "expo-secure-store";
export async function generateTokenWithExpiry() {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expiry = Date.now() + 5 * 60 * 1000;
  
    await SecureStore.setItemAsync("authToken", token);
    await SecureStore.setItemAsync("tokenExpiry", expiry.toString());
  }