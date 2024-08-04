import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/authContext";
import { SocketProvider } from "./context/socketContext";
import loadFonts from "./utils/fontLoader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoadingScreen from "./screens/loadingScreen";
import WelcomeNavigator from "./navigations/welcomeNavigator";

export default function App() {
  //states
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // initializeFirebase();
    // requestUserPermission();
    // handleBackgroundMessages();
    // handleForegroundMessages();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
