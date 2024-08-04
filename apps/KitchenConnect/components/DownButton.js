import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/FontAwesome5";

const DownButton = ({ onPress }) => {
  return (
    <Icon
      name="chevron-down"
      type="FontAwesome5"
      style={styles.downButton}
      onPress={onPress}
    />
  );
};

export default DownButton;

const styles = StyleSheet.create({
  downButton: {
    marginLeft: windowWidth * 0.01,
    fontSize: windowWidth * 0.06,
    color: "#3C3636",
    fontFamily: "NunitoLight",
  },
});
