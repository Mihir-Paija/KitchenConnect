import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "@/context/authContext";
import LoadingScreen from "./loadingScreen";

const AuthRedirect = ({ navigation }) => {
  const [authState] = useContext(AuthContext);

  useEffect(() => {
    if (authState.authToken) {
      if (authState.authType === "customer")
        navigation.navigate("CustomerAuthNavigator");
      else if (authState.authType === "provider")
        navigation.navigate("ProviderAuthNavigator");
    } else {
      navigation.navigate("Choose");
    }
  }, [authState, navigation]);

  return <LoadingScreen />;
};

export default AuthRedirect;
