import React, { useContext } from "react";
import SignupScreen from "../../screens/provider/signupScreen";
import LoginScreen from "@screens/shared/auth/loginScreen";
import HomeScreen from "@screens/provider/homeScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { UserTypeContext } from "@context/userTypeContext";

const authStack = createStackNavigator();

const ProviderAuthNavigator = () => {
  //global states
  const [userType] = useContext(UserTypeContext);

  return (
    <authStack.Navigator
      initialRouteName={"Login"}
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
      <authStack.Screen
        name="Provider Home"
        component={HomeScreen}
        options={{ presentation: "transparentModal" }}
      />
    </authStack.Navigator>
  );
};

export default ProviderAuthNavigator;
