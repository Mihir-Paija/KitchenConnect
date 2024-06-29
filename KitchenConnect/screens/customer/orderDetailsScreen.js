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
import { windowWidth, windowHeight } from "@/utils/dimensions";
import TiffinTypeComponent from "../../components/customer/tiffinTypeComponent";
import SubmitButton from "../../components/shared/forms/submitButton";
import { getSubscriptionDetailsCustomer } from "@/utils/APIs/customerApi";
import LoadingScreen from "@/screens/shared/loadingScreen";
import { formatDate, formatTime } from "../../utils/formateDateTime";

const OrderDetailsScreen = ({ navigation, route }) => {
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
          <Text>OrderDetailsScreen</Text>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
  },
});
