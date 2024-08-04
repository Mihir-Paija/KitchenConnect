import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "@/context/authContext";
import LoadingScreen from "./loadingScreen";
import { isExpired } from "../services/customerAPI";

const AuthRedirect = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);

  const verify = async () => {
    console.log(authState);
    const response = await isExpired(authState.authToken);
    console.log(response.data.valid);

    if (response && response.data.valid === true) {
      if (authState.authType === "customer")
        navigation.navigate("CustomerAuthNavigator");
    } else {
      setAuthState({
        authReady: true,
        authToken: "",
        authType: "",
      });
      navigation.navigate("CustomerAuthNavigator");
    }
  };

  useEffect(() => {
    if (authState.authToken) {
      verify();
    } else {
      navigation.navigate("CustomerAuthNavigator");
    }
  }, [authState, navigation]);

  return <LoadingScreen />;
};

export default AuthRedirect;
