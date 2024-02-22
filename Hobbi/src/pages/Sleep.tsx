import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View } from "react-native";
import { formatDateTime } from "../utils/dateUtils";
import CircularProgress from "react-native-circular-progress-indicator";
import useHealthData from "../hooks/useHealthData";

import { styles } from "../styles";

export default function Sleep() {
  const [date, setDate] = useState(new Date());
  const [sleepScore, setSleepScore] = useState(0);
  const { sleep } = useHealthData(date);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Sleep Score is</Text>
      <Text style={styles.titleCaption}>{sleepScore}</Text>
      {/* <CircularProgress value={58} /> */}
      <CircularProgress
        value={60}
        progressValueStyle={{ fontSize: 20, fontWeight: "bold" }}
        radius={120}
        maxValue={200}
        valueSuffix={"%"}
        title={"Sleep Goal Met"}
        titleStyle={{ fontWeight: "bold", fontSize: 20 }}
      />

      <Text>
        You slept for {sleep.hours} hours and {sleep.minutes} minutes from{" "}
        {formatDateTime(sleep.startDate)} to {formatDateTime(sleep.endDate)}.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
