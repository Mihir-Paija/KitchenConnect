import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { formatDate, formatTime } from "../../utils/formateDateTime";

const SubscriptionCard = ({ onPress, subscriptionItem }) => {
  // const navScreen = subscriptionItem.type + "SubScreen";
  // console.log(subscriptionItem);
  const renderStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Expect a response within 12 hours of subscriptionItem.";
      case "declined":
        return "Unfortunately, your request was declined by the provider.";
      default:
        return null;
    }
  };

  const statusMessage = renderStatusMessage(
    subscriptionItem.Subscription.subscriptionStatus
  );

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.SubBox}>
        <Text style={styles.subText}>
          {subscriptionItem.subscriptionPlanData.title}
        </Text>
      </View>
      <View style={styles.contentBox}>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}>
            {formatDate(subscriptionItem.Subscription.orderDate)}{" "}
            {formatTime(subscriptionItem.Subscription.orderDate)}
          </Text>
          <Text style={styles.detailText}>
            {subscriptionItem.Subscription.noOfTiffins} Tiffins
          </Text>
        </View>

        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View style={styles.titleBox}>
            <Image
              source={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
              style={styles.tiffinImage}
            />
            <View style={styles.titleContent}>
              <Text style={styles.providerName}>
                {subscriptionItem.Kitchen.name}
              </Text>
              <Text style={styles.tiffinName}>
                {subscriptionItem.Tiffin.name}
              </Text>
            </View>
          </View>
          <View style={styles.tiffinTypeBox}>
            <Text style={styles.tiffinType}>
              {subscriptionItem.Tiffin.tiffinType}
            </Text>
            <Text style={styles.tiffinType}>Tiffin</Text>
          </View>
        </View>
        <View style={styles.DateBox}>
          <View style={styles.DateContent}>
            <Text style={styles.DateText}> Start Date </Text>
            <Text style={styles.DateValueText}>
              {" "}
              {formatDate(subscriptionItem.Subscription.startDate)}{" "}
            </Text>
          </View>
          <View style={styles.DateContent}>
            <Text style={[styles.DateText, { textAlign: "right" }]}>
              End Date
            </Text>
            <Text style={[styles.DateValueText, { textAlign: "right" }]}>
              {formatDate(subscriptionItem.Subscription.endDate)}
            </Text>
          </View>
        </View>

        {statusMessage && (
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>{statusMessage}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
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
    paddingVertical: windowHeight * 0.008,
    borderBottomLeftRadius: windowWidth * 0.02,
    borderBottomRightRadius: windowWidth * 0.02,
    justifyContent: "center",
  },
  titleBox: {
    flexDirection: "row",
  },
  titleContent: {
    // backgroundColor: "#ffaa",
    justifyContent: "center",
    paddingHorizontal: windowWidth * 0.03,
  },
  tiffinImage: {
    height: windowWidth * 0.13,
    width: windowWidth * 0.13,
    borderRadius: windowWidth * 0.02,
    marginTop: windowWidth * 0.02,
  },
  providerName: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoBold",
    marginVertical: windowHeight * 0.001,
  },
  tiffinName: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    marginVertical: windowHeight * 0.001,
    color: "#505050",
  },
  tiffinType: {
    color: "#000",
    textAlign: "center",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoRegular",
  },
  tiffinTypeBox: {
    backgroundColor: "#FFECEC",
    paddingVertical: windowWidth * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    borderRadius: windowWidth * 0.02,
    borderWidth: 0.5,
    borderColor: "#FFECEC",
    justifyContent: "center",
  },
  DateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: windowHeight * 0.005,
    // backgroundColor: "#aaff",
  },
  DateContent: {
    paddingVertical: windowHeight * 0.005,
    // backgroundColor: "#ffaa",
  },
  DateText: {
    color: "#000",
    textAlign: "left",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    marginBottom: windowHeight * 0.002,
  },
  DateValueText: {
    color: "#505050",
    textAlign: "left",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginTop: windowHeight * 0.002,
  },
  detailBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: windowHeight * 0.005,
  },
  detailText: {
    fontSize: windowWidth * 0.035,
    fontFamily: "NunitoRegular",
    color: "#505050",
  },
  statusBox: {
    backgroundColor: "rgba(255,165,0,0.2)",
    justifyContent: "center",
    marginVertical: windowHeight * 0.005,
    borderRadius: windowWidth * 0.02,
    padding: windowWidth * 0.008,
    paddingLeft: windowWidth * 0.02,
  },
  statusText: {
    // textAlign: "center",
    color: "#000",
    fontSize: windowWidth * 0.035,
    fontFamily: "NunitoRegular",
  },
});

export default SubscriptionCard;
