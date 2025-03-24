// app/(tabs)/profile/settings.tsx
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings screen with bottom tab bar visible</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: {
    color: Colors.text,
  },
});
