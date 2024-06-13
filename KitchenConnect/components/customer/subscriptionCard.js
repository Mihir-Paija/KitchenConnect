import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { windowWidth, windowHeight } from "@/utils/dimensions";

const SubscriptionCard = ({ navigation, subscription }) => {
  const navScreen = subscription.type + "SubScreen";
  const handlePress = () => {
    navigation.navigate(navScreen);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Text style={styles.providerName}>{subscription.providerName}</Text>
      <Text style={styles.tiffinName}>{subscription.tiffinName}</Text>
      <Text style={styles.subscriptionName}>
        {subscription.subscriptionName}
      </Text>
      <Text style={styles.detailText}>
        Number of Tiffins: {subscription.numberOfTiffins}
      </Text>
      <Text style={styles.detailText}>Status: {subscription.status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.9,
    padding: windowWidth * 0.03,
    marginVertical: windowHeight * 0.01,
    backgroundColor: "#ffff",
    borderRadius: 10,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation property for Android
    elevation: 2,
  },
  providerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tiffinName: {
    fontSize: 16,
    color: "#555",
  },
  subscriptionName: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
  },
});

export default SubscriptionCard;
