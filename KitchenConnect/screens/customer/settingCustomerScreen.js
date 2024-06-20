import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import BackButtonComponent from "@/components/shared/BackButton";

const SettingCustomerScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <Text>SeetingCustomer</Text>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default SettingCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },
});
