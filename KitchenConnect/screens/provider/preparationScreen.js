import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList, Alert, Touchable } from 'react-native';
import { AuthContext } from "@/context/authContext";
import OrderHeader from '@/components/provider/orderHeader';
import OrderComponent from '@/components/provider/orderComponent';
import OrderCard from '@/components/provider/orderCard';
import { getOrders, optOut, sendOTP, completeOrder } from '../../utils/provider/orderAPI';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowWidth, windowHeight } from '@/utils/dimensions'
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPModal from './modals/OTPModal';
import LoadingScreen from '../shared/loadingScreen'
import Icon from "react-native-vector-icons/Ionicons";

const PreparationScreen = ({ navigation }) => {
  const [authState] = useContext(AuthContext)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [optVisible, setOptVisible] = useState(false)
  const [order, setOrder] = useState([])

  const [type, setType] = useState('Lunch')
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await getOrders(authState.authToken)
      console.log(response)

      setLunch(response.lunch)
      setDinner(response.dinner)

    } catch (error) {
      console.log('Error in Fetching Orders ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [, refresh])

  const generateOTP = async (item) => {
    const OTP = Math.floor(Math.random() * 9000) + 1000
    console.log(OTP)

    try {
      await AsyncStorage.setItem("@otp", OTP.toString());
      setOrder(item)
      const bodyData = {
        otp: OTP,
        order: item
      }
      const response = await sendOTP(authState.authToken, bodyData)
      if(response && response.status === 200){
        setModalVisible(true)
      }
      else{
        Alert.alert(`Couldn't Generate OTP! Please Try Again`)
      }

    } catch (error) {
      console.log('Error Generating OTP ', error)
      Alert.alert(`Couldn't Generate OTP! Please Try Again`)
    }
  }

  const verifyOTP = async (otp, order) => {
    try {
      setLoading(true)
      setModalVisible(false)
      const storedOTP = await AsyncStorage.getItem("@otp")
      if (otp === storedOTP){
        const response = await completeOrder(authState.authToken, order)
        if(response && response.status == 200){
          await AsyncStorage.removeItem("@otp");
          Alert.alert(`Order Completed`)
        }

        else Alert.alert(`Couldn't Complete Order! Please Try Again`)
      }

      else Alert.alert('Incorrect OTP')
    } catch (error) {
      console.log('Error Generating OTP ', error)
      Alert.alert(`Couldn't Verify OTP! Please Try Again`)
    }finally{
      setLoading(false)
      setRefresh(!refresh)
    }

  }

  const toggleOpt = () =>{
    setOptVisible(!optVisible)
  }

  const handleOut = async (type) => {
    try {
      const bodyData = {
        orders: type === 'Lunch' ? lunch : dinner,
        type
      }

      const response = await optOut(authState.authToken, bodyData)

      if (response && response.status === 200) {
        Alert.alert(`Opted Out of ${type} Orders`)
      }

      else {
        Alert.alert(`Couldn't Opt Out`)
      }

    } catch (error) {
      console.log('Error in Opting Out Screen ', error)
      console.log(error.message || 'An Error Occured')
    }
  }

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
    <SafeAreaView style={styles.screen}>
      <OrderHeader
        name={type}
        onPressLunch={() => setType('Lunch')}
        onPressDinner={() => setType('Dinner')}
      />
      {loading ?
        <LoadingScreen />
        :
        <>
          {type === 'Lunch' ?
            <>
              {lunch.length !== 0 ?
                <>
                  <FlatList
                    data={lunch}
                    renderItem={({ item }) => (
                      <OrderCard {...item}
                        onPress={generateOTP} />
                    )}
                    contentContainerStyle={styles.flatList}
                  />
                  {optVisible ?
                  <View style={styles.btnView}>
                    <TouchableOpacity onPress={() => handleOut('Lunch')} style={styles.btn}>
                      <Text style={styles.btnText}>Opt Out</Text>
                      <Text style={styles.btnText}>For Lunch</Text>
                    </TouchableOpacity>
                  </View>
                  : null}
                </>
                :
                <View style={styles.emptyView}>
                  <Text>No Lunch Deliveries Today</Text>
                </View>
              }
            </>
            : null}
          {type === 'Dinner' ?
            <>
              {dinner.length !== 0 ?
                <>
                  <FlatList
                    data={dinner}
                    renderItem={({ item }) => (
                      <OrderCard {...item} />
                    )}
                    contentContainerStyle={styles.flatList}
                  />
                  {optVisible?
                  <View style={styles.btnView}>
                    <TouchableOpacity onPress={() => handleOut('Dinner')} style={styles.btn}>
                      <Text style={styles.btnText}>Opt Out</Text>
                      <Text style={styles.btnText}>For Dinner</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  null}
                </>
                :
                <View style={styles.emptyView}>
                  <Text>No Dinner Deliveries Today</Text>
                </View>
              }
            </>
            : null}
            {optVisible ?
            <Icon
            name="close"
            type="ionicon"
            style={styles.settings}
            onPress={toggleOpt}
          />
            :
            <Icon
                name="settings-outline"
                type="ionicon"
                style={styles.settings}
                onPress={toggleOpt}
              />
}
          {modalVisible ?
            <OTPModal
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              order={order}
              onVerify={verifyOTP} />
            : null}
        </>
      }
    </SafeAreaView>
  );
};

export default PreparationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // paddingTop: StatusBar.currentHeight * 1.2

  },
  flatList: {
    alignItems: 'center',
    marginTop: 12,
    paddingBottom: 20,
  },
  view: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center'
  },
  settings:{
    position: 'absolute',
    right: windowWidth * 0.07,
    bottom: windowHeight * 0.05,
    fontSize: windowHeight * 0.04,
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: windowHeight * 0.03,
  },
  btn: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.3,
    backgroundColor: 'red',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15
  },
  btnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  emptyView: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
  }
})