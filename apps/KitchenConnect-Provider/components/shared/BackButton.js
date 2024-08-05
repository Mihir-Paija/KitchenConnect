import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { windowHeight, windowWidth } from "@/utils/dimensions";


const BackButtonComponent = ({ onPress, screenTitle }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon
        name="chevron-back-outline"
        type="ionicon"
        style={styles.backButton}
        onPress={onPress}
      />
      {screenTitle && <Text style={styles.screenTitleText}>{screenTitle}</Text>}
    </TouchableOpacity>
  );
};

export default BackButtonComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  backButton: {
    marginLeft: windowWidth * 0.01,
    fontSize: windowWidth * 0.07,
    color: "#3C3636",
    fontFamily: "NunitoLight",
  },
  screenTitleText: {
    color: "#3C3636",
    fontSize: windowWidth * 0.058,
    fontFamily: "NunitoBold",
    marginLeft: windowWidth * 0.02,
  },
});
