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
  TextInput,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import BackButtonComponent from "../../components/shared/BackButton";
import { AuthContext } from "@/context/authContext";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import TiffinTypeComponent from "../../components/customer/tiffinTypeComponent";
import SubmitButton from "../../components/shared/forms/submitButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/AntDesign";

const subscription = {
  id: 1,
  providerName: "Phoenix Kitchen",
  tiffinName: "Veg Thali",
  subscriptionName: "Standard Subscription",
  tiffinType: "Lunch",
  duration: 15,
  deliveryIncluded: true,
  deliveryCharge: 50,
  price: "2000",
  discount: "10",
  priceBreakdown: {
    subscriptionPrice: 1500,
    deliveryCharge: 50,
    totalPrice: 3000,
  },
  orderDate: "2024-06-12",
  orderTime: "12:00",
  numberOfTiffins: 30,
  startDate: "2024-06-14",
  endDate: "2024-07-13",
  pricePerTiffinDelivery: 50,
  status: "pending",
  remainingDays: null,
  daysCompleted: null,
  daysOptedOut: null,
};

const SubscribeCustomerScreen = ({ navigation, route }) => {
  //global state
  const [authState, setAuthState] = useContext(AuthContext);
  //route param
  const subscriptionPlan = route.params.subscriptionPlan;
  // console.log(subscriptionPlan);

  //price breakdown

  // local state
  const [isChecked, setIsChecked] = useState(false);
  const [subscriberFirstName, setSubscriberFirstName] = useState("");
  const [subscriberLastName, setSubscriberLastName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + subscription.duration * 24 * 60 * 60 * 1000)
  );
  const [wantDelivery, setWantDelivery] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [numberOfTiffins, setNumberOfTiffins] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const subscriptionTypes = {
    7: "week",
    14: "fortNight",
    30: "month",
  };

  //functions
  useEffect(() => {
    // Set end date based on the start date and duration
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + subscription.duration);
    setEndDate(newEndDate);
  }, [startDate]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
    setEndDate(
      new Date(
        currentDate.getTime() + subscription.duration * 24 * 60 * 60 * 1000
      )
    );
  };

  const backHandler = () => {
    navigation.goBack();
  };
  const plusTiffin = () => {
    setNumberOfTiffins(numberOfTiffins + 1);
  };
  const minusTiffin = () => {
    if (numberOfTiffins > 1) setNumberOfTiffins(numberOfTiffins - 1);
  };
  const handleSubmitBtn = () => {
    if (agreed) {
      console.log("click on submit");
      console.log("Subscriber Name:", subscriberName);
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
      console.log("Number of Tiffins:", numberOfTiffins);
      console.log("Want Delivery:", wantDelivery);
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice =
      parseFloat(price) - (parseFloat(price) * parseFloat(discount)) / 100;
    return discountedPrice.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backHandler} />
          <ScrollView>
            <View style={styles.subBox}>
              <Text style={styles.subNameText}> {subscriptionPlan.title} </Text>
              <View style={styles.priceContainer}>
                {subscription.discount && (
                  <Text style={styles.originalPrice}>
                    ₹{subscription.price}
                  </Text>
                )}
                <Text
                  style={
                    subscription.discount
                      ? styles.discountedPrice
                      : styles.planPrice
                  }
                >
                  ₹
                  {subscription.discount
                    ? calculateDiscountedPrice(
                        subscription.price,
                        subscription.discount
                      )
                    : subscription.price}{" "}
                  / {subscriptionTypes[subscriptionPlan.days]}
                </Text>
              </View>
            </View>
            <View style={[styles.bookingBox]}>
              <Text style={styles.bookingTitleTxt}>Subscribtion Details</Text>
              <View style={styles.formLineBox}>
                <Text style={styles.inputLableTxt}>Subscriber Name:</Text>
                <View style={styles.subscriberNameBox}>
                  <View style={styles.DateBox}>
                    <TextInput
                      style={[styles.input, styles.inputvalueTxt]}
                      placeholder="First Name"
                      value={subscriberFirstName}
                      onChangeText={setSubscriberFirstName}
                    />
                  </View>
                  <View style={styles.DateBox}>
                    <TextInput
                      style={[styles.input, styles.inputvalueTxt]}
                      placeholder="Last Name"
                      value={subscriberLastName}
                      onChangeText={setSubscriberLastName}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.formLineBox}>
                <View style={styles.subscriberNameBox}>
                  <View style={styles.DateBox}>
                    <Text style={styles.inputLableTxt}>Start Date</Text>
                    {/* <Button
                      style={[styles.input, styles.inputvalueTxt]}
                      onPress={() => setShowDatePicker(true)}
                      title={startDate.toDateString()}
                    /> */}
                    <TouchableOpacity
                      style={[
                        styles.input,
                        { paddingVertical: windowHeight * 0.005 },
                      ]}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text style={styles.inputvalueTxt}>
                        {startDate.toDateString()}
                      </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                      />
                    )}
                  </View>
                  <View style={styles.DateBox}>
                    <Text style={styles.inputLableTxt}>End Date</Text>
                    <View
                      style={[
                        styles.input,
                        { paddingVertical: windowHeight * 0.005 },
                      ]}
                    >
                      <Text style={styles.inputvalueTxt}>
                        {endDate.toDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.formLineBox}>
                <View style={styles.tiffinNoBox}>
                  <Icon
                    name="minuscircleo"
                    type="AntDesign"
                    style={styles.icon}
                    onPress={minusTiffin}
                  />
                  <Text
                    style={[
                      styles.inputvalueTxt,
                      { alignSelf: "center", marginRight: windowWidth * 0.02 },
                    ]}
                  >
                    {numberOfTiffins}
                  </Text>
                  <Icon
                    name="pluscircleo"
                    type="AntDesign"
                    style={styles.icon}
                    onPress={plusTiffin}
                  />
                  <Text style={[styles.inputvalueTxt, { alignSelf: "center" }]}>
                    Tiffins
                  </Text>
                </View>
              </View>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  isChecked={wantDelivery}
                  onClick={() => setWantDelivery(!wantDelivery)}
                  boxType="square" // Optional: to specify box type (square or circle)
                  checkBoxColor="#ffa500"
                />
                <Text style={{ marginLeft: windowWidth * 0.01 }}>
                  Do you want Delivery?
                </Text>
              </View>
            </View>
            <View style={[styles.bookingBox]}>
              <Text style={styles.bookingTitleTxt}>Payment Details</Text>
              <View style={styles.paymentLineBox}>
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
                  ₹ 250 + {subscription.priceBreakdown.deliveryCharge}{" "}
                  {subscription.status === "completed" ? "was" : "will be"}{" "}
                  automatically deducted from your wallet for each tiffin
                  received.
                </Text>
              </View>
            </View>
            <View style={[styles.bookingBox]}>
              <Text style={styles.bookingTitleTxt}>Terms & Conditions</Text>
              <Text style={styles.ConditionTxt}>
                1. If you choose the delivery option, you will be required to
                pay the delivery charge for all the days of your subscription
                duration, including the days you have opted out from the
                subscription.
              </Text>
              <Text style={styles.ConditionTxt}>
                2. We do not guarantee that you will receive tiffins according
                to the initially provided menu. Changes to the menu are allowed,
                meaning that once you subscribe, there is no guarantee that the
                menu will remain the same as on the day you subscribed.
              </Text>
              <Text style={styles.ConditionTxt}>
                3. Discounts are only applicable if you have used the
                subscription service worth the basic subscription price of
                [price].
              </Text>
              <Text style={styles.ConditionTxt}>
                4. For every tiffin you receive, a specified amount, determined
                during the subscription process, will be automatically deducted
                from your wallet.
              </Text>
              <Text style={styles.ConditionTxt}>
                5. If your wallet balance falls below [min amount] rupees, you
                will not receive any upcoming tiffins.
              </Text>
              <Text style={styles.ConditionTxt}>
                6. There is no need to pay the delivery personnel or the
                provider directly. Any direct payment will not be considered
                part of this subscription.
              </Text>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  isChecked={agreed}
                  onClick={() => setAgreed(!agreed)}
                  boxType="square" // Optional: to specify box type (square or circle)
                  checkBoxColor="#ffa500"
                />
                <Text style={{ marginLeft: windowWidth * 0.01 }}>
                  Do you agree with Terms & Conditions?
                </Text>
              </View>
            </View>

            <SubmitButton
              btnTitle={"Subscribe"}
              handleSubmitBtn={handleSubmitBtn}
              style={
                agreed
                  ? { height: windowHeight * 0.05 }
                  : { backgroundColor: "#A9A9A9", height: windowHeight * 0.05 }
              }
            />
          </ScrollView>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default SubscribeCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
  },
  subBox: {
    padding: windowWidth * 0.03,
    marginVertical: windowHeight * 0.01,
    backgroundColor: "rgba(255,215,0,0.3)",
    // borderBottomLeftRadius: windowWidth * 0.05,
    // borderBottomRightRadius: windowWidth * 0.05,
    borderRadius: windowWidth * 0.05,
    width: windowWidth * 0.9,
    alignSelf: "center",
  },
  subNameText: {
    color: "rgba(210,120,0,1)",
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
    marginBottom: windowHeight * 0.01,
  },
  bookingDetialBox: {
    marginVertical: windowHeight * 0.005,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: windowHeight * 0.01,
  },
  DateBox: {
    // paddingVertical: windowHeight * 0.005,
    // backgroundColor: "#ffaa",
    width: "45%",
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
  formLineBox: {
    paddingHorizontal: windowWidth * 0.02,
    marginVertical: windowHeight * 0.01,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.01,
    paddingLeft: windowWidth * 0.02,
    paddingVertical: windowHeight * 0.003,
  },
  inputLableTxt: {
    color: "#505050",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    marginBottom: windowHeight * 0.008,
  },
  inputvalueTxt: { fontSize: windowWidth * 0.046, fontFamily: "NunitoRegular" },
  subscriberNameBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ConditionTxt: {
    color: "#505050",
    fontSize: windowWidth * 0.035,
    fontFamily: "NunitoRegular",
    paddingHorizontal: windowWidth * 0.02,
    marginVertical: windowHeight * 0.008,
  },
  submitBtn: {
    marginBottom: windowHeight * 0.02,
    // marginTop: windowHeight * 0.015,
    width: windowWidth * 0.75,
    height: windowHeight * 0.05,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: windowHeight * 0.02,
    // alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
    marginRight: windowWidth * 0.02,
    fontSize: windowWidth * 0.06,
    color: "#ffa500",
    fontFamily: "NunitoLight",
    // backgroundColor: "#ffff",
  },
  tiffinNoBox: {
    flexDirection: "row",
  },
});
