import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigation } from "../../App";
import { signup } from "../services/auth";
import { styles } from "../styles";
import { type FirebaseError } from "firebase/app";
import { saveUserData } from "../services/firebaseDatabase";

const Register = () => {
  const { navigate } = useNavigation<StackNavigation>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const happi_logo = require("../../assets/happi_logo.png");

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const user = await signup(email, password);
      if (user) {
        const id = user.uid;
        await saveUserData(id, firstName, lastName, email);
        navigate("Preferences");
      }
    } catch (error) {
      setIsLoading(false);
      if ((error as FirebaseError).code === "auth/email-already-in-use") {
        alert("Email already in use. Please use a different email.");
      } else if ((error as FirebaseError).code === "auth/weak-password") {
        alert("Password is too weak. Please use a stronger password.");
      } else {
        console.log("Signup error", error);
        alert("Signup error");
      }
      console.log(error);
    }
  };

  const handleLogin = () => {
    navigate("Login");
  };

  return (
    <View style={styles.centeredContainer}>
      <Image source={happi_logo}></Image>
      <Text>Register Page</Text>
      <TextInput
        placeholder="First Name"
        autoCapitalize="words"
        value={firstName}
        onChangeText={setFirstName}
      ></TextInput>
      <TextInput
        placeholder="Last Name"
        autoCapitalize="words"
        value={lastName}
        onChangeText={setLastName}
      ></TextInput>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <Button onPress={() => handleSignUp()} title="Sign Up" />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Already have an account? Press here to login.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
