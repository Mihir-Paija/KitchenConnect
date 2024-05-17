import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./navigations/customer/authNavigator";

import React, { useEffect, useState } from "react";
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
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoadingScreen />;
  }
}
