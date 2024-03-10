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
