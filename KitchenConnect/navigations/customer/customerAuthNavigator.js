import React, { useContext } from "react";
import SignupScreen from "@screens/customer/signupScreen";
import LoginScreen from "@screens/shared/auth/loginScreen";
import LoadingScreen from "@screens/shared/loadingScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import { CustomerAuthContext } from "../../context/authContext";

const authStack = createStackNavigator();

const CustomerAuthNavigator = () => {
  //global states
  const [authCustomerState] = useContext(CustomerAuthContext);
  if (!authCustomerState.authCustomerReady) {
    return <LoadingScreen />;
  }
  // console.log("Auth State in Navigator:", authCustomerState);

  return (
    <authStack.Navigator
      initialRouteName={
        authCustomerState.authCustomerReady &&
        authCustomerState.authCustomerToken
          ? "HomeCustomer"
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
      {!authCustomerState.authCustomerToken ? (
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
          name="HomeCustomer"
          component={HomeCustomerScreen}
          options={{ presentation: "transparentModal" }}
        />
      )}
    </authStack.Navigator>
  );
};

export default CustomerAuthNavigator;
