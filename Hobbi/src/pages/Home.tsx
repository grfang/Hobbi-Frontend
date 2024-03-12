import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import useHealthData from "../hooks/useHealthData";
import { useState, useEffect } from "react";
import { formatDateTime } from "../utils/dateUtils";
import useAllData from "../hooks/useAllData";
// import { styles } from "../styles";
import * as Progress from 'react-native-progress'; // make sure to install this by doing "npm install react-native-progress --save"

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(date.toDateString());

  const [user_id, setUser_id] = useState("PU3T"); // TODO: Get user id from auth hook

  const { sleep, workouts } = useHealthData(date);
  const { sleepGoal, exerciseGoal, happinessScore, journalDate} = useAllData();

  const [exerciseScore, setExerciseScore] = useState(0);
  const [sleepScore, setSleepScore] = useState(0);
  const [sentimentScore, setSentimentScore] = useState(-2);

  useEffect(() => {
    getScores();
  }, [user_id, sleepScore, exerciseScore, sentimentScore]);

  const getScores = () => {
    if (workouts) {
      console.log(workouts.data);

      const totalExerciseDuration = workouts.data.reduce(
        (total, workout) => total + ((workout.duration/60)/60), 0
      );

      if (typeof totalExerciseDuration === 'number' && !isNaN(totalExerciseDuration) && exerciseGoal !== 0) {
        setExerciseScore(totalExerciseDuration / exerciseGoal);
      }   else {
        setExerciseScore(0);
      }
    }

    if (typeof sleep.hours === 'number' && !isNaN(sleep.hours) && sleepGoal !== 0) {
      setSleepScore(sleep.hours / sleepGoal);
    } else {
      setSleepScore(0);
    }

    if (journalDate === dateString) {
      setSentimentScore((happinessScore+1) / 2)
    } else{
      setSentimentScore(0)
    }
  };

  const overallScore = () => {
    return (sleepScore + exerciseScore + sentimentScore) / 3
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Overall Score is</Text>
      <Text style={styles.titleCaption}>{overallScore().toFixed(3)}</Text>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />

      <Text style={styles.heading2}>Individual Scores</Text>

      <View>
        <Text style={styles.captionText}>Journal</Text>
        <Progress.Bar progress={sentimentScore} width={400} height={30} color="rgb(255, 250, 160)" borderColor="black" />
      </View>

      <View>
        <Text style={styles.captionText}>Fitness</Text>
        <Progress.Bar progress={exerciseScore} width={400} height={30} color="rgb(193, 225, 193)" borderColor="black" />
      </View>

      <View>
        <Text style={styles.captionText}>Sleep</Text>
        <Progress.Bar progress={sleepScore} width={400} height={30} color="rgb(167, 199, 231)" borderColor="black" />
      </View>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />
    
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
