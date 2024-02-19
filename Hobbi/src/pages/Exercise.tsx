import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { styles } from "../styles";

export default function Exercise() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Discover Exercises</Text>
      <StatusBar style="auto" />
    </View>
  );
}
