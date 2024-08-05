import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "./screens/shared/loadingScreen";
import loadFonts from "./utils/fontLoader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./context/authContext";
import { SocketProvider } from "./context/socketContext";
import WelcomeNavigator from "./navigations/welcomeNavigator";
import {
  initializeFirebase,
  requestUserPermission,
  handleBackgroundMessages,
  handleForegroundMessages,
} from "./utils/firebase";

export default function App() {

  //states
  const [isAppReady, setIsAppReady] = useState(false);

  //first render
  useEffect(() => {
    initializeFirebase();
    requestUserPermission();
    handleBackgroundMessages();
    handleForegroundMessages();
    loadFonts().then(() => setIsAppReady(true));
  }, []);


  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
          <SocketProvider>
            <NavigationContainer>
              <WelcomeNavigator />
            </NavigationContainer>
          </SocketProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
