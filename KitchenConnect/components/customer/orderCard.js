import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { formatDate, formatTime } from "../../utils/formateDateTime";
import SubmitButton from "../../components/shared/forms/submitButton";
import RightButton from "../../components/shared/RightButton";
import foodTypeIcon from "@/utils/foodTypeIconPath";

// Mapping object
const foodTypeMapping = {
  Veg: "Veg",
  "Non-Veg": "NonVeg",
  Swaminarayan: "Swaminarayan",
  Jain: "Jain",
  Vegan: "Vegan",
};

const OrderCard = ({ orderItem, onPress }) => {
  //   console.log(orderItem);
  const iconKey = foodTypeMapping[orderItem.Tiffin.foodType];
  const iconData = foodTypeIcon[iconKey];

  return (
    <View style={styles.card}>
      <View style={[styles.contentBox, { paddingBottom: windowHeight * 0.01 }]}>
        <View style={styles.titleDetails}>
          <Image source={iconData.path} style={iconData.foodTypeStyle} />
          <Text style={styles.kitchenName}>{orderItem.Kitchen.name}</Text>
          <Text style={styles.tiffinName}>
            {orderItem.order.noOfTiffins > 1 &&
              orderItem.order.noOfTiffins + " x "}{" "}
            {orderItem.Tiffin.name}
          </Text>
          <View style={styles.delivery}>
            {orderItem.order.wantDelivery ? (
              <>
                <Image
                  source={require("@assets/shared/icons8-delivery-scooter-ios-17-glyph/icons8-delivery-scooter-90.png")}
                  style={styles.deliveryIcon}
                />
                <Text style={styles.timeText}>
                  {" "}
                  {orderItem.Tiffin.deliveryDetails.deliveryTime}
                </Text>
              </>
            ) : (
              <>
                <Image
                  source={require("@assets/shared/icons8-take-away-food-ios-17-filled/icons8-take-away-food-90.png")}
                  style={styles.deliveryIcon}
                />
                <Text style={styles.timeText}> {orderItem.Tiffin.time}</Text>
              </>
            )}
          </View>
          {/* <Text style={styles.price}>₹{orderItem.order.price.tiffinPrice}</Text> */}
        </View>
        <View style={styles.sideBar}>
          <Image
            source={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
            style={styles.tiffinImage}
          />
          <View style={styles.bookButton}>
            <Text style={styles.tiffinType}>{orderItem.Tiffin.tiffinType}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.contentBox,
          {
            borderTopWidth: windowWidth * 0.002,
            borderColor: "#ccc",
          },
        ]}
        onPress={onPress}
      >
        <Text style={styles.labelText}>Bill : </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.valueText}>
            ₹ {orderItem.order.customerPaymentBreakdown.total}
          </Text>
          <RightButton iconStyle={{ fontSize: windowWidth * 0.035 }} />
        </View>
      </TouchableOpacity>
      {/* <Text>{JSON.stringify(orderItem)}</Text> */}
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: windowWidth * 0.95,
    paddingHorizontal: windowWidth * 0.03,
    // paddingVertical: windowHeight * 0.01,
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
  contentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: windowHeight * 0.01,
  },
  titleDetails: {
    // backgroundColor: "#aaff",
    alignItems: "flex-start",
  },
  kitchenName: {
    textAlign: "center",
    fontSize: windowWidth * 0.056,
    fontFamily: "NunitoBold",
    marginBottom: windowHeight * 0.0015,
  },
  tiffinName: {
    fontSize: windowWidth * 0.044,
    fontFamily: "NunitoSemiBold",
    marginBottom: windowHeight * 0.0015,

    color: "#505050",
  },
  price: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    color: "#505050",
    marginBottom: windowHeight * 0.0015,
  },
  sideBar: {
    // backgroundColor: "#ffaa",
    // width: windowWidth * 0.35,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    // height: "100%",
  },
  tiffinImage: {
    height: windowWidth * 0.17,
    width: windowWidth * 0.17,
    borderRadius: windowWidth * 0.03,
  },
  tiffinType: {
    color: "#000",
    textAlign: "center",
    fontSize: windowWidth * 0.038,
    fontFamily: "NunitoRegular",
  },
  bookButton: {
    flexDirection: "row",
    backgroundColor: "#FFECEC",
    paddingVertical: windowWidth * 0.005,
    paddingHorizontal: windowWidth * 0.02,
    borderRadius: windowWidth * 0.01,
    borderWidth: 0.5,
    borderColor: "#ffa500",
    marginTop: windowHeight * 0.005,
    alignSelf: "center",
  },
  delivery: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: windowHeight * 0.0015,
  },
  deliveryIcon: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },
  timeText: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    color: "#3c3636",
    marginRight: windowWidth * 0.02,
  },
  labelText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
  },
  valueText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
  },
});
