import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useHealthData from './src/hooks/useHealthData';
import { useState } from 'react';

export default function App() {
  const [date, setDate] = useState(new Date());
  const {steps} = useHealthData(date);

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
