import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, BackHandler, TouchableOpacity } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import MenuTabNavigator from '@/navigations/provider/providerMenuNavigator';
import {windowWidth, windowHeight} from '@/utils/dimensions'


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
      });

  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      <View style = {styles.providerInfo}>
        <Text>Provider Name</Text>
        <Text>Short Description</Text>
        <View style = {styles.rating}>
          <Text>Stars</Text>
          <Text>Rating</Text>
        </View>
        <View style = {styles.delivery}>
          <Text>Delivery Charges</Text>
          <Text>Edit</Text>
        </View>
      </View>
        <View style={styles.menuTabs}>
          <MenuTabNavigator />
        </View>
      <View style = {styles.btnView}>
        <TouchableOpacity style ={styles.btn}>
          <Text style = {styles.addMenuText}>Add Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  providerInfo: {
    alignItems: "center",
    marginBottom: windowHeight *0.03
  },

  rating:{
    flexDirection: 'row',
    justifyContent: "space-around",
  },

  delivery:{
    flexDirection: 'row',
    justifyContent: "space-around",
  },

  menuTabs:{
    height: windowHeight*0.70,
    flexDirection: "row",
  },

  btnView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowHeight * 0.017,
    marginBottom: windowHeight * 0.025,
  }, 

  btn:{
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight * 0.055,
    borderRadius: 15
  },

  addMenuText:{
    padding: 7,
    color: "#FFFFFF",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoBold",
  }

})