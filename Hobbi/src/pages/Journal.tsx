import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useMemo } from "react";
import { TextInput, Text, View, StyleSheet, Pressable } from "react-native";
// import { styles } from "../styles";
import LoadingScreen from "../components/LoadingScreen";
import useHealthData from "../hooks/useHealthData";
import useSleepData from "../hooks/useSleepData";
import useExerciseData from "../hooks/useExerciseData";

export default function Journal() {
  const backend_url = "http://127.0.0.1:5000/journal?";
  const get_url = "http://127.0.0.1:5000/entry?";

  const date = new Date();

  const [user_id, setUser_id] = useState("PU3T"); // TODO: Get user id from auth hook

  const [isLoading, setIsLoading] = useState(true);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

  const [journal, setJournal] = useState<JournalEntry | null>(null);
  const [sentimentScore, setSentimentScore] = useState(-2);
  const [value, onChangeText] = useState("");

  const [recommendation, setRecommendation] = useState("")

  const {workouts} = useHealthData(date);
  const { sleep } = useHealthData(date);

  const [exerciseGoal, setExerciseGoal] = useState(0);
  const [exerciseScore, setExerciseScore] = useState(0);
  const [sleepGoal, setSleepGoal] = useState(0);
  const [sleepScore, setSleepScore] = useState(0);

  const getRecommendation = () => {
    const data_url = "http://127.0.0.1:5000/data?";
    const data = {user_id: user_id};

    fetch(data_url + new URLSearchParams(data))
      .then((res) => res.json())
      .then((response_data) => {
        if (response_data.success) {
          setExerciseGoal(response_data.data.exercise_info.exercise_goal);
          setSleepGoal(response_data.data.sleep_info.sleep_goal);
        } else {
          setExerciseGoal(-1);
          setSleepGoal(-1);
        }
      })
    .catch((err) => console.log(err));

    if (workouts) {
      const totalExerciseDuration = workouts.data.reduce(
        (total, workout) => total + ((workout.duration/60)/60), 0
      );

      if (typeof totalExerciseDuration === 'number' && !isNaN(totalExerciseDuration) && exerciseGoal !== 0) {
        setExerciseScore((totalExerciseDuration / exerciseGoal) * 100);
      }   else {
        setExerciseScore(0);
      }
    }

    if (typeof sleep.hours === 'number' && !isNaN(sleep.hours) && sleepGoal !== 0) {
      setSleepScore((sleep.hours / sleepGoal) * 100);
    } else {
      setSleepScore(0);
    }

    let rec = ""
    if (sentimentScore == -2){
      rec = "No score to base recommendation off of.";
    } else if (sentimentScore < -0.5) {
      //if sleep goal not met, recommend nap
      //otherwise recommend meditation or something emotionally healing
      rec = "-1 to -0.5";
    } else if (sentimentScore < 0) {
      //if sleep goal not met, recommend nap
      //if exercise goal not met, recommend they do some small exercise since it boosts seratonin if they're feeling up to it, otherwise do something fun
      //otherwise recommend that they get out and do something fun!
      rec = "-0.5 to 0";
    } else if (sentimentScore < 0.5) {
      //if sleep goal not met, recommend nap
      //if exercise goal not met, recommend they go and get their workouts in
      //otherwise recommend they get out and do something fun!
      rec = "0 to 0.5";
    } else {
      //if sleep goal not met, gentle reminder that they should probably get some sleep, but otherwise have fun
      //if exercise goal not met, recommend they go and get their workouts in
      //otherwise recommend they get out and try something new
      rec = "0.5 to 1";
    }
    return rec;
  };

  const getJournalEntry = () => {
    const data = { user_id: user_id, date: date.toDateString() };

    fetch(get_url + new URLSearchParams(data))
      .then((res) => res.json())
      .then((response_data) => {
        console.log(response_data);
        if (response_data.success) {
          setJournal(response_data.data);
          setSentimentScore(response_data.data.score);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const submitJournalEntry = () => {
    const data = {
      user_id: user_id,
      entry: value,
      date: date.toDateString(),
    };

    fetch(backend_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response_data) => {
        console.log(response_data);
        setSentimentScore(response_data.data.score);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setShowSubmissionSuccess(true);
        getJournalEntry();
      });
  };

  useEffect(() => {
    getJournalEntry();
    setRecommendation(getRecommendation())
  }, [user_id]);

  const renderJournalInput = () => (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Journal for today.</Text>
      <Text style={styles.captionText}>
        Complete your daily entry below and receive a score determining your
        estimated happiness.
      </Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={10}
        maxLength={200}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <Pressable onPress={submitJournalEntry} style={styles.button}>
        <Text style={styles.buttonText}>Submit Journal Entry</Text>
      </Pressable>

      <StatusBar style="auto" backgroundColor="" />
    </View>
  );

  const renderJournalDisplay = () => (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Journal score is:</Text>
      <Text style={styles.titleCaption}>{journal!.score.toFixed(3)}</Text>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />

      <Text style={styles.heading2}>Your Entry:</Text>
      <Text style={styles.regularText}>{journal!.entry}</Text>

      <View style={{borderBottomWidth: 25, borderBottomColor: '#f2f2f2', width: '100%', marginBottom: 20, marginTop: 20}} />

      <Text style={styles.heading2}>Recommendation:</Text>
      <Text style={styles.regularText}>{recommendation}</Text>

      <StatusBar style="auto" backgroundColor="" />
    </View>
  );


  const renderSubmissionSuccess = () => (
    <View style={styles.centeredContainer}>
      <Text style={styles.titleText}>Journal Entry Submitted!</Text>
      <Text style={styles.captionText}>
        Your journal entry has been submitted for scoring.
      </Text>
      <Pressable onPress={() => setShowSubmissionSuccess(false)} style={styles.button}>
        <Text style={styles.buttonText}>See Results</Text>
      </Pressable>
      <StatusBar style="auto" backgroundColor="" />
    </View>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showSubmissionSuccess) {
    return renderSubmissionSuccess();
  }

  return journal ? renderJournalDisplay() : renderJournalInput();
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
    fontSize: 30,
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
    backgroundColor: '#fcfcfc'
  },
  captionText: {
    fontSize: 25,
    color: "#333333",
    marginBottom: 5,
    textAlign: "center",
    width: "90%",
  },
  regularText: {
    fontSize: 17.5,
    color: "#333333",
    marginTop: 10,
    textAlign: "center",
    width: "80%",
  },
  button: {
    backgroundColor: "#4CA457",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
