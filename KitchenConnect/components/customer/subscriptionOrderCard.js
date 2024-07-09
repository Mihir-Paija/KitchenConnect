import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { formatDate, formatTime } from "../../utils/formateDateTime";
import SubmitButton from "../../components/shared/forms/submitButton";
import RightButton from "../../components/shared/RightButton";
import { skipSubOrder } from "../../utils/APIs/customerApi";
const SubscriptionOrderCard = ({ orderItem, subDetails, refreshOrders }) => {
  // console.log(subDetails);
  // console.log(orderItem);
  //   const statusMessage = renderStatusMessage(
  //     subscriptionItem.Subscription.subscriptionStatus
  //   );

  const skipHandler = async () => {
    // console.log("click on skip");
    const bodyData = { subOrderDate: orderItem.orderDate };
    // console.log(bodyData);
    try {
      // setLoading(true);
      const response = await skipSubOrder(subDetails.subscriptionID, bodyData);
      // console.log(response.data);
      Alert.alert("Success", "Order skipped successfully.");
      refreshOrders();
    } catch (error) {
      console.error("Failed to fetch order List customer:", error);
      Alert.alert("Error", "Failed to skip the order. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  const showConfirmationAlert = async (skipHandler) => {
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

  return (
    <View style={styles.card}>
      {/* <TouchableOpacity onPress={onPress} style={styles.card}> */}
      <View style={styles.SubBox}>
        <Text style={styles.subText}>
          {"Day "}
          {Math.floor(
            (new Date(orderItem.orderDate).getTime() -
              new Date(subDetails.startDate).getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1}
        </Text>
      </View>
      <View style={styles.contentBox}>
        <View
          style={[
            styles.bookingDetialBox,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <View style={styles.DateContent}>
            <Text style={styles.DateText}> Order Date </Text>
            <Text style={styles.DateValueText}>
              {" "}
              {formatDate(orderItem.orderDate)}{" "}
            </Text>
          </View>
          <View style={styles.DateContent}>
            <Text style={[styles.DateText]}>Order Time</Text>
            <Text style={[styles.DateValueText]}>{subDetails.tiffinTime}</Text>
          </View>
        </View>
        <View
          style={[
            styles.bookingDetialBox,
            { paddingHorizontal: windowWidth * 0.01 },
          ]}
        >
          <Text style={styles.detailText}>
            {subDetails.noOfTiffins} Tiffins
          </Text>
        </View>
        {/* {orderItem.status === "Completed" && (
          <View style={styles.bookingDetialBox}>
            <Text style={[styles.detailText, { fontFamily: "NunitoRegular" }]}>
              You have paid ₹ {orderItem.amountPaid} for this order.
            </Text>
          </View>
        )} */}
        <View style={styles.bookingIDBox}>
          <Text style={styles.bookingIDText}>Order ID : {orderItem._id}</Text>
        </View>
        {orderItem.status === "Upcoming" && !orderItem.otp && (
          <View style={styles.bookingIDBox}>
            <SubmitButton
              btnTitle={"Skip this Tiffin"}
              style={styles.detailsBtnStyle}
              txtStyle={styles.detailsBtnTextStyle}
              handleSubmitBtn={handleSkip}
            />
          </View>
        )}
        {orderItem.status === "Upcoming" && orderItem.otp && (
          <>
            <View style={styles.msgBox}>
              <Text style={styles.msgTxt}>
                You are required to pay ₹ {orderItem.pricePerTiffin}.
              </Text>
            </View>
            <View
              style={[
                styles.bookingIDBox,
                { alignSelf: "center", flexDirection: "row" },
              ]}
            >
              <Text style={styles.detailText}>OTP : </Text>
              {orderItem?.otp?.split("").map((char, index) => (
                <View key={index} style={styles.otpBox}>
                  <Text style={styles.detailText}>{char}</Text>
                </View>
              ))}
            </View>
          </>
        )}
        {orderItem.status === "OptedOut" && (
          <View
            style={[styles.msgBox, { backgroundColor: "rgba(255,0,0,0.3)" }]}
          >
            <Text style={styles.msgTxt}>
              You have skipped this tiffin on{"\n"}
              {formatDate(orderItem.optedOutDate)} at{" "}
              {formatTime(orderItem.optedOutDate)}.
            </Text>
          </View>
        )}
        {orderItem.status === "Completed" && (
          <>
            <View
              style={[
                styles.msgBox,
                { backgroundColor: "rgba(255,156,0,0.2)" },
              ]}
            >
              <Text style={styles.msgTxt}>
                You have paid ₹ {orderItem.amountPaid} for this order.
              </Text>
            </View>
            <View
              style={[
                styles.bookingIDBox,
                { alignSelf: "center", flexDirection: "row" },
              ]}
            >
              <Text style={styles.detailText}>OTP : </Text>
              {orderItem?.otp?.split("").map((char, index) => (
                <View
                  key={index}
                  style={[
                    styles.otpBox,
                    { backgroundColor: "rgba(rgba(128,128,128,0.5))" },
                  ]}
                >
                  <Text style={styles.detailText}>{char}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: windowWidth * 0.9,
    // padding: windowWidth * 0.03,
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
  SubBox: {
    // position: "absolute",
    // top: -windowWidth * 0.03,
    // right: -windowWidth * 0.03,
    backgroundColor: "#ffa500",
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.008,
    borderTopLeftRadius: windowWidth * 0.02,
    borderTopRightRadius: windowWidth * 0.02,

    // borderBottomRightRadius: windowWidth * 0.05,
    // zIndex: 1,
  },
  subText: {
    color: "#ffffff",
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoBold",
  },
  contentBox: {
    // backgroundColor: "#aaff",
    paddingHorizontal: windowWidth * 0.03,
    paddingTop: windowHeight * 0.003,
    paddingBottom: windowHeight * 0.005,
    borderBottomLeftRadius: windowWidth * 0.02,
    borderBottomRightRadius: windowWidth * 0.02,
    justifyContent: "center",
  },
  bookingDetialBox: {
    // backgroundColor: "#ffaa",
    marginVertical: windowHeight * 0.003,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: windowHeight * 0.008,
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
  btnBox: {
    // backgroundColor: "#afff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: windowHeight * 0.005,
    paddingVertical: windowHeight * 0.01,
    borderColor: "#ccc",
    borderTopWidth: windowWidth * 0.0015,
    // borderBottomWidth: windowWidth * 0.0015,
  },
  orderBtnStyle: {
    marginBottom: 0,
    marginTop: 0,
    width: windowWidth * 0.4,
    height: windowHeight * 0.04,
    backgroundColor: "#ffff",
    borderColor: "#ffa500",
    borderWidth: 1,
  },
  orderBtnTextStyle: {
    // color: "#3C3636",
    color: "#ffa500",
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
  },
  detailsBtnStyle: {
    marginBottom: 0,
    marginTop: 0,
    width: windowWidth * 0.4,
    height: windowHeight * 0.04,
    borderColor: "#ffa500",
    borderWidth: 1,
  },
  detailsBtnTextStyle: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
  },
  msgBox: {
    backgroundColor: "rgba(128,128,128,0.2)",
    borderRadius: windowWidth * 0.02,
    justifyContent: "center",
    paddingVertical: windowHeight * 0.007,
    paddingHorizontal: windowWidth * 0.03,
    marginVertical: windowHeight * 0.005,
  },
  msgTxt: {
    fontSize: windowWidth * 0.045,
    textAlign: "center",
    fontFamily: "NunitoRegular",
  },
  otpBox: {
    backgroundColor: "rgba(255,156,0,0.7)",
    marginHorizontal: windowWidth * 0.008,
    paddingHorizontal: windowWidth * 0.015,
    paddingVertical: windowHeight * 0.001,
  },
});

export default SubscriptionOrderCard;
