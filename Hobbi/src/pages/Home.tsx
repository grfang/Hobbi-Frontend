import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import useHealthData from "../hooks/useHealthData";
import { useState } from "react";
import { formatDateTime } from "../utils/dateUtils";
// import { styles } from "../styles";
import * as Progress from 'react-native-progress'; // make sure to install this by doing "npm install react-native-progress --save"

export default function Home() {
  const [date, setDate] = useState(new Date());
  const { steps, sleep, workouts } = useHealthData(date);
  const [happinessScore, setHappinessScore] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Overall Score is</Text>
      <Text style={styles.titleCaption}>{happinessScore}</Text>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />

      <Text style={styles.heading2}>Individual Scores</Text>

      <View>
        <Text style={styles.captionText}>Journal</Text>
        <Progress.Bar progress={0.3} width={400} height={30} color="rgb(255, 250, 160)" borderColor="black" />
      </View>

      <View>
        <Text style={styles.captionText}>Fitness</Text>
        <Progress.Bar progress={0.8} width={400} height={30} color="rgb(193, 225, 193)" borderColor="black" />
      </View>

      <View>
        <Text style={styles.captionText}>Sleep</Text>
        <Progress.Bar progress={0.5} width={400} height={30} color="rgb(167, 199, 231)" borderColor="black" />
      </View>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />

      <Text style={styles.heading2}>Rolling Week Summary</Text>
      
      <Text style={styles.captionText}>
        Over the last {7} days, you walked {20000} steps and averaged {6} hours of sleep per night.
        Your average journal score was {80}% and your average daily score was {90}%.
      </Text>
    
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
    marginTop: 20,
    textAlign: "center",
    width: "90%",
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
