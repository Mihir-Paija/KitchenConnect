import React, { useContext } from "react";
import SignupScreen from "@/screens/shared/auth/signupScreen";
import LoginScreen from "@/screens/shared/auth/loginScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import { UserTypeContext } from "../../context/userTypeContext";

const authStack = createStackNavigator();

const CustomerAuthNavigator = () => {
  //global states
  const [userType] = useContext(UserTypeContext);

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
      <authStack.Screen
        name="HomeCustomer"
        component={HomeCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
    </authStack.Navigator>
  );
};

export default CustomerAuthNavigator;
