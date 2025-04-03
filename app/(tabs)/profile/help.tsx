import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import { Colors } from '../../../constants/Colors';


export default function TabTwoScreen() {
  return (
    <View  style={styles.container}>
      <Text style={styles.text}>help</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.text,
    fontFamily: "SpaceMono",
  },
});
