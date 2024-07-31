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
  Alert,
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
import { cancelSubscription, skipSubOrder } from "../../utils/APIs/customerApi";
import CalendarComponent from "../../components/shared/calendarComponent";
import Icon from "react-native-vector-icons/Ionicons";
import RightButton from "../../components/shared/RightButton";
import { color } from "react-native-elements/dist/helpers";
import CalendarModal from "../../components/shared/calendarModal";
import FeedBackModalCustomer from "../../components/customer/feedBackModalCustomer";
import FeedBackButton from "../../components/customer/feedBackButton";

const SubscriptionDetailsScreen = ({ navigation, route }) => {
  //global state
  const [authState, setAuthState] = useContext(AuthContext);
  // console.log("authdata :", AuthContext);
  // const customerID = authState.authData.
  const subscription = route.params.subscription;
  const subscriptionID = route.params.subscriptionID;
  // console.log("subscriptionID", subscriptionID);

  //state
  const [loading, setLoading] = useState(true);
  const [subDetails, setSubDetails] = useState({});
  const [earliestDate, setEarliestDate] = useState(null);
  const [calendar, setCalendar] = useState(false);
  const [feedbackModalvisible, setFeedbackModalvisible] = useState(false);

  //functions
  useEffect(() => {
    if (calendar) {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)");
    } else {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor(styles.container.backgroundColor);
    }
  }, [, calendar]);

  const fetchSubDetails = async (subscriptionID) => {
    try {
      // console.log("hi");
      const response = await getSubscriptionDetailsCustomer(subscriptionID);
      // console.log(response);
      setSubDetails(response.data);
      // console.log("response data", response.data);
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

  const handleSubmitBtn = () => {
    console.log("click on submit");
  };

  const findEarliestDate = () => {
    const daysRemaining =
      subDetails.Subscription.subscriptionStatus.daysRemaining;

    // Ensure the array is not empty
    if (daysRemaining && daysRemaining.length > 0) {
      // Find the earliest date
      const earliestDate = new Date(
        Math.min(...daysRemaining.map((date) => new Date(date)))
      );
      // console.log("Earliest Date:", earliestDate);
      return earliestDate;
    } else {
      console.log("No dates available");
      return null;
    }
  };

  useEffect(() => {
    if (subDetails.Subscription && subDetails.Subscription.subscriptionStatus) {
      const date = findEarliestDate();
      setEarliestDate(date);
    }
  }, [subDetails]);

  const skipHandler = async () => {
    // console.log("click on skip");
    const bodyData = { subOrderDate: earliestDate };
    console.log(bodyData);
    try {
      // setLoading(true);
      const response = await skipSubOrder(subscriptionID, bodyData);
      console.log(response.data);
      Alert.alert("Success", "Next Order skipped successfully.");
      fetchSubDetails(subscriptionID);
    } catch (error) {
      console.error("Failed to fetch order List customer:", error.message);
      Alert.alert("Error", "Failed to skip the order. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  const showConfirmationAlert = async () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Confirm Action",
        "Are you sure you want to skip this order?",
        [
          {
            text: "Cancel",
            onPress: () => reject("Action cancelled"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  const handleSkip = async () => {
    try {
      const confirmed = await showConfirmationAlert();
      if (confirmed) {
        await skipHandler(); // Explicitly call skipHandler here
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    console.log("click on cancel");
    console.log(subscriptionID);
    try {
      // setLoading(true);
      const response = await cancelSubscription(subscriptionID);
      // console.log(response.data);
      Alert.alert("Success", "Order skipped successfully.");
      fetchSubDetails(subscriptionID);
    } catch (error) {
      console.error("Failed to fetch order List customer:", error);
      Alert.alert("Error", "Failed to skip the order. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  const showCancelConfirmationAlert = async (skipHandler) => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Confirm Action",
        "Are you sure you want to cancel this subscription?",
        [
          {
            text: "Cancel",
            onPress: () => reject("Action cancelled"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  const cancelSubHandler = async () => {
    try {
      const confirmed = await showCancelConfirmationAlert();
      if (confirmed) {
        await handleCancel(); // Explicitly call skipHandler here
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCalendar = () => [setCalendar(!calendar)];

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
                      {subDetails.Kitchen.kitchenName}
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

                {subDetails.Subscription.subscriptionStatus.status ===
                  "Cancelled" && (
                  <View
                    style={[
                      styles.msgBox,
                      { backgroundColor: "rgba(255,0,0,0.2)" },
                    ]}
                  >
                    {/* {console.log(subscriptionItem.Subscription.cancelDate)} */}
                    <Text style={styles.msgText}>
                      You have cancelled this subscription on{" "}
                      {formatDate(
                        subDetails.Subscription.subscriptionStatus.cancelDate
                      )}{" "}
                      at{" "}
                      {formatTime(
                        subDetails.Subscription.subscriptionStatus.cancelDate
                      )}
                      .
                    </Text>
                  </View>
                )}

                {subDetails.Subscription.subscriptionStatus.status !=
                  "Pending" && (
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

                    {subDetails.Subscription.subscriptionStatus.status !=
                      "Pending" && (
                      <TouchableOpacity
                        style={styles.statusLineBox}
                        onPress={toggleCalendar}
                      >
                        <Text style={[styles.paymentTxt, { color: "#505050" }]}>
                          View In Calendar
                        </Text>
                        <RightButton
                          onPress={toggleCalendar}
                          iconStyle={{ color: "#505050" }}
                        />
                      </TouchableOpacity>
                    )}

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
                          onPress={handleSkip}
                        >
                          <Text style={styles.submitText}>
                            Skip Next Tiffin
                            {/* {loading ? "Please Wait..." : "Opts out Next Tiffin"} */}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.nextDelText}>
                          The next tiffin will be received on{" "}
                          {formatDate(earliestDate)} at{" "}
                          {subDetails.Subscription.wantDelivery
                            ? subDetails.Tiffin.deliveryDetails.deliveryTime
                            : subDetails.Tiffin.time}
                          .
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
                      </>
                    )}
                  </View>
                )}

                <View style={styles.bookingBox}>
                  <Text style={styles.bookingTitleTxt}>Booking Details</Text>

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
                      <Text style={[styles.DateText]}>First Name</Text>
                      <Text style={[styles.DateValueText]}>
                        {subDetails.Subscription.subscriberFirstName}
                      </Text>
                    </View>
                    <View style={styles.DateContent}>
                      <Text style={[styles.DateText]}>Last Name</Text>
                      <Text style={[styles.DateValueText]}>
                        {subDetails.Subscription.subscriberLastName}
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
                      <Text style={[styles.DateText]}>Subscription Date</Text>
                      <Text style={[styles.DateValueText]}>
                        {formatDate(subDetails.Subscription.createdAt)} {" at "}{" "}
                        {formatTime(subDetails.Subscription.createdAt)}
                      </Text>
                    </View>
                  </View>

                  {subDetails.Subscription.wantDelivery && (
                    <View
                      style={[
                        styles.bookingDetialBox,
                        { paddingHorizontal: windowWidth * 0.01 },
                      ]}
                    >
                      <Text style={[styles.DateText]}>Delivery At</Text>
                      <Text style={[styles.DateValueText]}>
                        {subDetails.Subscription.address}
                      </Text>
                    </View>
                  )}

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
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: windowWidth * 0.01,
                      },
                    ]}
                  >
                    <View>
                      <Text style={styles.DateText}> Tiffins </Text>
                      <Text style={styles.DateValueText}>
                        {" "}
                        {subDetails.Subscription.noOfTiffins}{" "}
                      </Text>
                    </View>

                    <View style={{ justifyContent: "flex-end" }}>
                      <Text style={styles.operationTxt}>x</Text>
                    </View>
                    <View>
                      <Text style={styles.DateText}> Duration </Text>
                      <Text
                        style={[styles.DateValueText, { textAlign: "center" }]}
                      >
                        {" "}
                        {subDetails.SubscriptionPlan.days}{" "}
                      </Text>
                    </View>

                    <View style={{ justifyContent: "flex-end" }}>
                      <Text style={styles.operationTxt}>x</Text>
                    </View>
                    <View>
                      <Text style={styles.DateText}> Tiffin Price </Text>
                      <Text style={styles.DateValueText}>
                        {" "}
                        ₹ {subDetails.Subscription.price.tiffinPrice}{" "}
                      </Text>
                    </View>

                    <View style={{ justifyContent: "flex-end" }}>
                      <Text style={styles.operationTxt}>=</Text>
                    </View>
                    <View>
                      <Text style={styles.DateText}> Item Price </Text>
                      <Text style={styles.DateValueText}>
                        {" "}
                        ₹
                        {
                          subDetails.Subscription.customerPaymentBreakdown
                            .subscriptionPrice
                        }{" "}
                      </Text>
                    </View>
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
                    <Text style={styles.paymentTxt}>Item Price : </Text>
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
                  {subDetails.Subscription.wantDelivery && (
                    <View style={styles.paymentLineBox}>
                      <Text style={styles.paymentTxt}>
                        Total Delivery Charge :{" "}
                      </Text>
                      <Text style={styles.paymentValueTxt}>
                        ₹{" "}
                        {
                          subDetails.Subscription.customerPaymentBreakdown
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
                      ₹ {subDetails.Subscription.customerPaymentBreakdown.total}
                    </Text>
                  </View>

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
                      {subDetails.Subscription.subscriptionStatus.status ===
                      "completed"
                        ? "was"
                        : "will be"}{" "}
                      automatically deducted from your wallet for each tiffin
                      received.
                    </Text>
                  </View>
                </View>

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
                      style={[
                        styles.submitButton,
                        { marginBottom: windowHeight * 0.095 },
                      ]}
                      onPress={cancelSubHandler}
                    >
                      <Text style={styles.submitText}>
                        Cancel Subscription
                        {/* {loading ? "Please Wait..." : "Opts out Next Tiffin"}  */}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                {calendar ? (
                  <CalendarModal
                    visible={calendar}
                    onClose={toggleCalendar}
                    startDate={subDetails.Subscription.startDate}
                    endDate={subDetails.Subscription.endDate}
                    completed={
                      subDetails.Subscription.subscriptionStatus.daysCompleted
                    }
                    customerOut={
                      subDetails.Subscription.subscriptionStatus.daysOptedOut
                    }
                    providerOut={
                      subDetails.Subscription.subscriptionStatus
                        .providerOptedOut
                    }
                  />
                ) : null}
              </ScrollView>
              <FeedBackButton
                setFeedbackModalvisible={setFeedbackModalvisible}
              />

              <FeedBackModalCustomer
                visible={feedbackModalvisible}
                onClose={() => setFeedbackModalvisible(false)}
                kitchenID={subDetails.Kitchen._id}
                tiffinID={subDetails.Tiffin._id}
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

export default SubscriptionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
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
  msgBox: {
    width: windowWidth * 0.9,
    alignSelf: "center",
    backgroundColor: "rgba(255,165,0,0.2)",
    justifyContent: "center",
    marginVertical: windowHeight * 0.005,
    borderRadius: windowWidth * 0.02,
    paddingVertical: windowWidth * 0.01,
    paddingHorizontal: windowWidth * 0.02,
  },
  msgText: {
    // textAlign: "center",
    color: "#000",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
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
  DateContent: {
    // paddingVertical: windowHeight * 0.005,
    // backgroundColor: "#ffaa",
    width: "50%",
  },
  DateText: {
    color: "#505050",
    textAlign: "left",
    fontFamily: "NunitoSemiBold",
    fontSize: windowWidth * 0.033,
    marginBottom: windowHeight * 0.001,
  },
  DateValueText: {
    color: "#000",
    textAlign: "left",
    fontSize: windowWidth * 0.044,
    fontFamily: "NunitoSemiBold",
    // marginTop: windowHeight * 0.002,
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
  calendarButton: {
    paddingTop: windowHeight * 0.02,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  calendarText: {
    fontSize: windowWidth * 0.04,
  },
  operationTxt: {
    textAlign: "center",
    fontSize: windowWidth * 0.06,
    fontFamily: "NunitoRegular",
  },
});
