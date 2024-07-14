import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform } from 'react-native';
import {windowHeight, windowWidth} from '@/utils/dimensions'
import { formatDate, formatTime } from '../../utils/formateDateTime';

const HistoryComponent = ({title, tiffinName, tiffinType, customerName, noOfTiffins, amountReceived, createdAt}) =>{
  const dayCount = {
    Weekly: 7,
    Fortnightly: 15,
    Monthly: 30,
  }

  return (
    <View style={[styles.container, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}>
          <Text style={styles.header}>
            {tiffinName}({tiffinType}) - {noOfTiffins} {noOfTiffins > 1 ? 'tiffins' : 'tiffin'}
          </Text>
          <Text style={styles.title}>{title}</Text>
          
          <Text style={styles.customer}>Customer: {customerName}</Text>
          <Text style={styles.amount}>Amount: ₹{amountReceived}</Text>
          <Text style={styles.delivery}>Delivered On: {formatDate(createdAt)} at {formatTime(createdAt)}</Text>
          
    </View>
  );
}

export default HistoryComponent

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    paddingBottom: 2,
    justifyContent: 'center',
    backgroundColor: '#fff', 
    //borderBottomWidth: 1,
    marginTop: windowHeight * 0.007,
    marginBottom: windowHeight *0.002,
   // marginHorizontal: windowWidth * 0.03,
    borderRadius: windowWidth * 0.03,
    padding: windowWidth * 0.02,
    width: windowWidth * 0.95,

  },
  androidShadow: {
    elevation: 5,
},

iosShadow: {
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  delivery:{
    marginTop: windowHeight*0.01,
    fontSize: windowHeight *0.02,
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