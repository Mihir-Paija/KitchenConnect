import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/FontAwesome5";

const UpButton = ({ onPress }) => {
  return (
    <Icon
      name="chevron-up"
      type="FontAwesome5"
      style={styles.upButton}
      onPress={onPress}
    />
  );
};

export default UpButton;

const styles = StyleSheet.create({
  upButton: {
    marginLeft: windowWidth * 0.01,
    fontSize: windowWidth * 0.05,
    color: "#3C3636",
    fontFamily: "NunitoLight",
  },
});
