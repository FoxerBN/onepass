import { StyleSheet, Platform, View, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import Animated, { SlideInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProtectedRoute } from "@/components/ProtectedRoute";
export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ProtectedRoute>
    <View
      style={[
        styles.container,
        { paddingTop: insets.top > 0 ? insets.top : 20 },
      ]}
    >
      <Animated.View
        entering={SlideInRight.duration(600).springify()}
        style={styles.card}
      >
        <Text style={styles.text}>druha stranka</Text>
      </Animated.View>
    </View>
    </ProtectedRoute>
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
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
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
  },
  text: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "SpaceMono",
  },
});
