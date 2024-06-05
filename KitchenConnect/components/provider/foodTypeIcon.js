import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';

const foodTypeImages = {
  Veg: require('@/assets/foodType/Veg_Icon.png'),
  'Non-Veg': require('@/assets/foodType/Non_Veg_Icon.png'),
  Vegan: require('@/assets/foodType/vegan.png'),
  Swaminarayan: require('@/assets/foodType/swaminarayan.png'),
  Jain: require('@/assets/foodType/Jain.png'),
};

const FoodTypeIcon = ({ foodType }) => {
  return (
    <Image
      source={foodTypeImages[foodType]}
      style={styles.image}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: windowWidth *0.04, 
    height: windowHeight *0.04, 
  },
});

export default FoodTypeIcon;
