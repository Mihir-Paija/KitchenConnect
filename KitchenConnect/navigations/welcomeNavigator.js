import React, { useContext } from "react";
import LoginScreen from "@screens/shared/auth/loginScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import HomeCustomerScreen from "../screens/customer/homeCustomerScreen";
import { UserTypeContext } from "../context/userTypeContext";
import CustomerAuthNavigator from "./customer/customerAuthNavigator";
import ProviderAuthNavigator from "./provider/providerAuthNavigator";
import WelcomeScreen from "../screens/shared/welcomeScreen";
import Choose from "../screens/shared/choosingScreen";

const welcomeStack = createStackNavigator();

const WelcomeNavigator = () => {
  //global states
  const [userType] = useContext(UserTypeContext);

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
      <welcomeStack.Screen
        name="Choose"
        component={Choose}
        options={{ presentation: "transparentModal" }}
      />
      <welcomeStack.Screen
        name="CustomerAuthNavigator"
        component={CustomerAuthNavigator}
      />
      <welcomeStack.Screen
        name="ProviderAuthNavigator"
        component={ProviderAuthNavigator}
      />
    </welcomeStack.Navigator>
  );
};

export default WelcomeNavigator;
