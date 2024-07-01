import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, Alert, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import activeScreenStyles from '../../styles/shared/activeScreen';
import { AuthContext } from "@/context/authContext";
import { windowHeight, windowWidth } from '@/utils/dimensions'
import { getWallet, createWallet } from '../../utils/walletAPI';
import CreateWalletModal from '../shared/createWalletModal';
import LoadingScreen from '../shared/loadingScreen'
import HistoryComponent from '../../components/provider/historyComponent';

const DUMMY_DATA = [
  {
    _id: "667babbabe047a6f717c5c4d",
    title: 'Subscription',
    subscriberFirstName: 'John',
    subscriberLastName: 'Doe',
    tiffinName: 'Full Tiffin',
    day: 2,
    orderDate: "2024-06-13T13:15:00",
    orderTime: "12:00",
    noOfTiffins: 3,
    pricePerTiffin: 150,
    OTP: null,
    amountPaid: 0,
    kitchenPaymentBreakdown: {
      perOrderPrice: 300
    },
    transactionID: "Z339021GR9S"
  },
  {
    _id: "667babbabe047a6f717c5c3d",
    subscriberFirstName: 'John',
    subscriberLastName: 'Doe', 
    title: 'Subscription',
    tiffinName: 'Full Tiffin',
    day: 1,
    status: "Completed",
    orderDate: "2024-06-12T12:00:00",
    orderTime: "12:00",
    noOfTiffins: 3,
    pricePerTiffin: 150,
    OTP: "123456",
    kitchenPaymentBreakdown: {
      perOrderPrice: 300
    },
    transactionID: "A567723YU0P"
  },
  
  {
    _id: "667babbabe047a6f717c5c5d",
    title: 'One Time',
    customerName: 'Alex',
    tiffinName: 'Deluxe Tiffin',
    status: "",
    orderDate: "2024-06-11T13:00:00",
    orderTime: "12:00",
    noOfTiffins: 1,
    pricePerTiffin: 150,
    OTP: null,
    amountPaid: 0,
    kitchenPaymentBreakdown: {
      total: 150
    },
    transactionID: "D348229YE5T"
  },
];


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
    <SafeAreaView style={styles.container}>
      {loading ?
      <LoadingScreen />
      :
      <>
      <Text style ={styles.header}>History</Text>
      <FlatList 
      data ={DUMMY_DATA}
      renderItem={({item}) =>(
        <HistoryComponent {...item}/>
      )}
      contentContainerStyle={styles.flatList}
      />
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
  header:{
    textAlign: 'center',
    fontSize: windowHeight *0.04,
  },
  flatList: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30,
    borderBottomWidth: 1
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

