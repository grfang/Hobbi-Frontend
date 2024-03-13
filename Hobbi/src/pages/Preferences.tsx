import { useState } from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigation } from "../../App";
import { login } from "../services/auth";
import { styles } from "../styles";
import { getAuth } from "firebase/auth";
import { savePreferenceData } from "../services/firebaseDatabase";
import MultiSelect from 'react-native-multiple-select';

const levels = [{
  id: '1',
  name: 'Beginner'
}, {
  id: '2',
  name: 'Intermediate'
}, {
  id: '3',
  name: 'Expert'
}];

const equipment = [{
  id: '1',
  name: 'Body Only'
}, {
  id: '2',
  name: 'Dumbbell'
}, {
  id: '3',
  name: 'Barbell'
}, {
  id: '4',
  name: 'Cable'
}, {
  id: '5',
  name: 'Other'
}];

interface MultiSelectProps {
  items: { id: string; name: string }[];
  selectedItems: string[];
  onSelectedItemsChange: (selectedItems: string[]) => void;
}

const Preferences = () => {
  const { navigate } = useNavigation<StackNavigation>();

  const user = getAuth().currentUser;
  const id = user ? user.uid : "";

  const [exerciseGoal, setExerciseGoal] = useState(0);
  const [skill, setSkill] = useState("Beginner");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [sleep_goal, setSleepGoal] = useState(0);
  const [wakeup_time, setWakeupTime] = useState(0);
  const [showNextPage, setShowNextPage] = useState(false);

  const handleSkillChange = (selectedItems: string[]) => {
    setSkill(selectedItems[0]);
  };

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
      <Text style={styles.titleText}>Exercise Preferences</Text>
      
      <Text style={styles.heading2}>Skill Level</Text>
      <View style={{'width': "80%"}}>
        <MultiSelect
          items={levels}
          uniqueKey="name"
          onSelectedItemsChange={handleSkillChange}
          single={true} // single select
          selectText="Select Skill Level"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
      </View>

      <Text style={styles.heading2}>Equipment</Text>
      <View>
        <MultiSelect
          items={equipment}
          uniqueKey="name"
          onSelectedItemsChange={setEquipment}
          single={false} // multi select
          selectText="Select Equipment"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
      </View>
      
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
