import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Choose from './screens/shared/choosingScreen'
import CustomerAuthNavigator from "./navigations/customer/customerAuthNavigator";
import ProviderAuthNavigator from "./navigations/provider/providerAuthNavigator";


import LoadingScreen from "./screens/shared/loadingScreen";
import WelcomeScreen from "./screens/shared/welcomeScreen";
import loadFonts from "./utils/fontLoader";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    loadFonts().then(() => setIsAppReady(true));
  }, []);

  if (isAppReady) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Choose" component={Choose}/>
          <Stack.Screen name="CustomerAuthNavigator" component={CustomerAuthNavigator} />
          <Stack.Screen name="ProviderAuthNavigator" component={ProviderAuthNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoadingScreen />;
  }
}
