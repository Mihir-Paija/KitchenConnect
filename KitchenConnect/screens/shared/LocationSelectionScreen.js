import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import SubmitButton from "../../components/shared/forms/submitButton";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import * as Location from "expo-location";

const LocationSelectionScreen = ({ navigation }) => {
  //states

  //functions

  // Request location
  const handleAllowLocationAccess = async () => {
    console.log("allow");
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Permission to access location was denied"
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
    } catch (error) {
      console.error(error);
      Alert.alert(error);
    }finally{
      navigation.navigate("Login");
    }
  };

  const handleEnterLocationManually = () => {
    console.log("manual");
    navigation.navigate("ManualLoaction");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsBox}>
        <Text style={styles.title}>Choose Location Option</Text>
      </View>
      <View style={styles.btnBox}>
        <SubmitButton
          btnTitle={"Allow Location Access"}
          style={styles.FilledBtnStyle}
          txtStyle={styles.FilledBtnTextStyle}
          handleSubmitBtn={handleAllowLocationAccess}
        />
        <SubmitButton
          btnTitle={"Enter Location Manually"}
          style={styles.OutLinedBtnStyle}
          txtStyle={styles.OutLinedBtnTextStyle}
          handleSubmitBtn={handleEnterLocationManually}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },
  detailsBox: {
    // backgroundColor: "#ffaa",
    height: "60%",
    // marginVertical: windowHeight * 0.05,
    paddingVertical: windowHeight * 0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBox: {
    // backgroundColor: "#afff",
    height: "40%",
    // marginVertical: windowHeight * 0.05,
    paddingVertical: windowHeight * 0.01,
  },
  OutLinedBtnStyle: {
    marginVertical: windowHeight * 0.005,
    width: windowWidth * 0.8,
    height: windowHeight * 0.06,
    backgroundColor: "#ffff",
    borderColor: "#ffa500",
    borderWidth: 1,
  },
  OutLinedBtnTextStyle: {
    color: "#ffa500",
    fontSize: windowWidth * 0.054,
    fontFamily: "NunitoSemiBold",
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
