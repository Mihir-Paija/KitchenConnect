import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions'; 

const TiffinSubscription = ({ title, price, days}) => {
  
  return (
    <View style={styles.container}>
    
      <Text style={styles.name}>{title}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.price}>Price: ₹{price}</Text>
        <Text style={styles.days}>Days: {days}</Text>
      </View>
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity> 
   

    </View>
  );
};

export default TiffinSubscription;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: windowWidth * 0.04,
    paddingTop: windowWidth * 0.015,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: windowWidth * 0.01,
  },
  name: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: windowWidth * 0.03,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: windowWidth * 0.03,
  },
  price: {
    flex: 1,
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  days: {
    flex: 1,
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#FFA500',
    width: "100%",
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: windowWidth * 0.01,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
  },
});
