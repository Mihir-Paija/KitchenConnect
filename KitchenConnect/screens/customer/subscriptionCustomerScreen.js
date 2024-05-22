import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
} from "react-native";
import React, { useContext, useEffect } from "react";
import FooterMenu from "../../components/shared/menu/footerMenu";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";

const SubscriptionCustomerScreen = ({ navigation }) => {
  //gloabal states
  const [authState, setAuthState] = useContext(AuthContext);
  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      {authState.authToken ? (
        <>
          <Text>SubscriptionCustomerScreen</Text>
          <Text>{JSON.stringify(authState)}</Text>
          <FooterMenu navigation={navigation} />
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionCustomerScreen;

const styles = StyleSheet.create({});
