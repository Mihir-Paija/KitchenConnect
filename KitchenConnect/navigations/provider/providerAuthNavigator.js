import React, { useContext } from "react";
import SignupScreen from "@/screens/provider/signupScreen";
import LoginScreen from "@/screens/shared/loginScreen";
import HomeScreen from "@/screens/provider/homeScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { UserTypeContext } from "@/context/userTypeContext";
import { AuthContext } from "@/context/authContext";
import Choose from "@/screens/shared/choosingScreen";

const authStack = createStackNavigator();

const ProviderAuthNavigator = () => {
  //global states
  const [userType] = useContext(UserTypeContext);
  const [authState] = useContext(AuthContext)
 // console.log("Auth State in Tiffin Navigator:", authState);


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
          </> ):(

        <authStack.Screen
          name="Provider Home"
          component={HomeScreen}
          options={{ presentation: "transparentModal" }}
        />
          )}
    </authStack.Navigator>
  );
};

export default ProviderAuthNavigator;