import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, TextInput, Text, View } from "react-native";
import { formatDateTime } from "../utils/dateUtils";
import { styles } from "../styles";

export default function Journal() {
  const backend_url = "http://127.0.0.1:5000/journal?"; // change this eventually
  const get_url = "http://127.0.0.1:5000/entry?";

  const getJournalEntry = () => {
    console.log("getting journal entry");
    const data = { user_id: user_id, date: journal.date.toDateString() };

    fetch(get_url + new URLSearchParams(data), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response_data) => {
        if (response_data.success) return response_data.data;
      })
      .catch((err) => console.log(err));
  };

  const [user_id, setUser_id] = useState("PU3T");

  const defaultJournal = { date: new Date(), entry: getJournalEntry() };
  const [journal, setJournal] = useState(defaultJournal); //TODO: Implement making calls to backend for journal data
  const [value, onChangeText] = useState("");
  const [sentimentScore, setSentimentScore] = useState(0);

  const submitJournalEntry = () => {
    console.log("submitting journal entry");
    const data = {
      user_id: user_id,
      entry: value,
      date: new Date().toDateString(),
    };

    // Make the fetch call with method POST
    fetch(backend_url + new URLSearchParams(data), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response_data) => {
        setSentimentScore(response_data.sentiment_score);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Your Journal on {formatDateTime(journal.date)}.
      </Text>
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
      <Button onPress={getJournalEntry} title="Submit Journal Entry" />

      <StatusBar style="auto" backgroundColor="" />
    </View>
  );
}
