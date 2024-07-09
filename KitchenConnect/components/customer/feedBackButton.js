import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { windowWidth, windowHeight } from "@/utils/dimensions";

const FeedBackButton = ({ setFeedbackModalvisible }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.feedBackBox}
        onPress={() => setFeedbackModalvisible(true)}
      >
        <Icon
          name="edit"
          type="MaterialIcons"
          color={"#fff"}
          style={{ fontSize: windowWidth * 0.038 }}
        />
        <Text style={styles.feedBackTxt}> Write A Review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FeedBackButton;

const styles = StyleSheet.create({
  feedBackBox: {
    position: "absolute",
    justifyContent: "center",
    flexDirection: "row",
    padding: windowWidth * 0.03,
    backgroundColor: "#ffa500",
    borderRadius: windowWidth * 0.05,
    bottom: windowHeight * 0.03,
    right: windowWidth * 0.05,
  },
  feedBackTxt: {
    color: "#fff",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
  },
});
