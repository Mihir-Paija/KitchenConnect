import React, { useContext } from "react";
import SignupScreen from "@/screens/customer/signupScreen";
import LoginScreen from "@/screens/shared/loginScreen";
import LoadingScreen from "@/screens/shared/loadingScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import { CustomerAuthContext } from "../../context/customerAuthContext";
import { AuthContext } from "@/context/authContext";

import Choose from "@/screens/shared/choosingScreen";
import CustomerMenuNavigator from "./customerMenuNavigator";
import LocationSelectionScreen from "../../screens/shared/LocationSelectionScreen";
import ManualLoactionScreen from "../../screens/shared/ManualLoactionScreen";
import NotificationPermissionScreen from "../../screens/customer/notificationPermissionScreen";
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
          <authStack.Screen
            name="NotificationPermission"
            component={NotificationPermissionScreen}
            options={{ presentation: "transparentModal" }}
          />
          <authStack.Screen
            name="LocationSelection"
            component={LocationSelectionScreen}
            options={{ presentation: "transparentModal" }}
          />
          <authStack.Screen
            name="ManualLoaction"
            component={ManualLoactionScreen}
            options={{ presentation: "transparentModal" }}
          />
        </>
      ) : (
        <authStack.Screen
          name="MenuCustomerNavigator"
          component={CustomerMenuNavigator}
          options={{ presentation: "transparentModal" }}
        />
      )}
    </authStack.Navigator>
  );
};

export default CustomerAuthNavigator;
