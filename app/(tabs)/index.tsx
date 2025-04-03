import { StyleSheet, Platform, View, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container,{ paddingTop: insets.top > 0 ? insets.top : 20 },]}>
      <Text style={styles.text}>ahoj</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
    borderColor: Colors.border,
    borderWidth: 1,
  },
  text: {
    fontFamily: "SpaceMono",
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
});
