import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "../styles";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Placeholder for Profile.</Text>
      <StatusBar style="auto" />
    </View>
  );
}
