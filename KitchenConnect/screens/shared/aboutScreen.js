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

const AboutScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);

  //functions
  const backHandler = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backHandler} screenTitle={"About"} />
          <View></View>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },
});
