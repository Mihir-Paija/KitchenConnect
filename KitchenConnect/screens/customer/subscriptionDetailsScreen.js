import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dropdown,
  TouchableWithoutFeedback,
  Button,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import BackButtonComponent from "../../components/shared/BackButton";
import { AuthContext } from "@/context/authContext";

const SubscriptionDetailsScreen = ({ navigation, route }) => {
  console.log(route.params);
  //global state
  const [authState, setAuthState] = useContext(AuthContext);
  //functions
  const backHandler = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backHandler} />
          <Text>SubscriptionDetailsScreen</Text>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
  },
});
