import React, { useContext } from "react";
import LoginScreen from "@/screens/loginScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import CustomerAuthNavigator from "./customerAuthNavigator";
import WelcomeScreen from "../screens/welcomeScreen";
import AuthRedirect from "../screens/authRedirectScreen";

const welcomeStack = createStackNavigator();

const WelcomeNavigator = () => {
  //global states

  return (
    <welcomeStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}
    >
      <welcomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <welcomeStack.Screen name="Check" component={AuthRedirect} />
      <welcomeStack.Screen
        name="CustomerAuthNavigator"
        component={CustomerAuthNavigator}
      />
    </welcomeStack.Navigator>
  );
};

export default WelcomeNavigator;
