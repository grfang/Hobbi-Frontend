import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
// import { styles } from "../styles";
import { useState, useEffect } from "react";

export default function Profile() {
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingExercisePreference, setEditingExercisePreference] = useState(false);
  const [editingSleepPreference, setEditingSleepPreference] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [exercisePreference, setExercisePreference] = useState('Daily');
  const [sleepPreference, setSleepPreference] = useState('8 hours');

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleEditEmail = () => {
    setEditingEmail(true);
  };

  const handleEditExercisePreference = () => {
    setEditingExercisePreference(true);
  };

  const handleEditSleepPreference = () => {
    setEditingSleepPreference(true);
  };

  const handleSaveName = () => {
    setEditingName(false);
    // Save name changes
  };

  const handleSaveEmail = () => {
    setEditingEmail(false);
    // Save email changes
  };

  const handleSaveExercisePreference = () => {
    setEditingExercisePreference(false);
    // Save exercise preference changes
  };

  const handleSaveSleepPreference = () => {
    setEditingSleepPreference(false);
    // Save sleep preference changes
  };

  return (
    <View>
      <Text style={styles.titleText}>User Profile</Text>
      
      {/* Name section */}
      {editingName ? (
        <View>
          <TextInput
            placeholder="Enter new name"
            onChangeText={setName}
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Button title="Save" onPress={handleSaveName} />
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Name: {name}</Text>
          <Button title="Edit Name" onPress={handleEditName} />
        </View>
      )}

      {/* Email section */}
      {editingEmail ? (
        <View>
          <TextInput
            placeholder="Enter new email"
            onChangeText={setEmail}
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Button title="Save" onPress={handleSaveEmail} />
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Email: {email}</Text>
          <Button title="Edit Email" onPress={handleEditEmail} />
        </View>
      )}

      {/* Exercise Preference section */}
      {editingExercisePreference ? (
        <View>
          <TextInput
            placeholder="Enter new exercise preference"
            onChangeText={setExercisePreference}
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Button title="Save" onPress={handleSaveExercisePreference} />
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Exercise Preference: {exercisePreference}</Text>
          <Button title="Edit Exercise Preference" onPress={handleEditExercisePreference} />
        </View>
      )}

      {/* Sleep Preference section */}
      {editingSleepPreference ? (
        <View>
          <TextInput
            placeholder="Enter new sleep preference"
            onChangeText={setSleepPreference}
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Button title="Save" onPress={handleSaveSleepPreference} />
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Sleep Preference: {sleepPreference}</Text>
          <Button title="Edit Sleep Preference" onPress={handleEditSleepPreference} />
        </View>
      )}
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
    marginTop: 30,
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
    borderColor: "gray",
    borderWidth: 1,
    textAlign: 'center',
    height: 35,
    width: '80%',
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 5,
    marginTop: 20,
    backgroundColor: '#fcfcfc'
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