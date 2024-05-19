import React, { useEffect, useState, useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Choose from "./screens/shared/choosingScreen";
import CustomerAuthNavigator from "./navigations/customer/customerAuthNavigator";
import ProviderAuthNavigator from "./navigations/admin/providerAuthNavigator";

import LoadingScreen from "./screens/shared/loadingScreen";
import WelcomeScreen from "./screens/shared/welcomeScreen";
import loadFonts from "./utils/fontLoader";
import { CustomerAuthProvider } from "./context/authContext";
import { UserTypeProvider } from "./context/userTypeContext";

const Stack = createNativeStackNavigator();

export default function App() {
  //global states
  // const { authCustomerState } = useContext(CustomerAuthContext);
  // const { userType } = useContext(UserTypeContext);

  //states
  const [isAppReady, setIsAppReady] = useState(false);

  //first render
  useEffect(() => {
    loadFonts().then(() => setIsAppReady(true));
  }, []);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <CustomerAuthProvider>
        <UserTypeProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Choose" component={Choose} />
            <Stack.Screen
              name="CustomerAuthNavigator"
              component={CustomerAuthNavigator}
            />
            <Stack.Screen
              name="ProviderAuthNavigator"
              component={ProviderAuthNavigator}
            />
          </Stack.Navigator>
        </UserTypeProvider>
      </CustomerAuthProvider>
    </NavigationContainer>
  );
}
