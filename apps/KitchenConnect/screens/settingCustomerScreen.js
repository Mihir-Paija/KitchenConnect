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
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import BackButtonComponent from "@/components/BackButton";

const SettingCustomerScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);

  //functions
  const backHandler = () => {
    navigation.goBack();
  };
  const profileHandler = () => {
    // console.log("profile clicked");
    navigation.navigate("ProfileDetailsCustomer");
  };

  // handle logout
  const handleDelete = async () => {
    console.log("delete accont");
    // try {
    //   const response = await deleteCustomer();
    //   if (response && response.status === 200) {
    //     setAuthState({
    //       authReady: true,
    //       authToken: "",
    //       authType: "",
    //     });
    //     await AsyncStorage.removeItem("@auth");
    //     console.log("Deleted successfully");
    //     navigation.navigate("Choose");
    //   } else {
    //     console.error("Failed to Delete", response);
    //   }
    // } catch (error) {
    //   console.log("Error In deleting Customer", error);
    // }
  };
  const confirmDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delte your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete Cancelled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDelete,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backHandler} screenTitle={"Settings"} />
          <TouchableOpacity
            onPress={profileHandler}
            style={[styles.lineBox, { marginTop: windowHeight * 0.015 }]}
          >
            <Text style={styles.labelText}>Edit Profile</Text>
            <Text style={styles.contentText}>
              Change your name, profile photo, etc...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lineBox}>
            <Text style={styles.labelText}>Edit Address</Text>
            <Text style={styles.contentText}>
              Change your address or Add new address
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDelete} style={styles.lineBox}>
            <Text style={styles.labelText}>Account Setting</Text>
            <Text style={styles.contentText}>Delete your account</Text>
          </TouchableOpacity>
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
  lineBox: {
    width: windowWidth * 0.95,
    alignSelf: "center",
    marginVertical: windowHeight * 0.005,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.015,
  },
  labelText: {
    fontFamily: "NunitoSemiBold",
    fontSize: windowWidth * 0.045,
  },
  contentText: {
    fontFamily: "NunitoSemiBold",
    fontSize: windowWidth * 0.035,
    color: "#505050",
  },
});
