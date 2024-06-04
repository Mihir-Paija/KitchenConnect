import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";

const ItemComponent = ({ name, quantity, unit }) => {
  return (
    <View style={styles.foodItem}>
      <View style={styles.foodContent}>
        <View style={styles.foodName}>
          <Text style={styles.foodNameText}>{name}</Text>
        </View>
        <View style={styles.foodQuantity}>
          <Text style={styles.foodQuantityText}>
            {quantity} {unit}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default ItemComponent;

const styles = StyleSheet.create({
  foodItem: {
    justifyContent: "space-between",
    marginBottom: windowWidth * 0.02,
  },
  foodContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth * 0.03,
    marginBottom: 8,

  },
  foodName: {
    backgroundColor: "rgba(255, 165, 0,0.5)",
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.015,
    width: windowWidth * 0.5,
    //border
    borderRadius: windowWidth * 0.02,
  },
  foodNameText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    textAlign: "center",
  },
  foodQuantity: {
    backgroundColor: "rgba(255, 165, 0,0.1)",
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.015,
    width: windowWidth * 0.3,
    borderRadius: windowWidth * 0.02,
  },
  foodQuantityText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    textAlign: "center",
    color: "#3c3636",
  },
  line: {
    borderTopWidth: 1,
    borderTopRadius: 1,
    borderColor: "#ffa500",
    borderStyle: "dashed",
  },
});
