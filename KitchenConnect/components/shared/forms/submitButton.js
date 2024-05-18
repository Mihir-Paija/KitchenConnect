import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";

import {windowWidth, windowHeight} from '@/utils/dimensions'

const SubmitButton = ({ btnTitle, handleSubmitBtn, loading, style }) => {
  return (
    <TouchableOpacity style={[styles.submitButton, style]} onPress={handleSubmitBtn}>
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
    borderRadius: windowWidth * 0.1,
    justifyContent: "center",
    marginBottom: windowHeight * 0.02,
    marginTop: windowHeight * 0.015,
    width: windowWidth * 0.75,
    height: windowHeight * 0.06,
    alignSelf: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: windowWidth * 0.055,
    fontFamily: "NunitoBold",
    textAlign: "center",
  },
});
