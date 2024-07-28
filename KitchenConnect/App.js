import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Choose from "./screens/shared/choosingScreen";
import CustomerAuthNavigator from "./navigations/customer/customerAuthNavigator";
import ProviderAuthNavigator from "./navigations/provider/providerAuthNavigator";
import LoadingScreen from "./screens/shared/loadingScreen";
import WelcomeScreen from "./screens/shared/welcomeScreen";
import loadFonts from "./utils/fontLoader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomerAuthProvider } from "./context/customerAuthContext";
import { AuthProvider } from "./context/authContext";
import { UserTypeProvider } from "./context/userTypeContext";
import { SocketProvider } from "./context/socketContext";
import WelcomeNavigator from "./navigations/welcomeNavigator";
import {
  initializeFirebase,
  requestUserPermission,
  handleBackgroundMessages,
  handleForegroundMessages,
} from "./utils/firebase";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export default function App() {
  //global states
  // const { authCustomerState } = useContext(CustomerAuthContext);
  // const { userType } = useContext(UserTypeContext);

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

  // useEffect(() => {
  //   const checkPermissions = async () => {
  //     const { status } = await Notifications.getPermissionsAsync();
  //     console.log(status);
  //     // setPermissionStatus(status);
  //     if (status === "granted") {
  //       // console.log(Constants);
  //       const projectId = "kitchenconnect-2021";
  //       console.log("projectId", projectId);
  //       if (!projectId) {
  //         throw new Error("Project ID not found");
  //       }
  //       const tokenResponse = await Notifications.getExpoPushTokenAsync({
  //         projectId,
  //       });
  //       const token = tokenResponse.data;
  //       console.log("Push Token:", token);
  //     }
  //   };

  //   checkPermissions();
  // }, []);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return (
    /*<CustomerAuthProvider>
      <UserTypeProvider>
        <NavigationContainer>
          <WelcomeNavigator />
        </NavigationContainer>
      </UserTypeProvider>
    </CustomerAuthProvider> */
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <UserTypeProvider>
          <SocketProvider>
            <NavigationContainer>
              <WelcomeNavigator />
            </NavigationContainer>
          </SocketProvider>
        </UserTypeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
