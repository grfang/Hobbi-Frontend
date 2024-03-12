import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  type User,
} from "firebase/auth";
import { auth } from "./config";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await emailVerification();
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const emailVerification = async () => {
  const user = auth.currentUser;
  try {
    if (user) {
      await sendEmailVerification(user, {
        handleCodeInApp: true,
        url: "https://happi-f0277.firebaseapp.com",
      });
    }
  } catch (error) {
    console.error("Email verification error", error);
    throw error;
  }
};

export const getPreferencesSet = async (id: string) => {
  try {
    const url = `http://127.0.0.1:5000/preferences?user_id=${encodeURIComponent(
      id
    )}`;

    const response = await fetch(url);
    const jsonResponse = await response.json(); // Parse the JSON response

    if (jsonResponse.success) {
      return jsonResponse.data;
    } else {
      console.error("Failed to fetch if user has preferences:", jsonResponse);
      return false;
    }
  } catch (error) {
    console.error("Error fetching if user has preferences:", error);
    return false;
  }
};
