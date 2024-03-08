import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Button, StyleSheet, Pressable } from "react-native";
// import { styles } from "../styles";
import { useState, useEffect } from "react";
import useAllData from "../hooks/useAllData";

export default function Profile() {
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingExerciseGoal, setEditingExerciseGoal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(false);
  const [editingSleepGoal, setEditingSleepGoal] = useState(false);
  const [editingWakeupTime, setEditingWakeupTime] = useState(false);

  const {name, email, exerciseGoal, skill, equipment, sleepGoal, wakeupTime} = useAllData()

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleEditEmail = () => {
    setEditingEmail(true);
  };

  const handleEditExerciseGoal = () => {
    setEditingExerciseGoal(true);
  };

  const handleEditSkill = () => {
    setEditingSkill(true);
  };

  const handleEditEquipment = () => {
    setEditingEquipment(true);
  };

  const handleEditSleepGoal = () => {
    setEditingSleepGoal(true);
  };

  const handleEditWakeupTime = () => {
    setEditingWakeupTime(true);
  };

  const handleSaveName = () => {
    setEditingName(false);
    // Save name changes
  };

  const handleSaveEmail = () => {
    setEditingEmail(false);
    // Save email changes
  };

  const handleSaveExerciseGoal = () => {
    setEditingExerciseGoal(false);
    // Save exercise preference changes
  };

  const handleSaveSkill = () => {
    setEditingSkill(false);
    // Save exercise preference changes
  };

  const handleSaveEquipment = () => {
    setEditingEquipment(false);
    // Save exercise preference changes
  };

  const handleSaveSleepGoal = () => {
    setEditingSleepGoal(false);
    // Save sleep preference changes
  };

  const handleSaveWakeupTime = () => {
    setEditingWakeupTime(false);
    // Save sleep preference changes
  };

  const handleLogout = () => {
    // Log the user out
  };

  return (
    <View>
      <Text style={styles.titleText}>Profile</Text>

      <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 10, marginBottom: 10}}/>
      
      {/* Personal section */}
      <Text style={styles.heading2}>Personal Info</Text>

      {editingName ? (
        <View>
          <TextInput
            placeholder="Enter new name"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Pressable onPress={handleSaveName} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Name: {name}</Text>
          <Pressable onPress={handleEditName} style={styles.button}>
            <Text style={styles.buttonText}>Edit Name</Text>
          </Pressable>
        </View>
      )}

      {editingEmail ? (
        <View>
          <TextInput
            placeholder="Enter new email"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Pressable onPress={handleSaveEmail} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Email: {email}</Text>
          <Pressable onPress={handleEditEmail} style={styles.button}>
            <Text style={styles.buttonText}>Edit Email</Text>
          </Pressable>
        </View>
      )}

      <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 10, marginBottom: 10}}/>



      {/* Exercise Preference section */}
      <Text style={styles.heading2}>Exercise Preferences</Text>

      {editingExerciseGoal ? (
        <View>
          <TextInput
            placeholder="Enter new exercise goal"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Pressable onPress={handleSaveExerciseGoal} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Exercise Goal: {exerciseGoal}</Text>
          <Pressable onPress={handleEditExerciseGoal} style={styles.button}>
            <Text style={styles.buttonText}>Edit Exercise Goal</Text>
          </Pressable>
        </View>
      )}

      {editingSkill ? (
        <View>
          <TextInput
            placeholder="Enter new skill level"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Pressable onPress={handleSaveSkill} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Skill Level: {skill}</Text>
          <Pressable onPress={handleEditSkill} style={styles.button}>
            <Text style={styles.buttonText}>Edit Skill Level</Text>
          </Pressable>
        </View>
      )}

      {editingEquipment ? (
        <View>
          <TextInput
            placeholder="Enter new equipment"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Pressable onPress={handleSaveEquipment} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Equipment: {equipment}</Text>
          <Pressable onPress={handleEditEquipment} style={styles.button}>
            <Text style={styles.buttonText}>Edit Equipment</Text>
          </Pressable>
        </View>
      )}

      <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 10, marginBottom: 10}}/> 



      {/* Sleep Preference section */}
      <Text style={styles.heading2}>Sleep Preferences</Text>

      {editingSleepGoal ? (
        <View>
          <TextInput
            placeholder="Enter new sleep goal"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Pressable onPress={handleSaveSleepGoal} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Sleep Goal: {sleepGoal}</Text>
          <Pressable onPress={handleEditSleepGoal} style={styles.button}>
            <Text style={styles.buttonText}>Edit Sleep Goal</Text>
          </Pressable>
        </View>
      )}

      {editingWakeupTime ? (
        <View>
          <TextInput
            placeholder="Enter new wake-up time"
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Pressable onPress={handleSaveWakeupTime} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.titleCaption}>Wake-Up Time: {wakeupTime}</Text>
          <Pressable onPress={handleEditWakeupTime} style={styles.button}>
            <Text style={styles.buttonText}>Edit Wake-Up Time</Text>
          </Pressable>
        </View>
      )}

      <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 10, marginBottom: 10}}/>

      <Pressable onPress={handleLogout} style={{backgroundColor: "#FFFFFF", padding: 10, borderRadius: 5}}>
        <Text style={{fontSize: 15, color: "red", textAlign: "center",}}>Logout</Text>
      </Pressable>
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
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    color: "#5878A7",
    textAlign: "center",
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5878A7",
    textAlign: "center",
  },
  titleCaption: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    textAlign: 'center',
    height: 30,
    width: '80%',
    alignSelf: 'center',
    fontSize: 15,
    marginTop: 5,
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
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    color: "blue",
    textAlign: "center",
  },
});