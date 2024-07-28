import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import SubmitButton from "../../components/shared/forms/submitButton";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { AuthContext } from "@/context/authContext";
import { pushTokenCustomer } from "../../utils/APIs/customerApi";
import Constants from "expo-constants";
import { requestUserPermission } from "../../utils/firebase";

const NotificationPermissionScreen = () => {
  //global state
  const [authState, setAuthState] = useContext(AuthContext);
  const customerID = authState.authData._id;

  const [permissionStatus, setPermissionStatus] = useState(null);

  const checkPermissions = async () => {
    try {
      const authStatus = await messaging().hasPermission();
      setPermissionStatus(authStatus);

      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        if (!authState.authData.fcmToken) {
          await requestUserPermission();
          const token = await messaging().getToken();
          console.log("FCM Token:", token);
          await pushTokenCustomer(customerID, { token });
        }
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
    } finally {
      navigation.navigate("LocationSelection");
    }
  };
  useEffect(() => {
    checkPermissions();
  }, []);

  const handleAllowNotification = async () => {
    try {
      await requestUserPermission();
      const token = await messaging().getToken();
      console.log("FCM Token:", token);
      await pushTokenCustomer(customerID, { token });
      navigation.navigate("LocationSelection");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while requesting permissions.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsBox}>
        <Text style={styles.title}>Choose Location Option</Text>
      </View>
      <View style={styles.btnBox}>
        <SubmitButton
          btnTitle={"Allow Notification Access"}
          style={styles.FilledBtnStyle}
          txtStyle={styles.FilledBtnTextStyle}
          handleSubmitBtn={handleAllowNotification}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },
  detailsBox: {
    // backgroundColor: "#ffaa",
    height: "70%",
    // marginVertical: windowHeight * 0.05,
    paddingVertical: windowHeight * 0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBox: {
    // backgroundColor: "#afff",
    height: "30%",
    // marginVertical: windowHeight * 0.05,
    paddingVertical: windowHeight * 0.01,
  },
  FilledBtnStyle: {
    marginVertical: windowHeight * 0.005,
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    borderColor: "#ffa500",
    borderWidth: 1,
  },
  FilledBtnTextStyle: {
    fontSize: windowWidth * 0.054,
    fontFamily: "NunitoSemiBold",
  },
});
