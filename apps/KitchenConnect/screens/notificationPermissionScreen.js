import {
  Alert,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  View,
  BackHandler,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import SubmitButton from "../components/forms/submitButton";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import * as Notifications from "expo-notifications";
//import * as Permissions from "expo-permissions";
import { AuthContext } from "@/context/authContext";
import { pushTokenCustomer } from "../services/customerAPI";
import Constants from "expo-constants";
import { requestUserPermission } from "../utils/firebase";
import messaging from "@react-native-firebase/messaging";
import { useIsFocused } from "@react-navigation/native";

const NotificationPermissionScreen = ({ navigation }) => {
  console.log("Notification");
  //global state
  const [authState, setAuthState] = useContext(AuthContext);
  const customerID = authState.authData._id;
  const isFocused = useIsFocused();

  const [permissionStatus, setPermissionStatus] = useState(null);

  const backAction = () => {
    // if (isFocused) {
    //   console.log('focused')
    //   navigation.navigate("MenuCustomerNavigator")
    //   return true;
    // }

    // console.log('not focused')

    // return false;

    return true;
  };

  useEffect(() => {
    console.log("useEffect");
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  const checkPermissions = async () => {
    try {
      const authStatus = await messaging().hasPermission();
      setPermissionStatus(authStatus);

      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        if (!authState.authData?.fcmToken) {
          await requestUserPermission();
          const token = await messaging().getToken();
          console.log("FCM Token:", token);
          await pushTokenCustomer(customerID, { token });
        }
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
    } finally {
      if (authState.authData.address.length === 0) {
        navigation.replace("LocationSelection");
      } else {
        navigation.navigate("MenuCustomerNavigator");
      }
    }
  };
  // useEffect(() => {
  //   checkPermissions();
  // }, []);

  const handleAllowNotification = async () => {
    try {
      const authStatus = await messaging().hasPermission();
      setPermissionStatus(authStatus);
      console.log("auth", authStatus);

      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        if (!authState.authData?.fcmToken) {
          await requestUserPermission();
          const token = await messaging().getToken();
          console.log("FCM Token:", token);
          await pushTokenCustomer(customerID, { token });

          // navigation.navigate("SuccessScreen", {
          //   msg: "Permission Granted",
          //   navigationScreen: "MenuCustomerNavigator",
          // });
        }
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
    } finally {
      if (authState.authData.address.length === 0) {
        navigation.navigate("SuccessScreen", {
          msg: "Permission Granted",
          navigationScreen: "LocationSelection",
        });

        //navigation.replace("LocationSelection");
      } else {
        navigation.navigate("SuccessScreen", {
          msg: "Permission Granted",
          navigationScreen: "MenuCustomerNavigator",
        });
        //navigation.navigate("MenuCustomerNavigator");
      }
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
