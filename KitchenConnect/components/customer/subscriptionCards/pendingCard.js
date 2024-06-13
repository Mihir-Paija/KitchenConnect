import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BaseCard from "../../../components/customer/subscriptionCards/baseCard";

const PendingCard = ({ providerName, tiffinName, onPress, onWithdraw }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
    console.log();
    onPress(expanded);
  };

  return (
    <BaseCard
      providerName={providerName}
      tiffinName={tiffinName}
      onPress={handlePress}
    >
      {expanded && (
        <View style={styles.details}>
          {/* Display details specific to pending subscriptions */}
          <Text style={styles.detailText}>
            Subscription Name: Monthly Veg Thali
          </Text>
          <Text style={styles.detailText}>Start Date: 2024-06-13</Text>
          <Text style={styles.detailText}>End Date: 2024-07-12</Text>
          <TouchableOpacity style={styles.withdrawButton} onPress={onWithdraw}>
            <Text style={styles.withdrawText}>Withdraw Subscription</Text>
          </TouchableOpacity>
        </View>
      )}
    </BaseCard>
  );
};

export default PendingCard;

const styles = StyleSheet.create({
  details: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
  },
  withdrawButton: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  withdrawText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },
});
