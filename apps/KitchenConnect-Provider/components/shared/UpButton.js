import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { windowHeight, windowWidth } from "@/utils/dimensions";


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
    fontSize: windowWidth * 0.06,
    color: "#3C3636",
    fontFamily: "NunitoLight",
  },
});
