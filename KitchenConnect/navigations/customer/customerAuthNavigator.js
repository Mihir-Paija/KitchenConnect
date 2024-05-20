import React, { useContext } from "react";
import SignupScreen from "@/screens/customer/signupScreen";
import LoginScreen from "@/screens/shared/loginScreen";
import LoadingScreen from "@/screens/shared/loadingScreen";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import { CustomerAuthContext } from "../../context/customerAuthContext";
import { AuthContext } from "@/context/authContext";
import Choose from "@/screens/shared/choosingScreen";

const authStack = createStackNavigator();

const CustomerAuthNavigator = () => {
  //global states
  // const [authCustomerState] = useContext(CustomerAuthContext);
  const [authState] = useContext(AuthContext)
  // if (!authCustomerState.authCustomerReady) {
  //   return <LoadingScreen />;
  // }
 // console.log("Auth State in Customer Navigator:", authState);

  return (
    <authStack.Navigator
      initialRouteName={
        /* authCustomerState.authCustomerReady &&
         authCustomerState.authCustomerToken
           ? "HomeCustomer"
           : "Login" */
        authState.authReady && authState.authToken ? "HomeCustomer" : "Login"
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
          name="HomeCustomer"
          component={HomeCustomerScreen}
          options={{ presentation: "transparentModal" }}
        />
      )}
    </authStack.Navigator>
  );
};

export default CustomerAuthNavigator;
