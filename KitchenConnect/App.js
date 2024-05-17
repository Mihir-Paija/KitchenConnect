import { useFonts } from "expo-font";
import WelcomeScreen from "./screens/welcomeScreen";
import SignupScreen from "./screens/auth/signupScreen";
import LoginScreen from "./screens/auth/loginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./navigations/authNavigator";

export default function App() {
  const authStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
