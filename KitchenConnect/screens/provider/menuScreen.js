import React, {useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, BackHandler } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';


const MenuScreen = () => {
    useEffect(() => {
        const backAction = () => {
          Alert.alert(
            "Exit!",
            "Are You Sure You Want To Exit?",
            [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel",
              },
              { text: "Exit", onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          );
          return true;
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