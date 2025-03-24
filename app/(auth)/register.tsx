import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleRegister = () => {
    global.isAuthenticated = true;
    router.replace("/(tabs)");
  };

  const handleLoginPress = () => {
    router.push("/(auth)/login");
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top > 0 ? insets.top : 20,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 20,
        },
      ]}
    >
      <Animated.View
        entering={FadeInDown.duration(800).springify()}
        style={styles.headerContainer}
      >
        <Text style={styles.title}>Create Account</Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(800).delay(200).springify()}
        style={styles.form}
      >
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={Colors.icon}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.icon}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.icon}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={Colors.icon}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
  },
  form: {
    gap: 15,
    width: width - 40,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.buttonPrimary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: Colors.linkText,
    textAlign: "center",
    marginTop: 15,
  },
});
