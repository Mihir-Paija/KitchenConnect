import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useContext } from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Touchable } from "react-native";
import { AuthContext } from "@/context/authContext";
import ReviewModalCustomer from "./reviewModalCustomer";

const RatingComponent = ({ rating, ratingsize, kitchenID, tiffinID }) => {
  // console.log(ratingsize);

  const [authState, setAuthState] = useContext(AuthContext);

  //states
  const [loading, setLoading] = useState(true);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  return (
    <View style={styles.Box}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
        <Icon
          name="star"
          type="material"
          color="#ffff"
          size={windowWidth * 0.045}
        />
      </View>
      {ratingsize && ratingsize > 0 && (
        <TouchableOpacity
          onPress={() => setReviewModalVisible(true)}
          style={{ justifyContent: "center", marginLeft: windowWidth * 0.02 }}
        >
          <Text style={styles.reviewText}>{ratingsize} reviews</Text>
        </TouchableOpacity>
      )}
      {reviewModalVisible && (
        <ReviewModalCustomer
          visible={reviewModalVisible}
          onClose={() => setReviewModalVisible(false)}
          kitchenID={kitchenID}
          tiffinID={tiffinID ? tiffinID : null}
        />
      )}
    </View>
  );
};

export default RatingComponent;

const styles = StyleSheet.create({
  Box: {
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#aaff",
  },
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
  reviewText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    textAlign: "center",
    // color: "#ffa500",
    marginRight: windowWidth * 0.015,
    borderBottomWidth: 1,
  },
});
