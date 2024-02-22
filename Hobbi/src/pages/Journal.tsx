import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Button, TextInput, Text, View } from "react-native";
import { formatDateTime } from "../utils/dateUtils";
import { styles } from "../styles";

export default function Journal() {
  const backend_url = "http://127.0.0.1:5000/journal?";
  const get_url = "http://127.0.0.1:5000/entry?";
  const [journal, setJournal] = useState<JournalEntry | null>(null);
  const [user_id, setUser_id] = useState("PU3T");
  const [value, onChangeText] = useState("");
  const [sentimentScore, setSentimentScore] = useState(0);

  const getJournalEntry = () => {
    const data = { user_id: user_id, date: new Date().toDateString() };

    fetch(get_url + new URLSearchParams(data))
      .then((res) => res.json())
      .then((response_data) => {
        if (response_data.success) {
          setJournal(response_data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const submitJournalEntry = () => {
    console.log("submitting journal entry");
    const data = {
      user_id: user_id,
      entry: value,
      date: new Date().toDateString(),
    };

    fetch(backend_url + new URLSearchParams(data), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response_data) => {
        setSentimentScore(response_data.sentiment_score);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getJournalEntry();
  }, []);

  if (journal === null) {
    return (
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
        <Button onPress={submitJournalEntry} title="Submit Journal Entry" />

        <StatusBar style="auto" backgroundColor="" />
      </View>
    );
  } else {
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Your Journal on {formatDateTime(new Date(journal.date))}.
      </Text>
      <Text style={styles.regularText}>{journal.entry}</Text>

      <StatusBar style="auto" backgroundColor="" />
    </View>;
  }
}
