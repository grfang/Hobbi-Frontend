import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
// import { styles } from "../styles";
import { useState, useEffect } from "react";

export default function Profile() {
  // return (
  //   <View style={styles.container}>
  //     <Text>Placeholder for Profile.</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
  const [name, setName] = useState<string>("John Doe"); // Initial name
  const [email, setEmail] = useState<string>("john@example.com"); // Initial email
  const [exercisePreference, setExercisePreference] = useState<string>("Daily"); // Initial exercise preference
  const [sleepPreference, setSleepPreference] = useState<string>("8 hours"); // Initial sleep preference

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleExercisePreferenceChange = (text: string) => {
    setExercisePreference(text);
  };

  const handleSleepPreferenceChange = (text: string) => {
    setSleepPreference(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>User Profile</Text>
      <Text style={styles.titleCaption}>Name: {name}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter new name"
        onChangeText={handleNameChange}
        value={name}
      />
      <Text style={styles.titleCaption}>Email: {email}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter new email"
        onChangeText={handleEmailChange}
        value={email}
      />
      <Text style={styles.titleCaption}>Exercise Preference: {exercisePreference}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter new exercise preference"
        onChangeText={handleExercisePreferenceChange}
        value={exercisePreference}
      />
      <Text style={styles.titleCaption}>Sleep Preference: {sleepPreference}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter new sleep preference"
        onChangeText={handleSleepPreferenceChange}
        value={sleepPreference}
      />
      <Button title="Save Changes" onPress={() => alert("Changes saved!")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
    textAlign: "center",
  },
  textInput: {
    height: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginVertical: 10,
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