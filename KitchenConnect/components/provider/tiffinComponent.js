import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';

const TiffinItem = ({ name, description, foodType, price, hours, mins, edit, showDelivery, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.mainContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{foodType}</Text>
        <View style={styles.readyTimeContainer}>
          <Text style={styles.readyTimeLabel}>Ready Time: </Text>
          <Text style={styles.readyTimeValue}>{hours}:{mins}</Text>
        </View>
        <Text style={styles.price}>Per Tiffin: {price}</Text>
      </View>
      <View style={styles.sideButtons}>
        <TouchableOpacity style={styles.editButton} onPress={edit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deliveryButton} onPress={showDelivery}>
          <Text style={styles.buttonText}>Delivery</Text>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default TiffinItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth * 0.95,
    height: windowHeight * 0.18,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: windowWidth * 0.02,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginVertical: windowWidth * 0.015,
    padding: windowWidth * 0.02,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: windowWidth * 0.02,
  },
  mainContent: {
    flex: 1,
    padding: windowWidth * 0.02,
  },
  name: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: windowWidth * 0.01,
  },
  text: {
    fontSize: windowWidth * 0.04,
    color: '#555',
    marginBottom: windowWidth * 0.01,
  },
  readyTimeContainer: {
    flexDirection: 'row',
    marginBottom: windowWidth * 0.01,
  },
  readyTimeLabel: {
    fontSize: windowWidth * 0.04,
    color: '#555',
    fontWeight: 'bold',
  },
  readyTimeValue: {
    fontSize: windowWidth * 0.038,
    color: '#555',
  },
  price: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: windowWidth * 0.01,
  },
  sideButtons: {
    width: windowWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: windowWidth * 0.02,
  },
  editButton: {
    height: windowHeight * 0.07,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: windowWidth * 0.02,
    marginBottom: windowWidth * 0.01,
  },
  deliveryButton: {
    height: windowHeight * 0.07,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 166, 81, 1)',
    borderRadius: windowWidth * 0.02,
    marginTop: windowWidth * 0.01,
  },
  buttonText: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
});
