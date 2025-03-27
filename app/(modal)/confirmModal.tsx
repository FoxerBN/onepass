import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useRemoveData } from "../../hooks/useRemoveData";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SlideToDeleteModal() {
  const router = useRouter();
  const { removeData } = useRemoveData();

  const translateX = useRef(new Animated.Value(0)).current;

  const sliderWidth = SCREEN_WIDTH * 0.6;
  const knobWidth = 60;
  const maxTranslateX = sliderWidth - knobWidth;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newX = gestureState.dx;
        if (newX < 0) newX = 0;
        if (newX > maxTranslateX) newX = maxTranslateX;
        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= maxTranslateX * 0.8) {
          Animated.timing(translateX, {
            toValue: maxTranslateX,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            removeData();
            router.dismiss();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Slide to delete your account</Text>
        <View style={[styles.sliderContainer, { width: sliderWidth }]}>
          <Animated.View
            style={[styles.knob, { transform: [{ translateX }] }]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.knobText}>Slide</Text>
          </Animated.View>
        </View>
        <Text style={styles.instruction}>Slide all the way to confirm</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.dismiss()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  sliderContainer: {
    height: 60,
    backgroundColor: "#ddd",
    borderRadius: 30,
    justifyContent: "center",
    overflow: "hidden",
  },
  knob: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  knobText: {
    color: "#fff",
    fontWeight: "bold",
  },
  instruction: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
  },
});
