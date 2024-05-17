import React from "react";
import SignupScreen from "../screens/auth/signupScreen";
import LoginScreen from "../screens/auth/loginScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";

const authStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <authStack.Navigator
      initialRouteName="Login"
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
      <authStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ presentation: "transparentModal" }}
      />
      <authStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ presentation: "transparentModal" }}
      />
    </authStack.Navigator>
  );
};

export default AuthNavigator;
