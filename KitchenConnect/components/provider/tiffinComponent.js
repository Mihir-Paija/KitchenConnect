import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import FoodTypeIcon from '@/components/provider/foodTypeIcon'; // Adjust the import path accordingly
import RatingComponent from "../shared/ratingComponent";

const TiffinItem = ({ name, shortDescription, foodType, price, hours, mins, deactivated, rating, ratingSize, edit, showDelivery, onPress }) => {
  return (
    <TouchableOpacity style={!deactivated ? styles.container : styles.deactivatedContainer} onPress={onPress}>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.foodTypeIcon}>
            <FoodTypeIcon foodType={foodType} style={styles.icon} />
          </View>
          <View style={styles.mainContent}>
            {deactivated ? <Text style={styles.deactivatedText}>Tiffin is Deactivated</Text> : null}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{shortDescription}</Text>
          <View style={styles.readyTimeContainer}>
            <Text style={styles.readyTimeLabel}>Ready Time: </Text>
            <Text style={styles.readyTimeValue}>{hours}:{mins}</Text>
          </View>
          <Text style={styles.price}>Per Tiffin: ₹{price}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={require("@assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
          style={styles.photo}
        />
        <View style={styles.ratingContainer}>
          <RatingComponent rating={rating} size={ratingSize} />
        </View>
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
    marginHorizontal: windowWidth * 0.025,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: windowWidth * 0.02,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginVertical: windowWidth * 0.015,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: windowWidth * 0.02,
    position: 'relative', 
  },
  deactivatedContainer: {
    flexDirection: 'row',
    width: windowWidth * 0.95,
    height: windowHeight * 0.20,
    marginHorizontal: windowWidth * 0.025,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: windowWidth * 0.02,
    backgroundColor: '#A9A9A9',
    alignItems: 'center',
    marginVertical: windowWidth * 0.015,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: windowWidth * 0.02,
    position: 'relative', 
  },
  deactivatedText: {
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 2.5,
    margin: 0,
    padding: 0,
  },
  foodTypeIcon: {
    flex: 1,
    position: 'absolute',
    top: windowWidth * 0.0,
    left: windowWidth * 0.01,
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  mainContent: {
    flex: 4,
    paddingLeft: windowWidth * 0.12, 
  },
  nameContainer: {
    marginBottom: windowWidth * 0.01,
  },
  name: {
    fontSize: windowWidth * 0.055,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    paddingLeft: windowWidth * 0.03,
  },
  text: {
    fontSize: windowWidth * 0.04,
    color: '#555',
    marginBottom: windowWidth * 0.015,
  },
  readyTimeContainer: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.01,
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
    marginTop: windowHeight * 0.005,
    fontSize: windowHeight * 0.023,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: windowWidth * 0.005,
  },
  imageContainer: {
    flex: 1.5,
    alignItems: 'center',
    //justifyContent: 'center',
    marginHorizontal: windowWidth * 0.03,
    //alignSelf: 'center',
  },
  photo: {
    width: windowWidth * 0.35,
    height: windowHeight * 0.12,
    resizeMode: 'contain',
  },
  ratingContainer: {
    marginTop: windowHeight * 0.01,
    alignItems: 'center',
  },
});
