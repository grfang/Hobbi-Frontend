import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, TextInput, Text, View } from "react-native";
import { formatDateTime } from "../utils/dateUtils";
import { styles } from "../styles";

export default function Journal() {
  const defaultJournal = { date: new Date(), entry: "Today was a good day." };
  const [journal, setJournal] = useState(defaultJournal); //TODO: Implement making calls to backend for journal data
  const [value, onChangeText] = useState("");
  const submitJournalEntry = () => {};

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
      <Button onPress={submitJournalEntry} title="Submit Journal Entry" />

      <StatusBar style="auto" backgroundColor="" />
    </View>
  );
}
