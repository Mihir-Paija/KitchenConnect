import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./navigations/authNavigator";

import React, { useEffect, useState } from "react";
import LoadinScreen from "./screens/loadinScreen";
import WelcomeScreen from "./screens/welcomeScreen";
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
    return <LoadinScreen />;
  }
}
