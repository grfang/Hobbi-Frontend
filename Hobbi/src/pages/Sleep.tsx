import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { formatDateTime } from "../utils/dateUtils";
import CircularProgress from "react-native-circular-progress-indicator";
import useHealthData from "../hooks/useHealthData";
import useSleepData from "../hooks/useSleepData";

// import { styles } from "../styles";

const convertTimeToString = (time: number) => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const period = hours < 12 ? 'AM' : 'PM';
  const formattedHours12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${formattedHours12}:${formattedMinutes} ${period}`;
};

const preprocessData = (wakeupTime: number, recTimes: number[]) => {
  const formattedWakeupTime = convertTimeToString(wakeupTime);
  const formattedRecTimes = recTimes.map(convertTimeToString);
  return { formattedWakeupTime, formattedRecTimes };
};

export default function Sleep() {
  const {sleepGoal, wakeupTime, recTimes} = useSleepData();
  const [date, setDate] = useState(new Date());
  const { sleep } = useHealthData(date);
  const [sleepScore, setSleepScore] = useState(0);
  useEffect(() => {
    // Check if sleep.hours is a valid number before performing the division
    if (typeof sleep.hours === 'number' && !isNaN(sleep.hours) && sleepGoal !== 0) {
      setSleepScore((sleep.hours / sleepGoal) * 100);
    } else {
      // Set sleepScore to a default value (e.g., 0) or handle the case when sleep.hours is not valid
      setSleepScore(0);
    }
  }, [sleep.hours, sleepGoal]);
  const { formattedWakeupTime, formattedRecTimes } = preprocessData(wakeupTime, recTimes);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Sleep Score is</Text>
      <Text style={styles.titleCaption}>{sleepScore}</Text>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />

      <CircularProgress
        value={sleepScore}
        progressValueStyle={{ fontSize: 20, fontWeight: "bold" }}
        radius={100}
        maxValue={100}
        valueSuffix={"%"}
        title={"Of Goal Met"}
        titleStyle={{ fontWeight: "bold", fontSize: 20 }}
      />

      <Text style={styles.captionText}>
        You slept for {sleep.hours} hours and {sleep.minutes} minutes from{" "}
        {formatDateTime(sleep.startDate)} to {formatDateTime(sleep.endDate)}.
      </Text>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />

      <Text style={styles.heading2}>Recommended Sleep Times</Text>
      <Text style={styles.captionText}>
        According to our calculations, these are the best times for you to go to sleep if you want to wake up alert and refreshed at {formattedWakeupTime}.
      </Text>

      <View>
        {/* Iterate through the list and render each item */}
        {formattedRecTimes.map((item, index) => (
          <View key={index}>
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    color: "#5878A7",
    textAlign: "center",
  },
  titleCaption: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  heading2: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 390,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginVertical: 20,
    padding: 10,
  },
  captionText: {
    fontSize: 17.5,
    color: "#333333",
    marginTop: 10,
    textAlign: "center",
    width: "80%",
  },
  listText: {
    fontSize: 17.5,
    color: "#333333",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  regularText: {
    fontSize: 32,
    color: "#333333",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 32,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
