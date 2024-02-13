import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/pages/Home";
import Sleep from "./src/pages/Sleep";
import Exercise from "./src/pages/Exercise";
import Journal from "./src/pages/Journal";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Exercise" component={Exercise} />
        <Tab.Screen name="Sleep" component={Sleep} />
        <Tab.Screen name="Journal" component={Journal} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
