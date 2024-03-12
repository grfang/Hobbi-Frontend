import { useState } from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigation } from "../../App";
import { login } from "../services/auth";
import { styles } from "../styles";
import { getAuth } from "firebase/auth";
import { savePreferenceData } from "../services/firebaseDatabase";

const Preferences = () => {
  const { navigate } = useNavigation<StackNavigation>();

  const user = getAuth().currentUser;
  const id = user ? user.uid : "";

  const [exerciseGoal, setExerciseGoal] = useState(0);
  const [skill, setSkill] = useState("Beginner");
  const [equipment, setEquipment] = useState([]);
  const [sleep_goal, setSleepGoal] = useState(0);
  const [wakeup_time, setWakeupTime] = useState(0);
  const [showNextPage, setShowNextPage] = useState(false);

  const handleSetPreferences = async () => {
    try {
      await savePreferenceData(
        id,
        exerciseGoal,
        skill,
        equipment,
        sleep_goal,
        wakeup_time
      );
      navigate("Main");
    } catch (error) {
      console.log(error);
    }
  };

  const renderGymGoals = () => (
    <View style={styles.centeredContainer}>
      <Text style={styles.titleText}>Gym Goals</Text>
      <Text>
        replace this text component with whatever components you need for
        setting gym goals
      </Text>
      <Button onPress={() => setShowNextPage(true)} title="Next" />
    </View>
  );

  const renderSleepGoals = () => (
    <View style={styles.centeredContainer}>
      <Text style={styles.titleText}>Sleep Goals</Text>
      <Text>
        replace this text component with whatever components you need for
        setting sleep goals
      </Text>
      <Button onPress={() => handleSetPreferences()} title="Finish" />
    </View>
  );

  return showNextPage ? renderSleepGoals() : renderGymGoals();
};

export default Preferences;
