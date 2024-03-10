import { useState } from "react";
import {
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { type StackNavigation } from "../../App";
import { login } from "../services/auth";
import { styles } from "../styles";

const Login = () => {
  const { navigate } = useNavigation<StackNavigation>();

  const happi_logo = require("../../assets/happi_logo.png");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailMessage, setShowEmailMessage] = useState(false);

  const handleSignup = () => {
    navigate("Register");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      console.log(email, password);
      const user = await login(email, password);
      if (user) {
        // if (!user.emailVerified) {
        //   console.log("Email not verified");
        //   setShowEmailMessage(true);
        //   await emailVerification();
        //   await logout();
        //   setIsLoading(false);
        // }
        console.log("Logged in", user);
        navigate("Main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.centeredContainer}>
      <View style={styles.centeredContainer}>
        <Image source={happi_logo}></Image>
        <Text>Login Page</Text>
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
        <Button onPress={() => handleLogin()} title="Login" />
        <TouchableOpacity onPress={handleSignup}>
          <Text>Don't have an account? Press here to register.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
