import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, Alert, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import activeScreenStyles from '../../styles/shared/activeScreen';
import { AuthContext } from "@/context/authContext";
import { windowHeight, windowWidth } from '@/utils/dimensions'
import { getWallet, createWallet } from '../../utils/walletAPI';
import CreateWalletModal from '../shared/createWalletModal';
import LoadingScreen from '../shared/loadingScreen'
import WalletHeader from '../../components/provider/walletHeader';
import TransactionComponent from '../../components/provider/transactionComponent';

const DUMMY_DATA = [
  {
    _id: 'TXN001',
    amount: 150.00,
    payer: 'John Doe',
    date: new Date('2024-07-01'),
    tiffinName: 'Full Tiffin'
  },
  {
    _id: 'TXN002',
    amount: 120.00,
    payer: 'Jane Smith',
    date: new Date('2024-07-02'),
    tiffinName: 'Half Tiffin'
  },
  {
    _id: 'TXN003',
    amount: 300.00,
    payer: 'Mike Johnson',
    date: new Date('2024-07-03'),
    tiffinName: 'Deluxe Tiffin'
  },
  {
    _id: 'TXN004',
    amount: 500.00,
    payer: 'Sarah Brown',
    date: new Date('2024-07-01'),
    tiffinName: 'Full Tiffin'
  },
  {
    _id: 'TXN005',
    amount: 100.00,
    payer: 'Chris Lee',
    date: new Date('2024-07-02'),
    tiffinName: 'Half Tiffin'
  },
  {
    _id: 'TXN006',
    amount: 200.00,
    payer: 'Anna White',
    date: new Date('2024-07-03'),
    tiffinName: 'Deluxe Tiffin'
  }
]


const WalletScreen = ({ navigation }) => {

  const [authState, setAuthState] = useContext(AuthContext);
  const [isWallet, setIsWallet] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [screen, setScreen] = useState('Wallet')
  const [wallet, setWallet] = useState([])
  const [transactions, setTransactions] = useState(DUMMY_DATA)

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
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchWallet()
    //fetchTransactions()
  }, [, refresh])

  const toggleCreateModal = () => {
    setCreateModal(!createModal)
  }

  const handleCreate = async (details) => {
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
    } finally {
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
            <>
              <View>
                <WalletHeader
                  name={screen}
                  onPressWallet={() => setScreen('Wallet')}
                  onPressInsights={() => setScreen('Insights')}
                />
                <View style={styles.upperScreen}>
                  {screen === 'Wallet' ?
                    <View>
                      <Text style={{ fontSize: 20 }}>{wallet.firstName + ' ' + wallet.lastName}'s Wallet</Text>
                      <Text style={{ fontSize: 20 }}>Amount: ₹{wallet.amount}</Text>
                    </View>
                    :
                    <View>
                      <Text>Insights</Text>
                    </View>
                  }
                </View>
              </View>
              <View>
                <Text style={styles.header}>Transactions</Text>
                <FlatList
                  data={transactions}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <TransactionComponent{...item} />
                  )}
                  contentContainerStyle={styles.flatList}
                />
              </View>
            </>

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
                /> : null}
            </>
          }
        </>}
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
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
  upperScreen:{
    backgroundColor: '#FFFFFF',
    //paddingHorizontal: 5,
    paddingVertical: 12,
    marginBottom: 12,
    height: windowHeight * 0.35,
  },
  header: {
    textAlign: 'center',
    fontSize: windowHeight * 0.025,
    marginBottom: 8,
  },
  flatList: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

