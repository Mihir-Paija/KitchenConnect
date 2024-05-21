import React, { useContext } from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import SignupScreen from "@/screens/provider/signupScreen";
import LoginScreen from "@/screens/shared/loginScreen";
import { UserTypeContext } from "@/context/userTypeContext";
import { AuthContext } from "@/context/authContext";
import Choose from "@/screens/shared/choosingScreen";
import ProviderHomeNavigator from "./providerHomeNavigator";

const authStack = createStackNavigator();

const ProviderAuthNavigator = () => {
  // global states
  const [userType] = useContext(UserTypeContext);
  const [authState] = useContext(AuthContext);

  return (
    <authStack.Navigator
      initialRouteName={
        authState.authToken ? "Provider Home" : "Login"
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
        <authStack.Screen
          name="Provider Home"
          component={ProviderHomeNavigator}
          options={{ presentation: "transparentModal" }}
        />
      )}
    </authStack.Navigator>
  );
};

export default ProviderAuthNavigator;