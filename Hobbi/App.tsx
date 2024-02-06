import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useHealthData from './src/hooks/useHealthData';

export default function App() {
  const {steps} = useHealthData();

  return (
    <View style={styles.container}>
      <Text>You walked {steps.toString()} steps</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
