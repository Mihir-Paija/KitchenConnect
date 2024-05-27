import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/Ionicons";

const BackButtonComponent = ({ onPress }) => {
  return (
    <Icon
      name="chevron-back-outline"
      type="ionicon"
      style={styles.backButton}
      onPress={onPress}
    />
  );
};

export default BackButtonComponent;

const styles = StyleSheet.create({
  backButton: {
    marginLeft: windowWidth * 0.01,
    fontSize: windowWidth * 0.07,
    color: "#3C3636",
    fontFamily: "NunitoLight",
  },
});
