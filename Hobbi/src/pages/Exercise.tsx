import React, { useState } from 'react';
import { View, Text, StatusBar, TextInput, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
// import { styles } from "../styles"; // Import your styles

const items = [{
  id: '1',
  name: 'Abdominals'
}, {
  id: '2',
  name: 'Biceps'
}, {
  id: '3',
  name: 'Chest'
}, {
  id: '4',
  name: 'Quadriceps'
}, {
  id: '5',
  name: 'Shoulders'
}];

interface SingleSelectProps {
  items: { id: string; name: string }[];
  selectedItem: string[];
  onSelectedItemsChange: (selectedItems: string[]) => void;
}

export default function Exercise() {
  const [user_id, setUser_id] = useState("PU3T"); // TODO: Get user id from auth hook
  const backend_url = "http://127.0.0.1:5000/fitness?";

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [recommendedExercises, setRecommendedExercises] = useState([]);

  const data = {user_id: user_id, body_part: selectedItem[0]};

  const fetchData = () => {
    fetch(backend_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response_data) => {
        setRecommendedExercises(response_data.exercises);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectedItemsChange = (selectedItem: string[]) => {
    setSelectedItem(selectedItem);
    console.log(selectedItem)
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Discover Exercises</Text>

      <Text style={styles.captionText}>
        Select an exercise category below to receive recommendations for exercises targeting that area of the body.
      </Text>

      <View>
        <SingleSelect
          items={items}
          selectedItem={selectedItem}
          onSelectedItemsChange={handleSelectedItemsChange}
        />
        <Text style={ [styles.heading2, { marginTop: 20 }] }>Recommended Exercises:</Text>
        {recommendedExercises.map((exercise: Exercise) => (
          <View key={exercise.field1}>
            <Text>{exercise.Title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function SingleSelect({ items, selectedItem, onSelectedItemsChange }: SingleSelectProps) {
  return (
    <MultiSelect
      items={items}
      uniqueKey="name"
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItem}
      single={true}
      selectText="Select Exercise Category"
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
  );
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
  },
  captionText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333333",
    textAlign: "center",
    width: "80%",
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
