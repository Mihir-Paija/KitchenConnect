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

const SubscriptionDetailsScreen = ({ navigation, route }) => {
  const subscription = route.params.subscription;
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
          <View style={styles.kitchenBox}>
            <View style={styles.kitchenContentBox}>
              <Text style={styles.providerName}>
                {subscription.providerName}
              </Text>
              <Text style={styles.tiffinName}>{subscription.tiffinName}</Text>
              <View style={{ alignSelf: "flex-start" }}>
                <TiffinTypeComponent tiffinType={subscription.tiffinType} />
              </View>
            </View>
            <Image
              source={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
              style={styles.tiffinImage}
            />
          </View>
          <View style={styles.bookingBox}>
            <Text style={styles.bookingTitleTxt}>Booking Details</Text>
            <View
              style={[
                styles.bookingDetialBox,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <View style={styles.DateContent}>
                <Text style={styles.DateText}> Start Date </Text>
                <Text style={styles.DateValueText}>
                  {" "}
                  {subscription.startDate}{" "}
                </Text>
              </View>
              <View style={styles.DateContent}>
                <Text style={[styles.DateText]}>End Date</Text>
                <Text style={[styles.DateValueText]}>
                  {subscription.endDate}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.bookingDetialBox,
                { paddingHorizontal: windowWidth * 0.01 },
              ]}
            >
              <Text style={styles.detailText}>
                {subscription.numberOfTiffins} Tiffins
              </Text>
            </View>
            <View style={styles.bookingIDBox}>
              <Text style={styles.bookingIDText}>
                Booking ID : KC45687987646
              </Text>
            </View>
          </View>
          {/* <Text>SubscriptionDetailsScreen</Text> */}
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
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
  },
  kitchenBox: {
    justifyContent: "space-between",
    alignSelf: "center",
    alignContent: "center",
    // alignItems: "center",
    flexDirection: "row",
    width: windowWidth * 0.9,
    padding: windowWidth * 0.03,
    marginVertical: windowHeight * 0.01,
    backgroundColor: "#ffff",
    borderRadius: windowWidth * 0.02,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation property for Android
    elevation: 2,
  },
  kitchenContentBox: {
    // backgroundColor: "#ffaa",
    // alignContent: "flex-start",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  providerName: {
    fontSize: windowWidth * 0.066,
    fontFamily: "NunitoExtraBold",
    marginVertical: windowHeight * 0.002,
  },
  tiffinName: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
    marginVertical: windowHeight * 0.002,
    color: "#505050",
  },
  tiffinImage: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    borderRadius: windowWidth * 0.02,
    // marginTop: windowWidth * 0.02,
    justifyContent: "center",
    alignSelf: "center",
  },
  bookingBox: {
    marginVertical: windowHeight * 0.01,
    alignSelf: "center",
    backgroundColor: "#ffff",
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.9,
    padding: windowWidth * 0.03,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation property for Android
    elevation: 2,
  },
  bookingTitleTxt: {
    fontSize: windowWidth * 0.048,
    fontFamily: "NunitoExtraBold",
  },
  bookingDetialBox: {
    marginVertical: windowHeight * 0.005,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: windowHeight * 0.01,
  },
  DateContent: {
    // paddingVertical: windowHeight * 0.005,
    // backgroundColor: "#ffaa",
    width: "50%",
  },
  DateText: {
    color: "#505050",
    textAlign: "left",
    fontFamily: "NunitoSemiBold",
    fontSize: windowWidth * 0.035,
    marginBottom: windowHeight * 0.002,
  },
  DateValueText: {
    color: "#000",
    textAlign: "left",
    fontSize: windowWidth * 0.044,
    fontFamily: "NunitoBold",
    marginTop: windowHeight * 0.002,
  },
  detailText: {
    color: "#000",
    textAlign: "left",
    fontSize: windowWidth * 0.044,
    fontFamily: "NunitoBold",
    // marginTop: windowHeight * 0.002,
  },
  bookingIDBox: {
    marginVertical: windowHeight * 0.005,
    // paddingVertical: windowHeight * 0.01,
  },
  bookingIDText: {
    color: "#000",
    textAlign: "center",
    fontSize: windowWidth * 0.042,
    fontFamily: "NunitoRegular",
  },
});
