import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList } from 'react-native';

const OrderComponent = ({tiffinName, noOfTiffins, customerName, delivery, address}) =>{
return (
    <View style={styles.container}>
      <Text style={styles.title}>{tiffinName} - {noOfTiffins} {noOfTiffins > 1 ? 'tiffins' :  'tiffin'}</Text>
      <Text>{customerName}</Text>
      {delivery ?
      <Text style={styles.address}>{address}</Text>
    : 
    <Text style={styles.address}>You Don't Provide Delivery</Text>}
    </View>
  );
};

export default OrderComponent

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#555',
  },
});