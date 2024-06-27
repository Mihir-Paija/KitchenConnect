import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, Alert, TouchableOpacity, StatusBar } from 'react-native';
import activeScreenStyles from '../../styles/shared/activeScreen';
import { AuthContext } from "@/context/authContext";
import { windowHeight, windowWidth } from '@/utils/dimensions'
import { getWallet, createWallet } from '../../utils/walletAPI';
import CreateWalletModal from '../shared/createWalletModal';
import LoadingScreen from '../shared/loadingScreen'


const HistoryScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)


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
      {loading ?
      <LoadingScreen />
      :
      <>
      <Text>History Screen</Text>
      </>}
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: StatusBar.currentHeight * 1.2,
  },
  btnView: {
    position: 'absolute',
    right: windowWidth * 0.33,
    bottom: windowHeight * 0.05,
  },
  btn: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.34,
    backgroundColor: '#4DAF7C',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  btnText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

