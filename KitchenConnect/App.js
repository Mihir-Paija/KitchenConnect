import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Choose from "./screens/shared/choosingScreen";
import CustomerAuthNavigator from "./navigations/customer/customerAuthNavigator";
import ProviderAuthNavigator from "./navigations/provider/providerAuthNavigator";
import LoadingScreen from "./screens/shared/loadingScreen";
import WelcomeScreen from "./screens/shared/welcomeScreen";
import loadFonts from "./utils/fontLoader";
import { CustomerAuthProvider } from "./context/customerAuthContext";
import {AuthProvider} from "./context/authContext";
import { UserTypeProvider } from "./context/userTypeContext";
import { SocketProvider } from "./context/socketContext";
import WelcomeNavigator from "./navigations/welcomeNavigator";
import { initializeFirebase, requestUserPermission, handleBackgroundMessages, handleForegroundMessages } from './utils/firebase';

export default function App() {
  //global states
  // const { authCustomerState } = useContext(CustomerAuthContext);
  // const { userType } = useContext(UserTypeContext);

  //states
  const [isAppReady, setIsAppReady] = useState(false);

  //first render
  useEffect(() => {
    //initializeFirebase()
    //requestUserPermission();
   // handleBackgroundMessages();
    //handleForegroundMessages()
    loadFonts().then(() => setIsAppReady(true));
  }, []);

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

    <AuthProvider>
      <UserTypeProvider>
        <SocketProvider>
        <NavigationContainer>
          <WelcomeNavigator />
        </NavigationContainer>
        </SocketProvider>
      </UserTypeProvider>
    </AuthProvider>
  );
}
