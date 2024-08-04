import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import { windowWidth, windowHeight } from "@utils/dimensions";
import RatingComponent from "./ratingComponent";

const HeaderTiffinCustomer = ({ kitchen }) => {
  // console.log("kitchen", kitchen);

  return (
    <SafeAreaView style={styles.tiffinHeader}>
      <Text style={styles.kitchenName}>{kitchen.kitchenName}</Text>
      <Text style={styles.shortDescription}>{kitchen.shortDescription}</Text>
      <View style={styles.ratingBox}>
        <RatingComponent
          rating={kitchen.rating}
          ratingsize={kitchen.ratingsize ? kitchen.ratingsize : null}
          kitchenID={kitchen._id}
        />
      </View>
      <Text style={styles.address}>
        {kitchen.address.flatNumber}, {kitchen.address.street},{" "}
        {kitchen.address.landmark}
      </Text>
      <View style={styles.line}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tiffinHeader: {
    // backgroundColor: "#ffaa",
  },
  kitchenName: {
    textAlign: "center",
    fontSize: windowWidth * 0.08,
    fontFamily: "NunitoBold",
    marginBottom: windowWidth * 0.03,
  },
  shortDescription: {
    textAlign: "center",
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoRegular",
    marginVertical: windowWidth * 0.02,
    color: "#3c3636",
  },
  ratingBox: {
    marginVertical: windowWidth * 0.02,
  },
  address: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginVertical: windowWidth * 0.02,
    color: "#3c3636",
  },
  line: {
    borderWidth: 0.2,
    opacity: 0.4,
    borderColor: "black",
    marginVertical: windowWidth * 0.03,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 4,
    // Android shadow (elevation)
    elevation: 5,
  },
});

export default HeaderTiffinCustomer;
