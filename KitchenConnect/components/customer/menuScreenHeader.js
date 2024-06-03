import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "@utils/dimensions";
import RatingComponent from "./ratingComponent";
import foodTypeIcon from "@/utils/foodTypeIconPath";
import Icon from "react-native-vector-icons/Octicons";

// Mapping object
const foodTypeMapping = {
  Veg: "Veg",
  "Non-Veg": "NonVeg",
  Swaminarayan: "Swaminarayan",
  Jain: "Jain",
  Vegan: "Vegan",
};

const HeaderMenuCustomer = ({ tiffin }) => {
  const iconKey = foodTypeMapping[tiffin.foodType];
  const iconData = foodTypeIcon[iconKey];
  return (
    <SafeAreaView style={styles.menuHeader}>
      <Image source={iconData.path} style={iconData.foodTypeStyle} />
      <View style={styles.middleContent}>
        <View style={styles.tiffinDetails}>
          <Text style={styles.name}>{tiffin.name}</Text>
          <Text style={styles.shortDescription}>{tiffin.shortDescription}</Text>
          <View style={styles.ratingBox}>
            <RatingComponent rating={3.5} />
          </View>
          <Text style={styles.price}>Starting from ₹{tiffin.price}</Text>
        </View>
        <View style={styles.sideBar}>
          <Image
            source={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
            style={styles.tiffinImage}
          />
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Text style={styles.time}>
          Tiffin will be prepared by {tiffin.time}
        </Text>
        {tiffin.deliveryDetails.availability ? (
          <View style={styles.delivery}>
            <Image
              source={require("@assets/shared/icons8-delivery-scooter-ios-17-glyph/icons8-delivery-scooter-90.png")}
              style={styles.deliveryIcon}
            />
            <Text style={styles.deliveryText}>
              {" "}
              ₹{tiffin.deliveryDetails.deliveryCharge}{" "}
              <Icon name="dot-fill" type="Octicons" style={styles.dotIcon} />{" "}
              Tiffin will be delivered by {tiffin.deliveryDetails.deliveryTime}
            </Text>
          </View>
        ) : (
          <Text style={styles.noDelivery}>
            Delivery Service is not Available for this tiffin
          </Text>
        )}
      </View>
      <View style={styles.line}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuHeader: {
    // backgroundColor: "#ffaa",
    paddingHorizontal: windowWidth * 0.02,
    paddingVertical: windowHeight * 0.01,
    justifyContent: "space-between",
  },
  middleContent: {
    // backgroundColor: "#f8f8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    marginVertical: windowHeight * 0.005,
  },
  tiffinDetails: {
    // backgroundColor: "#aaff",
    alignItems: "flex-start",
    width: windowWidth * 0.6,
    height: "100%",
  },
  name: {
    textAlign: "center",
    fontSize: windowWidth * 0.06,
    fontFamily: "NunitoBold",
    marginBottom: windowWidth * 0.01,
  },
  shortDescription: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginBottom: windowWidth * 0.01,
    color: "#3c3636",
  },
  ratingBox: {
    marginVertical: windowWidth * 0.02,
  },
  price: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginBottom: windowWidth * 0.01,
    color: "#3c3636",
  },
  address: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginVertical: windowWidth * 0.02,
    color: "#3c3636",
  },
  sideBar: {
    width: windowWidth * 0.35,
    height: "100%",
    alignItems: "flex-end",
    // backgroundColor: "#aaaa",
  },
  tiffinImage: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.35,
    borderRadius: windowWidth * 0.03,
  },
  bottomContent: {
    // backgroundColor: "#f8f8",
    justifyContent: "center",
    alignContent: "center",
  },
  time: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginBottom: windowWidth * 0.01,
    color: "#3c3636",
  },
  noDelivery: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginBottom: windowWidth * 0.01,
    color: "#3c3636",
  },
  delivery: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: windowWidth * 0.01,
  },
  dotIcon: {
    // backgroundColor: "#aaff",
    fontSize: windowWidth * 0.03,
    color: "#3c3636",
  },
  deliveryText: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    color: "#3c3636",
  },
  deliveryIcon: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },
  line: {
    borderWidth: 0.2,
    opacity: 0.4,
    borderColor: "black",
    marginTop: windowHeight * 0.01,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 4,
    // Android shadow (elevation)
    elevation: 5,
  },
});

export default HeaderMenuCustomer;
