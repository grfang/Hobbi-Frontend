import React, { useState } from 'react';
import { View, Text, StatusBar, TextInput } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { styles } from "../styles"; // Import your styles

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

export default function Exercise() {
  const [selectedItem, setSelectedItem] = useState([]);
  const [results] = useState(["results will go here", "more results", "even more results"]); // get results from backend

  const handleSelectedItemsChange = (selectedItem) => {
    setSelectedItem(selectedItem);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Discover Exercises</Text>

      <Text style={styles.captionText}>
        Select an exercise category below to receive recommendations for exercises targeting that area of the body.
      </Text>

      <View style={{ marginTop: 20, flex: 1 , alignItems: 'center'}}>
        <View style={{ width: '300%'}}>
          <SingleSelect
            items={items}
            selectedItem={selectedItem}
            onSelectedItemsChange={handleSelectedItemsChange}
          />
        </View>
        
        <View style={{ alignItems: 'center' }}>
          <Text style={ [styles.captionText, { marginTop: 20 }] }>Recommendations</Text>
          <TextInput
            style={[styles.textInput, {marginTop: 0}, { width: '500%' }, {textAlign: 'center'}]}
            editable={false}
            multiline={true}
            numberOfLines={200}
            value={results.join('\n')}
          />
        </View>
      </View>
    </View>
  );
}

function SingleSelect({ items, selectedItem, onSelectedItemsChange }) {
  return (
    <MultiSelect
      items={items}
      uniqueKey="id"
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
