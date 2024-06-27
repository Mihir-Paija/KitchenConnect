import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, Alert, TouchableOpacity, StatusBar } from 'react-native';
import activeScreenStyles from '../../styles/shared/activeScreen';
import { AuthContext } from "@/context/authContext";
import { windowHeight, windowWidth } from '@/utils/dimensions'
import { getWallet, createWallet } from '../../utils/walletAPI';
import CreateWalletModal from '../shared/createWalletModal';
import LoadingScreen from '../shared/loadingScreen'


const WalletScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [isWallet, setIsWallet] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [wallet, setWallet] = useState([])

  const fetchWallet = async () => {
    try {
      setLoading(true)
      const response = await getWallet(authState.authToken)

      if (response && response.status === 200) {
        console.log(response.data)
        setIsWallet(response.data.wallet)
        setWallet(response.data)
      }

      else Alert.alert('An Error Occurred')
    } catch (error) {
      console.log('Error Fetching Wallet ', error)
      Alert.alert(error.message || 'An Error Occured')
    }finally{
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchWallet()
  }, [, refresh])

  const toggleCreateModal = () => {
    setCreateModal(!createModal)
  }

  const handleCreate = async(details) =>{
    try {
      toggleCreateModal()
      setLoading(true)
      console.log(details)
      const response = await createWallet(authState.authToken, details)

      if (response && response.status === 201) {
        Alert.alert('Wallet Created Successfully')
        setRefresh(!refresh)
      }

      else Alert.alert('An Error Occurred')
    } catch (error) {
      console.log('Error Fetching Wallet ', error)
      Alert.alert(error.message || 'An Error Occured')
    }finally{
      setLoading(false)
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
    <SafeAreaView style={styles.container}>
      {loading ?
      <LoadingScreen />
      :
      <>
      {isWallet ?
        <View>
          <Text style={{fontSize: 20}}>{wallet.firstName  + ' ' + wallet.lastName}'s Wallet</Text>
          <Text style={{fontSize: 20}}>Amount: ₹{wallet.amount}</Text>
        </View>
        :
        <>
        <View style={styles.btnView}>
          <TouchableOpacity onPress={toggleCreateModal} style={styles.btn}>
            <Text style={styles.btnText}>Create Wallet</Text>
          </TouchableOpacity>
        </View>
        {createModal ?
        <CreateWalletModal
        isVisible={createModal}
        onClose={toggleCreateModal}
        onCreate={handleCreate}
        type={authState.authType}
        />: null}
        </>
      }
      </>}
    </SafeAreaView>
  );
};

export default WalletScreen;

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

