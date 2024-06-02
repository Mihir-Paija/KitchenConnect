import React, {useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';

const MenuScreen = ({navigation}) => {
  useEffect(() => {
    
    const backAction = () => {
      navigation.navigate("Menu")

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
      <Text>Menu Screen</Text>
    </SafeAreaView>
  );
};

export default MenuScreen;