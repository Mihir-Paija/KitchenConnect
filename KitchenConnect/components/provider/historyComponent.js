import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import {windowHeight, windowWidth} from '@/utils/dimensions'
import { formatDate, formatTime } from '../../utils/formateDateTime';

const OrderComponent = ({title, tiffinName, customerName, noOfTiffins, price, subscriberFirstName, subscriberLastName, wantDelivery, address, customerOut, providerOut, kitchenPaymentBreakdown, orderDate, onPress}) =>{
  const dayCount = {
    Weekly: 7,
    Fortnightly: 15,
    Monthly: 30,
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.header}>
            {tiffinName} - {noOfTiffins} {noOfTiffins > 1 ? 'tiffins' : 'tiffin'}
          </Text>
          <Text style={styles.title}>{title}</Text>
          {title == 'Subscription' ?
          <>
          <Text style={styles.customer}>Customer: {subscriberFirstName + ' ' + subscriberLastName}</Text>
          <Text style={styles.amount}>Amount: ₹{kitchenPaymentBreakdown.perOrderPrice}</Text>
          </> :
          <>
          <Text style={styles.customer}>Customer: {customerName}</Text>
          <Text style={styles.amount}>Amount: ₹{kitchenPaymentBreakdown.total}</Text>
          </>}
          <Text>Delivered On: {formatDate(orderDate)} at {formatTime(orderDate)}</Text>
        </View>
      </View>
    </View>
  );
}

export default OrderComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    borderBottomWidth: 1
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    //width: '100%',
    marginBottom: 20,
  },
  leftContainer: {
    flex: 1.5,
    height: '100%',
  },
  rightContainer: {
    flex: 1,
    height: '100%', 
    justifyContent: 'center', 
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title:{
    fontSize: windowHeight * 0.02,
  },
  customer:{
    marginTop: windowHeight * 0.01,
    fontSize: windowHeight * 0.02, 
  },
  amount:{
    fontSize: windowHeight * 0.018, 
  },
  address: {
    marginTop: windowHeight * 0.01,
    fontSize: windowHeight * 0.015, 
  },
  button: {
    backgroundColor: '#4DAF7C', 
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
    width: '70%',
    height: windowHeight * 0.09,
    justifyContent: 'center',
  },
  btnText:{
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  out:{
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
});