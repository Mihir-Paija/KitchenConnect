import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/FontAwesome5";

const RightButton = ({ onPress }) => {
  return (
    <Icon
      name="chevron-right"
      type="FontAwesome5"
      style={styles.downButton}
      onPress={onPress}
    />
  );
};

export default RightButton;

const styles = StyleSheet.create({
  downButton: {
    marginLeft: windowWidth * 0.01,
    fontSize: windowWidth * 0.05,
    color: "#3C3636",
    fontFamily: "NunitoLight",
    alignSelf: "center",
  },
});
