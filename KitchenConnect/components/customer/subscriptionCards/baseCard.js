import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const BaseCard = ({ providerName, tiffinName, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.providerName}>{providerName}</Text>
        <Text style={styles.tiffinName}>{tiffinName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BaseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  providerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tiffinName: {
    fontSize: 16,
  },
});
