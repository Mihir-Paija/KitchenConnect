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
  
  const SubscriptionDetailsScreen = ({ navigation, route }) => {
    const {subscription} = route.params;

    const [authState, setAuthState] = useContext(AuthContext);
  
    const backHandler = () => {
      navigation.goBack();
    };

    const calculateDiscountedPrice = (price, discount) => {
      const discountedPrice =
        parseFloat(price) - (parseFloat(price) * parseFloat(discount)) / 100;
      return discountedPrice.toFixed(2);
    };
  
    const handleSubmitBtn = () => {
      console.log("click on submit");
    };
  
    return (
      <SafeAreaView style={styles.container}>
        {authState.authToken ? (
          <>
            <BackButtonComponent onPress={backHandler} />
            <ScrollView>
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
  
              <View style={[styles.bookingBox]}>
                <Text style={styles.bookingTitleTxt}>Payment Details</Text>
                <View
                  style={[
                    styles.paymentLineBox,
                    { marginTop: windowHeight * 0.01 },
                  ]}
                >
                  <Text style={styles.paymentTxt}>Basic Price : </Text>
                  <Text style={styles.paymentValueTxt}>
                    {" "}
                    ₹ {subscription.price}
                  </Text>
                </View>
                <View style={styles.paymentLineBox}>
                  <Text style={styles.paymentTxt}>
                    Taxes and Service Charge :{" "}
                  </Text>
                  <Text style={styles.paymentValueTxt}> ₹ 300</Text>
                </View>
                <View style={styles.paymentLineBox}>
                  <Text style={styles.paymentTxt}>Discount : </Text>
                  <Text style={styles.paymentValueTxt}> - ₹ 500</Text>
                </View>
                <View
                  style={[
                    styles.paymentLineBox,
                    { borderTopWidth: 1, borderTopColor: "#ccc" },
                  ]}
                >
                  <Text
                    style={[
                      styles.paymentTxt,
                      { fontFamily: "NunitoBold", fontSize: windowWidth * 0.048 },
                    ]}
                  >
                    Grand Total :{" "}
                  </Text>
                  <Text
                    style={[
                      styles.paymentValueTxt,
                      {
                        fontFamily: "NunitoExtraBold",
                        fontSize: windowWidth * 0.048,
                      },
                    ]}
                  >
                    ₹ 2200
                  </Text>
                </View>
                {subscription.deliveryIncluded && (
                  <View style={styles.paymentLineBox}>
                    <Text style={styles.paymentTxt}>Delivery Charge : </Text>
                    <Text style={styles.paymentValueTxt}>
                      ₹ {subscription.priceBreakdown.deliveryCharge} / delivery
                    </Text>
                  </View>
                )}
                <View
                  style={[
                    styles.paymentLineBox,
                    {
                      backgroundColor: "rgba(256,156,0,0.1)",
                      borderRadius: windowWidth * 0.02,
                    },
                  ]}
                >
                  <Text
                    style={[styles.paymentTxt, { fontSize: windowWidth * 0.035 }]}
                  >
                    ₹ 250 + {subscription.priceBreakdown.deliveryCharge} will be
                    automatically deducted from your wallet for each tiffin
                    received.
                  </Text>
                </View>
              </View>
              {(subscription.status === "current" ||
                subscription.status === "completed") && (
                <View style={[styles.bookingBox]}>
                  <Text style={styles.bookingTitleTxt}>Status</Text>
                  <View style={styles.statusLineBox}>
                    <View style={styles.dayBox}>
                      <View style={[styles.dayTxtBox, { flexDirection: "row" }]}>
                        <Text style={styles.dayvalueText}>
                          {subscription.daysCompleted}
                        </Text>
                        <Text style={styles.dayText}> days</Text>
                      </View>
                      <View style={styles.dayTxtBox}>
                        <Text style={styles.daykeyText}>Completed</Text>
                      </View>
                    </View>
  
                    {subscription.status === "current" && (
                      <View style={styles.dayBox}>
                        <View
                          style={[styles.dayTxtBox, { flexDirection: "row" }]}
                        >
                          <Text style={styles.dayvalueText}>
                            {subscription.remainingDays}
                          </Text>
                          <Text style={styles.dayText}> days</Text>
                        </View>
                        <View style={styles.dayTxtBox}>
                          <Text style={styles.daykeyText}>Remaining</Text>
                        </View>
                      </View>
                    )}
  
                    <View style={styles.dayBox}>
                      <View style={[styles.dayTxtBox, { flexDirection: "row" }]}>
                        <Text style={styles.dayvalueText}>
                          {subscription.daysOptedOut}
                        </Text>
                        <Text style={styles.dayText}> days</Text>
                      </View>
                      <View style={styles.dayTxtBox}>
                        <Text style={styles.daykeyText}>Opted Out</Text>
                      </View>
                    </View>
                  </View>
  
                  <View style={styles.statusLineBox}>
                    <Text style={styles.paymentTxt}>Paid till now : </Text>
                    <Text style={styles.paymentValueTxt}>₹ 500</Text>
                  </View>    
                  
                </View>
              )}
            </ScrollView>
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
    subBox: {
      padding: windowWidth * 0.03,
      marginVertical: windowHeight * 0.01,
      backgroundColor: "rgba(256,165,0,0.2)",
      // borderBottomLeftRadius: windowWidth * 0.05,
      // borderBottomRightRadius: windowWidth * 0.05,
      borderRadius: windowWidth * 0.05,
      width: windowWidth * 0.9,
      alignSelf: "center",
    },
    subNameText: {
      color: "rgba(204,128,0,1)",
      fontSize: windowWidth * 0.054,
      fontFamily: "NunitoExtraBold",
      textAlign: "center",
      marginBottom: windowHeight * 0.01,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    planPrice: {
      fontSize: windowWidth * 0.04,
      fontFamily: "NunitoSemiBold",
      // color: "#ffa500",
      marginBottom: 20,
    },
    originalPrice: {
      fontSize: windowWidth * 0.04,
      fontFamily: "NunitoSemiBold",
      color: "gray",
      textDecorationLine: "line-through",
      marginRight: 5,
    },
    discountedPrice: {
      fontSize: windowWidth * 0.04,
      fontFamily: "NunitoSemiBold",
      // color: "#ffa500",
      marginBottom: 5,
    },
    paymentLineBox: {
      flexDirection: "row",
      // marginVertical: windowHeight * 0.005,
      // borderBottomWidth: 1,
      // borderBottomColor: "#ccc",
      paddingVertical: windowHeight * 0.008,
      justifyContent: "space-between",
      paddingHorizontal: windowWidth * 0.03,
      // backgroundColor: "#aaff",
    },
    paymentTxt: {
      textAlign: "left",
      fontSize: windowWidth * 0.045,
      fontFamily: "NunitoSemiBold",
    },
    paymentValueTxt: {
      textAlign: "right",
      fontSize: windowWidth * 0.045,
      fontFamily: "NunitoSemiBold",
    },
    statusLineBox: {
      flexDirection: "row",
      // backgroundColor: "#ffaa",
      paddingHorizontal: windowWidth * 0.01,
      paddingVertical: windowHeight * 0.01,
      // marginVertical: windowHeight * 0.01,
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    dayBox: {},
    dayTxtBox: { alignItems: "flex-end", justifyContent: "center" },
    dayvalueText: { fontSize: windowWidth * 0.06, fontFamily: "NunitoBold" },
    dayText: { fontSize: windowWidth * 0.045, fontFamily: "NunitoRegular" },
    daykeyText: { fontSize: windowWidth * 0.05, fontFamily: "NunitoSemiBold" },
    submitButton: {
      backgroundColor: "#ffa500",
      borderRadius: windowWidth * 0.1,
      justifyContent: "center",
      marginBottom: windowHeight * 0.01,
      marginTop: windowHeight * 0.015,
      // marginVertical: windowHeight * 0.015,
      width: windowWidth * 0.7,
      paddingVertical: windowHeight * 0.008,
      alignSelf: "center",
    },
    submitText: {
      color: "#fff",
      fontSize: windowWidth * 0.05,
      fontFamily: "NunitoBold",
      textAlign: "center",
    },
    nextDelText: {
      fontSize: windowWidth * 0.035,
      fontFamily: "NunitoRegular",
      textAlign: "center",
    },
  });
  