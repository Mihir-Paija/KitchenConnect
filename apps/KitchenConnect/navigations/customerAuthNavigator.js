import React, { useContext } from "react";
import SignupScreen from "@/screens/signupScreen";
import LoginScreen from "@/screens/loginScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { AuthContext } from "@/context/authContext";
import CustomerMenuNavigator from "./customerMenuNavigator";

const authStack = createStackNavigator();

const CustomerAuthNavigator = () => {
  //global states
  const [authState] = useContext(AuthContext);

  return (
    <authStack.Navigator
      initialRouteName={
        authState.authReady && authState.authData
          ? "MenuCustomerNavigator"
          : "Login"
      }
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
      {!authState.authToken ? (
        <>
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
        </>
      ) : (
        <>
          <authStack.Screen
            name="MenuCustomerNavigator"
            component={CustomerMenuNavigator}
            options={{ presentation: "transparentModal" }}
          />
        </>
      )}
    </authStack.Navigator>
  );
};

export default CustomerAuthNavigator;
