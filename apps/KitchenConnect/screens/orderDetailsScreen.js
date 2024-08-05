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
import BackButtonComponent from "../components/BackButton";
import { AuthContext } from "@/context/authContext";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import TiffinTypeComponent from "../components/tiffinTypeComponent";
import LoadingScreen from "./loadingScreen";
import { formatDate, formatTime } from "../utils/formateDateTime";
import { getOrderDetails } from "../services/customerAPI";
import FeedBackModalCustomer from "../components/feedBackModalCustomer";
import FeedBackButton from "../components/feedBackButton";

const OrderDetailsScreen = ({ navigation, route }) => {
  //global state
  const [authState, setAuthState] = useContext(AuthContext);

  const OrderID = route.params.OrderID;
  const Tiffin = route.params.Tiffin;
  //   console.log(OrderID);
  // console.log(Tiffin);
  const [loading, setLoading] = useState(true);
  const [OrderDetails, setOrderDetails] = useState({ Tiffin });
  const [feedbackModalvisible, setFeedbackModalvisible] = useState(false);

  //functions

  const fetchOrderDetails = async (OrderID) => {
    try {
      //   console.log("hi");
      const response = await getOrderDetails(OrderID);
      // console.log(response);
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        ...response.data,
      }));
      //   console.log("response data", response.data);
    } catch (error) {
      console.error("Failed to fetch sub details customer:", error);
    } finally {
      // console.log("subDetails:", subDetails);
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     console.log(OrderDetails);
  //   }, [OrderDetails]);

  useEffect(() => {
    fetchOrderDetails(OrderID);
  }, [OrderID]);

  // useEffect(() => {
  //   console.log(feedbackModalvisible);
  // }, [feedbackModalvisible]);

  //   const renderStatusMessage = (status, delivery) => {
  //     if (status == "Pending")
  //       return "Expect a response within 15 minutes of subscriptionItem";
  //     if (status == "Rejected")
  //       return "Unfortunately, your request was Rejected by the provider";
  //     if (status == "Completed") return "You have received tiffin on [time] ";
  //     if (status == "Accepted" && delivery)
  //       return "Tiffin will be deliverd to you on [time]";
  //     if (status == "Accepted" && delivery)
  //       return "Your Tiffin will be ready by [time] on Kitchen Address";
  //     return null;
  //   };

  //   const statusMessage = renderStatusMessage(
  //     OrderDetails.order.status,
  //     OrderDetails.order.wantDelivery
  //   );

  const backHandler = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <BackButtonComponent
                screenTitle={"Order Summary"}
                onPress={backHandler}
              />
              <ScrollView>
                <View style={styles.kitchenBox}>
                  <View style={styles.kitchenContentBox}>
                    <Text style={styles.providerName}>
                      {OrderDetails.Kitchen.kitchenName}
                    </Text>
                    <Text style={styles.tiffinName}>
                      {OrderDetails.Tiffin.name}
                    </Text>
                    <View style={{ alignSelf: "flex-start" }}>
                      <TiffinTypeComponent
                        tiffinType={OrderDetails.Tiffin.tiffinType}
                      />
                    </View>
                  </View>
                  <Image
                    source={require("@/assets/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
                    style={styles.tiffinImage}
                  />
                </View>

                {/* {statusMessage && (
                  <View
                    style={[
                      styles.paymentLineBox,
                      {
                        backgroundColor: "rgba(128,128,128,0.2)",
                        borderRadius: windowWidth * 0.02,
                        width: windowWidth * 0.9,
                        alignSelf: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.paymentTxt,
                        { fontSize: windowWidth * 0.045, textAlign: "center" },
                      ]}
                    >
                      {statusMessage}
                    </Text>
                  </View>
                )} */}

                <View style={styles.bookingBox}>
                  <Text style={styles.bookingTitleTxt}>Order Details</Text>

                  <View
                    style={[
                      styles.bookingDetialBox,
                      { paddingHorizontal: windowWidth * 0.01 },
                    ]}
                  >
                    <View style={styles.DateContent}>
                      <Text style={[styles.DateText]}>Name</Text>
                      <Text style={[styles.DateValueText]}>
                        {OrderDetails.order.customerName}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.bookingDetialBox,
                      { paddingHorizontal: windowWidth * 0.01 },
                    ]}
                  >
                    <View style={styles.DateContent}>
                      <Text style={[styles.DateText]}>Order Date</Text>
                      <Text style={[styles.DateValueText]}>
                        {formatDate(OrderDetails.order.orderDate)} {" at "}{" "}
                        {formatTime(OrderDetails.order.orderDate)}
                      </Text>
                    </View>
                  </View>

                  {OrderDetails.order.wantDelivery && (
                    <View
                      style={[
                        styles.bookingDetialBox,
                        { paddingHorizontal: windowWidth * 0.01 },
                      ]}
                    >
                      <View style={styles.DateContent}>
                        <Text style={[styles.DateText]}>Deliver At</Text>
                        <Text style={[styles.DateValueText]}>
                          {OrderDetails.order.address}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View
                    style={[
                      styles.bookingDetialBox,
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: windowWidth * 0.01,
                      },
                    ]}
                  >
                    <View style={styles.DateContent}>
                      <Text style={styles.DateText}> Tiffins </Text>
                      <Text style={styles.DateValueText}>
                        {" "}
                        {OrderDetails.order.noOfTiffins}{" "}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.DateContent,
                        { justifyContent: "flex-end" },
                      ]}
                    >
                      <Text style={styles.operationTxt}>x</Text>
                    </View>
                    <View style={styles.DateContent}>
                      <Text style={styles.DateText}> Tiffin Price </Text>
                      <Text style={styles.DateValueText}>
                        {" "}
                        ₹ {OrderDetails.order.price.tiffinPrice}{" "}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.DateContent,
                        { justifyContent: "flex-end" },
                      ]}
                    >
                      <Text style={styles.operationTxt}>=</Text>
                    </View>
                    <View style={styles.DateContent}>
                      <Text style={styles.DateText}> Item Price </Text>
                      <Text style={styles.DateValueText}>
                        {" "}
                        ₹
                        {
                          OrderDetails.order.customerPaymentBreakdown.orderPrice
                        }{" "}
                      </Text>
                    </View>
                  </View>

                  {/* <View
                style={[
                  styles.bookingDetialBox,
                  { paddingHorizontal: windowWidth * 0.01 },
                ]}
              >
                <Text style={styles.detailText}>
                  {OrderDetails.order.noOfTiffins} Tiffins
                </Text>
              </View> */}

                  <View style={styles.bookingIDBox}>
                    <Text style={styles.bookingIDText}>
                      Order ID : {OrderDetails.order._id}
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
                    <Text style={styles.paymentTxt}>Item Price : </Text>
                    <Text style={styles.paymentValueTxt}>
                      {" "}
                      ₹ {OrderDetails.order.customerPaymentBreakdown.orderPrice}
                    </Text>
                  </View>
                  <View style={styles.paymentLineBox}>
                    <Text style={styles.paymentTxt}>Taxes : </Text>
                    <Text style={styles.paymentValueTxt}>
                      {" "}
                      ₹ {OrderDetails.order.customerPaymentBreakdown.tax}
                    </Text>
                  </View>
                  <View style={styles.paymentLineBox}>
                    <Text style={styles.paymentTxt}>Service Charge : </Text>
                    <Text style={styles.paymentValueTxt}>
                      {" "}
                      ₹{" "}
                      {
                        OrderDetails.order.customerPaymentBreakdown
                          .platformCharge
                      }
                    </Text>
                  </View>
                  {OrderDetails.order.customerPaymentBreakdown.discount > 0 && (
                    <View style={styles.paymentLineBox}>
                      <Text style={styles.paymentTxt}>Discount : </Text>
                      <Text style={styles.paymentValueTxt}>
                        {" "}
                        - ₹{" "}
                        {OrderDetails.order.customerPaymentBreakdown.discount}
                      </Text>
                    </View>
                  )}

                  {OrderDetails.order.wantDelivery && (
                    <View style={styles.paymentLineBox}>
                      <Text style={styles.paymentTxt}>Delivery Charge : </Text>
                      <Text style={styles.paymentValueTxt}>
                        ₹{" "}
                        {
                          OrderDetails.order.customerPaymentBreakdown
                            .deliveryCharge
                        }
                      </Text>
                    </View>
                  )}

                  <View
                    style={[
                      styles.paymentLineBox,
                      { borderTopWidth: 1, borderTopColor: "#ccc" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.paymentTxt,
                        {
                          fontFamily: "NunitoBold",
                          fontSize: windowWidth * 0.048,
                        },
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
                      ₹ {OrderDetails.order.customerPaymentBreakdown.total}
                    </Text>
                  </View>

                  {/* <View
                    style={[
                      styles.paymentLineBox,
                      {
                        backgroundColor: "rgba(256,156,0,0.1)",
                        borderRadius: windowWidth * 0.02,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.paymentTxt,
                        { fontSize: windowWidth * 0.035 },
                      ]}
                    >
                      ₹{" "}
                      {
                        subDetails.Subscription.customerPaymentBreakdown
                          .perOrderPrice
                      }{" "}
                      {subDetails.Subscription.subscriptionStatus.status === "completed" ? "was" : "will be"}{" "}
                      automatically deducted from your wallet for each tiffin
                      received.
                    </Text>
                  </View> */}
                </View>
              </ScrollView>
              <FeedBackButton
                setFeedbackModalvisible={setFeedbackModalvisible}
              />

              <FeedBackModalCustomer
                visible={feedbackModalvisible}
                onClose={() => setFeedbackModalvisible(false)}
                kitchenID={OrderDetails.Kitchen._id}
                tiffinID={Tiffin._id}
              />
            </>
          )}
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
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
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
    fontFamily: "NunitoBold",
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
    // marginVertical: windowHeight * 0.005,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: windowHeight * 0.01,
  },
  detailText: {
    color: "#000",
    textAlign: "left",
    fontSize: windowWidth * 0.044,
    fontFamily: "NunitoBold",
    // marginTop: windowHeight * 0.002,
  },
  paymentLineBox: {
    flexDirection: "row",
    // marginVertical: windowHeight * 0.005,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    paddingVertical: windowHeight * 0.007,
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
  DateText: {
    color: "#505050",
    textAlign: "left",
    fontFamily: "NunitoSemiBold",
    fontSize: windowWidth * 0.032,
    marginBottom: windowHeight * 0.001,
  },
  DateValueText: {
    color: "#000",
    textAlign: "left",
    fontSize: windowWidth * 0.044,
    fontFamily: "NunitoSemiBold",
  },
  operationTxt: {
    textAlign: "center",
    fontSize: windowWidth * 0.06,
    fontFamily: "NunitoRegular",
  },
});
