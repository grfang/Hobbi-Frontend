import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { app } from "./src/services/config";
import { styles } from "./src/styles";

import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Home from "./src/pages/Home";
import Sleep from "./src/pages/Sleep";
import Exercise from "./src/pages/Exercise";
import Journal from "./src/pages/Journal";
import Profile from "./src/pages/Profile";
import React, { useEffect } from "react";

export type ScreenNames = [
  "Main",
  "Login",
  "Register",
  "Home",
  "Journal",
  "Exercise",
  "Sleep",
  "Profile"
]; // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

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

function MainTabs() {
  return (
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
            <SimpleLineIcons name="notebook" color={color} size={size - 6} />
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
            <Ionicons name="moon" color={color} size={size - 4} />
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
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  const auth = getAuth(app);
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState<User | null>(null);

  // Handle user state changes
  const onAuthStateChangedHandler = (user: User | null) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return (
  //   <NavigationContainer theme={HappiTheme}>
  //     <Stack.Navigator initialRouteName="Login">
  //       <Stack.Screen
  //         name="Login"
  //         component={Login}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="Main"
  //         component={MainTabs}
  //         options={{ headerShown: false }}
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}
