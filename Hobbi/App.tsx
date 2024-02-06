import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useHealthData from './src/hooks/useHealthData';
import { useState } from 'react';
import { formatDateTime } from './src/utils/dateUtils';

export default function App() {
  const [date, setDate] = useState(new Date());
  const {steps, sleep, workouts} = useHealthData(date);

  return (
    <View style={styles.container}>
      <Text>You walked {steps.toString()} steps</Text>
      <Text>You slept from {formatDateTime(sleep.startDate)} to {formatDateTime(sleep.endDate)} for {sleep.hours} hours and {sleep.minutes} minutes.</Text>
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
