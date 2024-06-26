import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import {windowHeight, windowWidth} from '@/utils/dimensions'

const OrderComponent = ({title, tiffinName, noOfTiffins, price, subscriberFirstName, subscriberLastName, wantDelivery, address, customerOut, providerOut, onPress}) =>{
  const dayCount = {
    Weekly: 7,
    Fortnightly: 15,
    Monthly: 30,
  }

  const [dayPrice, setDayPrice] = useState(0);

  useEffect(() => {
    const result = (price.tiffinPrice - price.discount) * noOfTiffins + price.deliveryCharge
    setDayPrice(Math.round(result *100) /100)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>
            {tiffinName} - {noOfTiffins} {noOfTiffins > 1 ? 'tiffins' : 'tiffin'}
          </Text>
          <Text>Customer: {subscriberFirstName + ' ' + subscriberLastName}</Text>
          <Text>Amount to be paid: ₹{dayPrice}</Text>
          {wantDelivery ? (
            <Text style={styles.address}>Deliver To: {address}</Text>
          ) : (
            <Text style={styles.address}>You Don't Provide Delivery</Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          {customerOut ? 
          <>
          <Text style={styles.out}>Customer Has</Text> 
          <Text style={styles.out}>Opted Out</Text> 
          </>
          : 
          providerOut ? 
          <>
          <Text style={styles.out}>You Have</Text> 
          <Text style={styles.out}>Opted Out</Text> 
          </>
          : 
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.btnText}>Generate</Text>
            <Text style={styles.btnText}>OTP</Text>
          </TouchableOpacity>}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    borderBottomWidth: 1
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    width: '100%',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#555',
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