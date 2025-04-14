import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Colors } from "../../../constants/Colors";

/**
 * Updated "Help & Support" screen including:
 * - Quick app highlights (icons per password, short token expiry, etc.)
 * - Contact info (email & Facebook).
 */

export default function HelpSupportScreen() {
  const handleEmailPress = () => {
    Linking.openURL("mailto:foxerdxd@gmail.com");
  };

  const handleFacebookPress = () => {
    Linking.openURL("https://facebook.com/YourAwesomeFB");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      <Text style={styles.paragraph}>
        Welcome! If you’re stuck or have questions, feel free to reach out via
        email or Facebook. We’re here to make sure your experience remains smooth
        and secure.
      </Text>

      {/* Highlights about the app */}
      <View style={styles.infoContainer}>
        <Text style={styles.highlightTitle}>Did you know?</Text>
        <Text style={styles.highlightBullet}>• You can add unique icons to each password, making them easier to spot.</Text>
        <Text style={styles.highlightBullet}>• Your session token only lasts 5 minutes, for tighter security.</Text>
        <Text style={styles.highlightBullet}>• You can delete your entire profile at any time and start fresh.</Text>
        <Text style={styles.highlightBullet}>• Need to change your password or encryption PIN? Head to "Settings" anytime.</Text>
        <Text style={styles.highlightBullet}>• For showing your passwords, tap the "show" next to each password.</Text>
        <Text style={styles.highlightBullet}>• For revealed password, type the PIN to decrypt.</Text>
      </View>

      {/* Contact options */}
      <TouchableOpacity onPress={handleEmailPress} style={styles.linkButton}>
        <Text style={styles.linkText}>Email: foxerdxd@gmail.com</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleFacebookPress} style={styles.linkButton}>
        <Text style={styles.linkText}>Find us on Facebook</Text>
      </TouchableOpacity>

      <Text style={styles.paragraph}>
        If something isn’t working as expected, don’t panic—send us a message or
        email, and we’ll help you out!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontFamily: "SpaceMono",
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "SpaceMono",
    fontSize: 16,
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 22,
  },
  infoContainer: {
    marginBottom: 20,
    backgroundColor: Colors.card,
    borderRadius: 10,
    padding: 10,
  },
  highlightTitle: {
    fontFamily: "SpaceMono",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  highlightBullet: {
    fontFamily: "SpaceMono",
    fontSize: 15,
    color: Colors.text,
    marginVertical: 2,
  },
  linkButton: {
    backgroundColor: Colors.buttonPrimary,
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  linkText: {
    fontFamily: "SpaceMono",
    fontSize: 16,
    color: Colors.buttonText,
    textAlign: "center",
  },
});
