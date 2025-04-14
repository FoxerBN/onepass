import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { Animated } from "react-native";
export const handleCopyPassword = async (password: string) => {
  await Clipboard.setStringAsync(password);
  Toast.show({
    type: "success",
    text1: "Copied",
    text2: "Password copied to clipboard",
    position: "top",
    visibilityTime: 2000,
  });
};

export const triggerShake = (shakeAnim: Animated.Value) => {
  Animated.sequence([
    Animated.timing(shakeAnim, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 6,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: -6,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]).start();
};
