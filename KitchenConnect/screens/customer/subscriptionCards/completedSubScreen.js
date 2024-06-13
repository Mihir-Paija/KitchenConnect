import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CompletedSubScreen = ({ route }) => {
  const { subscription } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Subscription Details</Text>
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
      <Text style={styles.detailText}>
        Days Completed: {subscription.daysCompleted}
      </Text>
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
});

export default CompletedSubScreen;
