import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";

const screenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const SubmitButton = ({ btnTitle, handleSubmitBtn, loading }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitBtn}>
      <Text style={styles.submitText}>
        {loading ? "Please Wait..." : btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#ffa500",
    height: ScreenHeight * 0.055,
    borderRadius: screenWidth * 0.1,
    justifyContent: "center",
    marginBottom: ScreenHeight * 0.02,
    marginTop: ScreenHeight * 0.02,
    width: screenWidth * 0.8,
    alignSelf: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: screenWidth * 0.055,
    fontFamily: "NunitoBold",
    textAlign: "center",
  },
});
