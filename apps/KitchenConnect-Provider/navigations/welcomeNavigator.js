import React from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import ProviderAuthNavigator from "./provider/providerAuthNavigator";
import WelcomeScreen from "../screens/shared/welcomeScreen";
import AuthRedirect from "../screens/shared/authRedirectScreen";


const welcomeStack = createStackNavigator();

const WelcomeNavigator = () => {


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
      <welcomeStack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
      />

      <welcomeStack.Screen 
        name = "Check" 
        component={AuthRedirect} 
      />

      <welcomeStack.Screen
        name="ProviderAuthNavigator"
        component={ProviderAuthNavigator}
      />
      
    </welcomeStack.Navigator>
  );
};

export default WelcomeNavigator;
