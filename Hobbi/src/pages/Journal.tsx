import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { TextInput, Text, View, StyleSheet, Pressable } from "react-native";
// import { styles } from "../styles";
import LoadingScreen from "../components/LoadingScreen";

export default function Journal() {
  const backend_url = "http://127.0.0.1:5000/journal?";
  const get_url = "http://127.0.0.1:5000/entry?";

  const date = new Date();
  date.setDate(date.getDate() + 6);

  const [user_id, setUser_id] = useState("PU3T"); // TODO: Get user id from auth hook

  const [isLoading, setIsLoading] = useState(true);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

  const [journal, setJournal] = useState<JournalEntry | null>(null);
  const [sentimentScore, setSentimentScore] = useState(0);
  const [value, onChangeText] = useState("");

  const getJournalEntry = () => {
    const data = { user_id: user_id, date: date.toDateString() };

    fetch(get_url + new URLSearchParams(data))
      .then((res) => res.json())
      .then((response_data) => {
        console.log(response_data);
        if (response_data.success) {
          setJournal(response_data.data);
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

    fetch(backend_url + new URLSearchParams(data), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response_data) => {
        console.log(response_data);
        setSentimentScore(response_data.score);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setShowSubmissionSuccess(true);
        getJournalEntry();
      });
  };

  useEffect(() => {
    getJournalEntry();
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
      <Text style={styles.titleText}>
        Your Journal score is {sentimentScore}.
      </Text>
      <Text style={styles.regularText}>{journal!.entry}</Text>
      <Text style={styles.titleText}>Recommendations:</Text>

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
    paddingTop: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    marginHorizontal: 10,
    color: "#5878A7",
    textAlign: "center",
  },
  titleCaption: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
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
    fontSize: 25,
    color: "#333333",
    marginBottom: 5,
    textAlign: "center",
  },
  regularText: {
    fontSize: 32,
    color: "#333333",
    marginBottom: 5,
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
