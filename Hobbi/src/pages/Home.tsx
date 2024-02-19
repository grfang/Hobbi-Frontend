import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import useHealthData from "../hooks/useHealthData";
import { useState } from "react";
import { formatDateTime } from "../utils/dateUtils";
import { styles } from "../styles";

export default function Home() {
  const [date, setDate] = useState(new Date());
  const { steps, sleep, workouts } = useHealthData(date);
  const [happinessScore, setHappinessScore] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Your Happiness Score for {formatDateTime(date)} is
      </Text>
      <Text style={styles.titleCaption}>{happinessScore}</Text>
      <Text>You walked {steps.toString()} steps</Text>
      <Text>
        You slept from {formatDateTime(sleep.startDate)} to{" "}
        {formatDateTime(sleep.endDate)} for {sleep.hours} hours and{" "}
        {sleep.minutes} minutes.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
