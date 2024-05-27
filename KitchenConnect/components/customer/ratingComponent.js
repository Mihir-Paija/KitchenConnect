import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const RatingComponent = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{rating}</Text>
      <Icon
        name="star"
        type="material"
        color="#ffff"
        size={windowWidth * 0.045}
      />
    </View>
  );
};

export default RatingComponent;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#ffa500",
    paddingHorizontal: windowWidth * 0.015,
    paddingVertical: windowHeight * 0.002,
    //border
    borderRadius: windowWidth * 0.02,
  },
  ratingText: {
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoSemiBold",
    textAlign: "center",
    color: "#fff",
    marginRight: windowWidth * 0.015,
  },
});
