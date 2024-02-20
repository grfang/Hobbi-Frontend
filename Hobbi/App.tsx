import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import Home from "./src/pages/Home";
import Sleep from "./src/pages/Sleep";
import Exercise from "./src/pages/Exercise";
import Journal from "./src/pages/Journal";
import Profile from "./src/pages/Profile";

const Tab = createBottomTabNavigator();
const HappiTheme = {
  dark: false,
  colors: {
    primary: "rgb(76,164,87)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(88, 120, 167)",
    border: "rgb(76,164,87))",
    notification: "rgb(255, 69, 58)",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={HappiTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Journal"
          component={Journal}
          options={{
            tabBarLabel: "Journal",
            tabBarIcon: ({ color, size }) => (
              <SimpleLineIcons name="notebook" color={color} size={size-6} />
            ),
          }}
        />
        <Tab.Screen
          name="Exercise"
          component={Exercise}
          options={{
            tabBarLabel: "Exercise",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barbell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Sleep"
          component={Sleep}
          options={{
            tabBarLabel: "Sleep",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="moon" color={color} size={size-4} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
