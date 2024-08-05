import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionComponent = ({ _id, amount, payer, date, tiffinName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}><Text style={styles.label}>Transaction ID:</Text> {_id}</Text>
      <Text style={styles.text}><Text style={styles.label}>Payer:</Text> {payer}</Text>
      <Text style={styles.text}><Text style={styles.label}>Amount:</Text> ₹{amount.toFixed(2)}</Text>
      <Text style={styles.text}><Text style={styles.label}>Date:</Text> {date.toDateString()}</Text>
      <Text style={styles.text}><Text style={styles.label}>Tiffin Name:</Text> {tiffinName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default TransactionComponent;
