import React, {useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';

const OrdersScreen = ({navigation}) => {
  useEffect(() => {
    
    const backAction = () => {
      navigation.navigate("My Tiffins")

      return true
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      <Text>Orders Screen</Text>
    </SafeAreaView>
  );
};

export default OrdersScreen;