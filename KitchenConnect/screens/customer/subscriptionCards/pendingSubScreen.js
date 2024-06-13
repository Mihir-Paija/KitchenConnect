import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PendingSubScreen = ({ navigation, route }) => {
  const { subscription } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Subscription Details</Text>
      <Text style={styles.detailText}>
        Provider: {subscription.providerName}
      </Text>
      <Text style={styles.detailText}>Tiffin: {subscription.tiffinName}</Text>
      <Text style={styles.detailText}>
        Subscription: {subscription.subscriptionName}
      </Text>
      <Text style={styles.detailText}>
        Start Date: {subscription.startDate}
      </Text>
      <Text style={styles.detailText}>End Date: {subscription.endDate}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Withdraw subscription")}
      >
        <Text style={styles.buttonText}>Withdraw Subscription</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ff4d4d",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PendingSubScreen;
