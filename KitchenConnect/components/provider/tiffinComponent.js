import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions'

const TiffinItem = ({ name, description, foodType, price, hours, mins, edit, showDelivery}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{foodType}</Text>
        <Text style={styles.text}>Ready Time: {hours}:{mins}</Text>
        <Text style={styles.price}>Per Person: {price}</Text>
      </View>
      <View style={styles.sideButtons}>
        <TouchableOpacity style={styles.editButton} onPress={edit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deliveryButton} onPress={showDelivery}>
          <Text style={styles.buttonText}>Delivery Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TiffinItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth * 0.95, // 90% of screen width
    height: windowHeight * 0.18, // Reduced height to 18% of screen height
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: windowWidth * 0.02, // Rounded corners
    backgroundColor: '#f8f8f8', // Background color for the container
    alignItems: 'center', // Center items vertically
    marginTop: windowWidth * 0.01
  },
  mainContent: {
    flex: 1, // Take remaining space
    padding: windowWidth * 0.02, // Padding inside the main content
  },
  name: {
    fontSize: windowWidth * 0.05, // Larger font size for name
    fontWeight: 'bold', // Bold font weight for name
    marginBottom: windowWidth * 0.01, // Space between text items
  },
  text: {
    fontSize: windowWidth * 0.04, // Font size relative to screen width
    marginBottom: windowWidth * 0.01, // Space between text items
  },
  price: {
    fontSize: windowWidth * 0.045, // Slightly larger font size for price
    fontWeight: 'bold', // Bold font weight for price
    color: '#d9534f', // Highlighted color for price
    marginBottom: windowWidth * 0.01, // Space between text items
  },
  sideButtons: {
    width: windowWidth * 0.25, // 25% of the container width
    justifyContent: 'center', // Center buttons vertically
    alignItems: 'center', // Center buttons horizontally
    marginRight: windowWidth *0.03,
    marginLeft: windowWidth *0.01,
    marginTop: windowHeight *0.005,
    marginTop: windowHeight *0.005,
  },
  editButton: {
    height: windowHeight * 0.07, // Reduced height to 8% of screen height
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 123, 255, 1)', // Blue color with transparency
    borderRadius: windowWidth * 0.02, // Rounded corners
    marginBottom: windowWidth * 0.01, // Margin below the button
  },
  deliveryButton: {
    height: windowHeight * 0.07, // Reduced height to 8% of screen height
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 166, 81, 1)', // Green color with transparency
    borderRadius: windowWidth * 0.02, // Rounded corners
    marginTop: windowWidth * 0.01, // Margin above the button
  },
  buttonText: {
    color: 'white',
    fontSize: windowWidth * 0.04, // Font size relative to screen width
    fontWeight: 'bold', // Bold font weight for button text
  },
});