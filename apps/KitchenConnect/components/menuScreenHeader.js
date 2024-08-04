import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "../utils/dimensions";
import RatingComponent from "./ratingComponent";
import foodTypeIcon from "../utils/foodTypeIconPath";
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
  console.log("tiffin", tiffin);
  const iconKey = foodTypeMapping[tiffin.foodType];
  const iconData = foodTypeIcon[iconKey];
  return (
    <SafeAreaView style={styles.menuHeader}>
      <View style={styles.middleContent}>
        <View style={styles.tiffinDetails}>
          <Image source={iconData.path} style={iconData.foodTypeStyle} />
          <Text style={styles.name}>{tiffin.name}</Text>
          <Text style={styles.shortDescription}>{tiffin.shortDescription}</Text>
          <View style={styles.ratingBox}>
            <RatingComponent
              rating={tiffin.rating}
              ratingsize={tiffin.ratingsize > 0 ? tiffin.ratingsize : null}
              kitchenID={tiffin.providerID}
              tiffinID={tiffin._id}
            />
          </View>
          <Text style={styles.price}>Starting from ₹{tiffin.price}</Text>
          <View style={styles.time}>
            <View style={styles.delivery}>
              <Image
                source={require("@assets/icons8-take-away-food-ios-17-filled/icons8-take-away-food-100.png")}
                style={styles.deliveryIcon}
              />
              <Text style={styles.timeText}> {tiffin.time}</Text>
            </View>

            {tiffin.deliveryDetails.availability ? (
              <>
                <Icon name="dot-fill" type="Octicons" style={styles.dotIcon} />
                <View style={styles.delivery}>
                  <Image
                    source={require("@assets/icons8-delivery-scooter-ios-17-glyph/icons8-delivery-scooter-90.png")}
                    style={styles.deliveryIcon}
                  />
                  <Text style={styles.timeText}>
                    {" "}
                    {tiffin.deliveryDetails.deliveryTime}
                  </Text>
                </View>
              </>
            ) : (
              //   <Text style={styles.noDelivery}>
              //     Delivery Service is not Available for this tiffin
              //   </Text>
              <></>
            )}
          </View>
        </View>
        <View style={styles.sideBar}>
          <Image
            source={require("@/assets/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
            style={styles.tiffinImage}
          />
          <View style={styles.bookButton}>
            <Text style={styles.tiffinType}>{tiffin.tiffinType} Tiffin</Text>
          </View>
        </View>
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
    marginBottom: windowWidth * 0.013,
  },
  shortDescription: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    color: "#3c3636",
    marginBottom: windowWidth * 0.013,
  },
  ratingBox: {
    marginBottom: windowWidth * 0.013,
  },
  price: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginBottom: windowWidth * 0.013,
    color: "#3c3636",
  },
  time: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginBottom: windowWidth * 0.013,
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
    // marginBottom: windowWidth * 0.01,
  },
  dotIcon: {
    // backgroundColor: "#aaff",
    fontSize: windowWidth * 0.03,
    color: "#3c3636",
    marginRight: windowWidth * 0.02,
  },
  timeText: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    color: "#3c3636",
    marginRight: windowWidth * 0.02,
  },
  deliveryIcon: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },
  sideBar: {
    width: windowWidth * 0.35,
    height: "100%",
  },
  tiffinImage: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.35,
    borderRadius: windowWidth * 0.03,
  },
  tiffinType: {
    color: "#000",
    textAlign: "center",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoRegular",
  },
  bookButton: {
    backgroundColor: "#FFECEC",
    paddingVertical: windowWidth * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    borderRadius: windowWidth * 0.02,
    borderWidth: 0.5,
    borderColor: "#FFECEC",
    marginVertical: windowHeight * 0.005,
    alignSelf: "center",
  },
  bottomContent: {
    // backgroundColor: "#f8f8",
    justifyContent: "center",
    alignContent: "center",
  },
  line: {
    borderWidth: 0.2,
    opacity: 0.4,
    borderColor: "black",
    // marginTop: windowHeight * 0.01,

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
