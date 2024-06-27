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

const SubscriptionDetailsScreen = ({ navigation, route }) => {
  //global state
  const [authState, setAuthState] = useContext(AuthContext);
  // console.log("authdata :", AuthContext);
  // const customerID = authState.authData.
  const subscription = route.params.subscription;
  const subscriptionID = route.params.subscriptionID;
  console.log("subscriptionID", subscriptionID);

  //state
  const [loading, setLoading] = useState(true);
  const [subDetails, setSubDetails] = useState({});

  //functions
  const fetchSubDetails = async (subscriptionID) => {
    try {
      console.log("hi");
      const response = await getSubscriptionDetailsCustomer(subscriptionID);
      // console.log(response);
      setSubDetails(response.data);
      console.log("response data", response.data);
    } catch (error) {
      console.error("Failed to fetch sub details customer:", error);
    } finally {
      // console.log("subDetails:", subDetails);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubDetails(subscriptionID);
  }, [subscriptionID]);

  // useEffect(() => {
  //   console.log("subDetails updated:", subDetails); // Log subDetails whenever it changes
  // }, [subDetails]);

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
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <BackButtonComponent onPress={backHandler} />
              <ScrollView>
                <View style={styles.subBox}>
                  <Text style={styles.subNameText}>
                    {" "}
                    {subDetails.SubscriptionPlan.title}{" "}
                  </Text>
                  <View style={styles.priceContainer}>
                    {subDetails.Subscription.customerPaymentBreakdown
                      .discount && (
                      <Text style={styles.originalPrice}>
                        ₹
                        {
                          subDetails.Subscription.customerPaymentBreakdown
                            .subscriptionPrice
                        }
                      </Text>
                    )}
                    <Text
                      style={
                        subDetails.Subscription.customerPaymentBreakdown
                          .discount
                          ? styles.discountedPrice
                          : styles.planPrice
                      }
                    >
                      ₹
                      {subDetails.Subscription.customerPaymentBreakdown.discount
                        ? subDetails.Subscription.customerPaymentBreakdown
                            .subscriptionPrice +
                          subDetails.Subscription.customerPaymentBreakdown
                            .discount
                        : subDetails.Subscription.customerPaymentBreakdown
                            .price}{" "}
                      / {subDetails.SubscriptionPlan.days}
                    </Text>
                  </View>
                </View>
                {subDetails.Subscription.subscriptionStatus.status ===
                  "Completed" && (
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
                      You have cancelled this subscription on [date].
                    </Text>
                  </View>
                )}

                <View style={styles.kitchenBox}>
                  <View style={styles.kitchenContentBox}>
                    <Text style={styles.providerName}>
                      {subDetails.Kitchen.name}
                    </Text>
                    <Text style={styles.tiffinName}>
                      {subDetails.Tiffin.name}
                    </Text>
                    <View style={{ alignSelf: "flex-start" }}>
                      <TiffinTypeComponent
                        tiffinType={subDetails.Tiffin.tiffinType}
                      />
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
                        {formatDate(subDetails.Subscription.startDate)}{" "}
                      </Text>
                    </View>
                    <View style={styles.DateContent}>
                      <Text style={[styles.DateText]}>End Date</Text>
                      <Text style={[styles.DateValueText]}>
                        {formatDate(subDetails.Subscription.endDate)}
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
                      {subDetails.Subscription.noOfTiffins} Tiffins
                    </Text>
                  </View>
                  <View style={styles.bookingIDBox}>
                    <Text style={styles.bookingIDText}>
                      Booking ID : {subDetails.Subscription._id}
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
                      ₹{" "}
                      {
                        subDetails.Subscription.customerPaymentBreakdown
                          .subscriptionPrice
                      }
                    </Text>
                  </View>
                  <View style={styles.paymentLineBox}>
                    <Text style={styles.paymentTxt}>Taxes : </Text>
                    <Text style={styles.paymentValueTxt}>
                      {" "}
                      ₹ {subDetails.Subscription.customerPaymentBreakdown.tax}
                    </Text>
                  </View>
                  <View style={styles.paymentLineBox}>
                    <Text style={styles.paymentTxt}>Service Charge : </Text>
                    <Text style={styles.paymentValueTxt}>
                      {" "}
                      ₹{" "}
                      {
                        subDetails.Subscription.customerPaymentBreakdown
                          .platformCharge
                      }
                    </Text>
                  </View>
                  <View style={styles.paymentLineBox}>
                    <Text style={styles.paymentTxt}>Discount : </Text>
                    <Text style={styles.paymentValueTxt}>
                      {" "}
                      - ₹{" "}
                      {
                        subDetails.Subscription.customerPaymentBreakdown
                          .discount
                      }
                    </Text>
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
                      ₹ {subDetails.Subscription.customerPaymentBreakdown.total}
                    </Text>
                  </View>
                  {subscription.deliveryIncluded && (
                    <View style={styles.paymentLineBox}>
                      <Text style={styles.paymentTxt}>Delivery Charge : </Text>
                      <Text style={styles.paymentValueTxt}>
                        ₹{" "}
                        {
                          subDetails.Subscription.customerPaymentBreakdown
                            .deliveryCharge
                        }{" "}
                        / delivery
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
                  </View>
                </View>

                {(subDetails.Subscription.subscriptionStatus.status ===
                  "Current" ||
                  subDetails.Subscription.subscriptionStatus.status ===
                    "Completed") && (
                  <View style={[styles.bookingBox]}>
                    <Text style={styles.bookingTitleTxt}>{}Status</Text>
                    <View style={styles.statusLineBox}>
                      <View style={styles.dayBox}>
                        <View
                          style={[styles.dayTxtBox, { flexDirection: "row" }]}
                        >
                          <Text style={styles.dayvalueText}>
                            {
                              subDetails.Subscription.subscriptionStatus
                                .daysCompleted.length
                            }
                          </Text>
                          <Text style={styles.dayText}> days</Text>
                        </View>
                        <View style={styles.dayTxtBox}>
                          <Text style={styles.daykeyText}>Completed</Text>
                        </View>
                      </View>

                      {subDetails.Subscription.subscriptionStatus.status ===
                        "Current" && (
                        <View style={styles.dayBox}>
                          <View
                            style={[styles.dayTxtBox, { flexDirection: "row" }]}
                          >
                            <Text style={styles.dayvalueText}>
                              {
                                subDetails.Subscription.subscriptionStatus
                                  .daysRemaining.length
                              }
                            </Text>
                            <Text style={styles.dayText}> days</Text>
                          </View>
                          <View style={styles.dayTxtBox}>
                            <Text style={styles.daykeyText}>Remaining</Text>
                          </View>
                        </View>
                      )}

                      <View style={styles.dayBox}>
                        <View
                          style={[styles.dayTxtBox, { flexDirection: "row" }]}
                        >
                          <Text style={styles.dayvalueText}>
                            {
                              subDetails.Subscription.subscriptionStatus
                                .daysOptedOut.length
                            }
                          </Text>
                          <Text style={styles.dayText}> days</Text>
                        </View>
                        <View style={styles.dayTxtBox}>
                          <Text style={styles.daykeyText}>Opted Out</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.statusLineBox}>
                      <Text style={styles.paymentTxt}>
                        {subscription.status === "current"
                          ? "Paid till now"
                          : "Paid amount"}{" "}
                        :{" "}
                      </Text>
                      <Text style={styles.paymentValueTxt}>₹ 500</Text>
                    </View>
                    {subDetails.Subscription.subscriptionStatus.status ===
                      "Current" && (
                      <>
                        <TouchableOpacity
                          style={styles.submitButton}
                          onPress={handleSubmitBtn}
                        >
                          <Text style={styles.submitText}>
                            Skip Next Tiffin
                            {/* {loading ? "Please Wait..." : "Opts out Next Tiffin"} */}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.nextDelText}>
                          The next tiffin will be received on [date] at [time].
                        </Text>
                      </>
                    )}
                    {subDetails.Subscription.subscriptionStatus.status ===
                      "Pending" && (
                      <>
                        <TouchableOpacity
                          style={styles.submitButton}
                          onPress={handleSubmitBtn}
                        >
                          <Text style={styles.submitText}>
                            withdraw request
                            {/* {loading ? "Please Wait..." : "Opts out Next Tiffin"}  */}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.nextDelText}>
                          The next tiffin will be received on [date] at [time].
                        </Text>
                      </>
                    )}
                  </View>
                )}
                {subDetails.Subscription.subscriptionStatus.status ===
                  "Pending" && (
                  <>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleSubmitBtn}
                    >
                      <Text style={styles.submitText}>
                        withdraw request
                        {/* {loading ? "Please Wait..." : "Opts out Next Tiffin"}  */}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                {subDetails.Subscription.subscriptionStatus.status ===
                  "Current" && (
                  <>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleSubmitBtn}
                    >
                      <Text style={styles.submitText}>
                        Cancel Subscription
                        {/* {loading ? "Please Wait..." : "Opts out Next Tiffin"}  */}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            </>
          )}
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
    marginBottom: windowHeight * 0.015,
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
