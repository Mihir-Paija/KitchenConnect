import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import { windowHeight, windowWidth } from "@/utils/dimensions";

const MenuItem = ({ label, icon, isActive, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Image
        source={isActive ? icon.active : icon.inactive}
        style={styles.icon}
      />
      <Text style={isActive ? styles.activeText : styles.inactiveText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menuItem: {
    alignItems: "center",
  },
  icon: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    marginBottom: 2,
    alignSelf: "center",
    justifyContent: "center",
  },
  activeText: {
    color: "#000",
  },
  inactiveText: {
    color: "#515151",
  },
});
