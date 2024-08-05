import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { windowWidth, windowHeight } from '@/utils/dimensions'; 

const TiffinSubscription = ({ title, price, deliveryCharge, discount, days, description, onEdit}) => {
  return (
    <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.name}>{title}</Text>
      <Icon
        name='pencil-outline'
        style={styles.createButton}
        onPress={onEdit}/>
        </View>
      <Text>{description}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.price}>Price: ₹{(parseInt(price, 10) - parseInt(discount, 10) + parseInt(deliveryCharge, 10)) * parseInt(days, 10)}</Text>
        <Text style={styles.days}>Days: {days}</Text>
      </View>
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
    paddingBottom: windowWidth * 0.015,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: windowWidth * 0.015,
  },
  headerContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: windowWidth * 0.005,
  },
  name: {
    fontSize: windowHeight * 0.03,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  createButton: {
    position: 'absolute',
    right: windowWidth * 0.01,
    top: windowHeight *0.010,
    color: '#FFA500',
    fontSize: windowHeight * 0.028,
  },
  infoContainer: {
    marginTop: windowHeight *0.02,
    flexDirection: 'row',
    marginBottom: windowWidth * 0.01,
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

  buttonText: {
    color: 'white',
    fontSize: windowHeight * 0.020,
    fontWeight: 'bold',
  },
});
