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
import LegendComponent from '@/components/provider/legendComponent'
import LineGraph from '@/components/provider/lineGraph'
import RNPickerSelect from "react-native-picker-select";
import WalletDetailsScreen from '../shared/walletDetailsScreen';
import { withdrawMoney } from '../../utils/provider/walletAPI';
import WalletComponent from '../../components/provider/walletComponent';
import WithdrawModal from './modals/withdrawModal';

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
    date: new Date('2024-06-01'),
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

const weekMap = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat'
};


const monthMap = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const monthDivision = ['1-5', '6-10', '11-15', '16-20', '21-25', '26-']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let dateSet = new Set()
let dateIndexMap = new Map();
let colorMap = new Map()
let tiffinNameValueMap = new Map()



const WalletScreen = ({ navigation }) => {

  const [authState, setAuthState] = useContext(AuthContext);
  const [isWallet, setIsWallet] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [screen, setScreen] = useState('Wallet')
  const [wallet, setWallet] = useState([])
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [transactions, setTransactions] = useState(DUMMY_DATA)

  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: []
  })
  const [scroll, setScroll] = useState(false)
  const [tiffinName, setTiffinName] = useState('Total')
  const [tiffinNameOptions, setTiffinNameOptions] = useState([{ label: 'Total', value: 'Total' }])

  const [duration, setDuration] = useState({ label: 'Last 7 days', value: 'Last 7' });
  const [durationOptions, setDurationOptions] = useState([
    { label: 'Last 7 days', value: 'Last 7' },
    { label: 'Last 14 days', value: 'Last 14' },
  ])

  const [durationToggle, setDurationToggle] = useState(false)
  const [durationSize, setDurationSize] = useState(7);
  //const [graphLabel, setGraphLabel] = useState([])
  const [originalColors, setOriginalColors] = useState([
    `rgba(255, 195, 0, 1)`,     // Vivid Yellow
    `rgba(199, 0, 57, 1)`,      // Vivid Red
    `rgba(144, 12, 63, 1)`,     // Vivid Burgundy
    `rgba(88, 24, 69, 1)`,      // Vivid Purple
    `rgba(30, 132, 73, 1)`,     // Vivid Green
    `rgba(52, 152, 219, 1)`,    // Vivid Blue
    `rgba(155, 89, 182, 1)`,    // Vivid Violet
    `rgba(243, 156, 18, 1)`,    // Vivid Orange Yellow
    `rgba(39, 174, 96, 1)`,     // Vivid Green Cyan
    `rgba(231, 76, 60, 1)`,     // Vivid Red Pink
    `rgba(255, 105, 180, 1)`,   // Hot Pink
    `rgba(0, 128, 128, 1)`,     // Teal
    `rgba(0, 255, 127, 1)`,     // Spring Green
    `rgba(75, 0, 130, 1)`,      // Indigo
    `rgba(240, 128, 128, 1)`,   // Light Coral
    `rgba(0, 191, 255, 1)`,     // Deep Sky Blue
    `rgba(218, 112, 214, 1)`,   // Orchid
    `rgba(124, 252, 0, 1)`,     // Lawn Green
    `rgba(139, 0, 139, 1)`,     // Dark Magenta
    `rgba(0, 206, 209, 1)`,     // Dark Turquoise
  ])
  const [legendMap, setLegendMap] = useState(new Map(colorMap))


  const [originalOrders, setOriginalOrders] = useState([])

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

  const toggleWithdrawModal = () =>{
    setWithdrawModal(!withdrawModal)
  }

  const finalWithdraw = async(amount, PIN) =>{
    try {
    console.log(amount)
    console.log(PIN)
    console.log(wallet.walletID)
      const bodyData = {
        amount,
        PIN,
      }

      const response = await withdrawMoney(authState.authToken, wallet.walletID, bodyData)
      if(response && response.status === 200){
        toggleWithdrawModal()
        Alert.alert(`Withdraw Successfull`)
        setRefresh(!refresh)
        return
      }

      Alert.alert(`Couldn't Withdraw Money`)


    } catch (error) {
      console.log('Error In Withdrawing Money ', error)
      Alert.alert(error.message || `An Error Occured`)
    }

  }

  const createDuration = () => {
    const currentMonth = new Date().getMonth()
    let currentYear = new Date().getFullYear()
    let currentYearString = currentYear.toString();
    const arr = [
      { label: 'Last 7 days', value: 'Last 7' },
      { label: 'Last 14 days', value: 'Last 14' },
    ]

    let flag = 0;

    for (let i = 0; i < 6; ++i) {
      let toAddMonth = currentMonth - i;
      if (!flag && toAddMonth < 0) {
        currentYear = currentYear - 1;
        currentYearString = currentYear.toString();
        flag = 1;
      }

      const monthName = monthMap[toAddMonth % 12];
      const date = new Date(currentYear, toAddMonth % 12, 15);

      arr.push({ label: monthName + ' ' + currentYearString, value: date })
      setDurationOptions(durationOptions)

    }

    arr.push({ label: 'This Year', value: flag ? currentYear + 1 : currentYear })
    setDurationOptions(arr);
  }

  const handleDuration = () => {
    setTiffinName('Total')
    setOriginalOrders([])
    const graphLabels = [];
    dateSet.clear();
    dateIndexMap.clear();

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (duration.label === 'Last 7 days') {

      const currentDate = new Date(today);

      for (let i = 6; i >= 0; --i) {
        const dayName = currentDate.getDay();
        //console.log(dayName)
        graphLabels.unshift(weekMap[dayName]);
        const currentDateString = currentDate.toISOString()
        dateSet.add(currentDateString);
        dateIndexMap.set(currentDateString, i);
        currentDate.setDate(currentDate.getDate() - 1);
      }

      setDurationSize(7)
      setScroll(false)
      console.log(graphLabels)
      setGraphData({ ...graphData, labels: graphLabels })
    }

    else if (duration.label === 'Last 14 days') {

      const currentDate = new Date(today);

      for (let i = 13; i >= 0; --i) {
        const dayName = currentDate.getDay();
        //console.log(dayName)
        graphLabels.unshift(weekMap[dayName]);
        const currentDateString = currentDate.toISOString()
        dateSet.add(currentDateString);
        dateIndexMap.set(currentDateString, i);
        currentDate.setDate(currentDate.getDate() - 1);
      }

      setDurationSize(14)
      setGraphData({ ...graphData, labels: graphLabels })
      setScroll(true)
    }

    else if (duration.label === 'This Year') {
      for (let i = 0; i < 12; ++i) {
        dateSet.add(i);
        dateIndexMap.set(i, i);
      }
      setDurationSize(12)
      setGraphData({ ...graphData, labels: months })
      setScroll(true)
    }
    else {
      for (let i = 1; i <= 26; i = i + 5) {
        dateSet.add(i);
        dateIndexMap.set(i, i / 5)
      }
      if (durationSize === 6)
        setDurationToggle(!durationToggle)
      else {
        setDurationSize(6)
      }
      setGraphData({ ...graphData, labels: monthDivision })
    }

    console.log(dateSet)
    console.log(dateIndexMap)
  }

  const handleInitialRecords = () => {

    if (!durationSize)
      return;

    const initialRecords = []
    const tiffinNameSet = new Set();
    tiffinNameSet.add('Total')
    let colors = [...originalColors]
    colorMap.clear();
    colorMap.set('Total', '#FFA500')

    for (const value of transactions) {

      const orderDate = new Date(value.date)
      orderDate.setHours(0, 0, 0, 0)
      orderDateString = orderDate.toISOString()

      if (duration.label === 'Last 7 days' || duration.label === 'Last 14 days') {
        if (dateSet.has(orderDateString)) {
          addToSet(tiffinNameSet, value, initialRecords, colors, colorMap)
        }
      }
      else if (duration.label === 'This Year') {
        const orderYear = orderDate.getFullYear()
        const currentYear = duration.value

        if (orderYear === currentYear)
          addToSet(tiffinNameSet, value, initialRecords, colors, colorMap)
      }
      else {
        const orderYear = orderDate.getFullYear()
        const orderMonth = orderDate.getMonth()
        const currentYear = new Date(duration.value).getFullYear()
        const currentMonth = new Date(duration.value).getMonth()

        if (currentMonth === orderMonth && currentYear === orderYear)
          addToSet(tiffinNameSet, value, initialRecords, colors, colorMap)

      }
    }

    setOriginalOrders(initialRecords)

    const tiffinNameOptionsArray = []
    tiffinNameValueMap.clear()
    for (const value of tiffinNameSet) {
      tiffinNameOptionsArray.push({ label: value, value: value })
      tiffinNameValueMap.set(value, new Array(durationSize).fill(0))
    }

    setTiffinNameOptions(tiffinNameOptionsArray)

    fillBins(tiffinNameValueMap, initialRecords, true)
    handleGraphData(tiffinNameValueMap, colorMap)

  }

  const handleRecords = () => {

    if (tiffinName === 'Total') {
      const finalData = {
        datasets: []
      }

      for (const [key, value] of tiffinNameValueMap) {
        console.log(key)
        console.log(value)
        console.log(colorMap.get(key))
        const singleData = {
          data: value,
          color: (opacity = 1) => colorMap.get(key),
          strokeWidth: 1,
        }
        finalData.datasets.push(singleData);
      }

      console.log(finalData.datasets.length)

      setGraphData({
        ...graphData,
        datasets: finalData.datasets
      });


      setLegendMap(colorMap)

      return;
    }

    else {
      const finalData = {
        datasets: []
      }

      for (const [key, value] of tiffinNameValueMap) {
        console.log(key)
        console.log(value)
        console.log(colorMap.get(key))

        if (key === tiffinName) {
          const singleData = {
            data: value,
            color: (opacity = 1) => colorMap.get(key),
            strokeWidth: 1,
          }
          finalData.datasets.push(singleData);
        }
      }

      console.log(finalData.datasets.length)

      setGraphData({
        ...graphData,
        datasets: finalData.datasets
      });

      setLegendMap(colorMap)

    }

  }

  const addToSet = (set, value, initialRecords, colors, map) => {
    set.add(value.tiffinName)
    const randomIndex = Math.floor(Math.random() * colors.length);
    map.set(value.tiffinName, colors[randomIndex]);
    const setColor = colors[randomIndex]
    colors = colors.filter(item => item !== setColor)
    initialRecords.push(value);
  }

  const addQuantity = (map, value, index, flag) => {

    if (flag) {
      let totalQuantity = map.get('Total')
      totalQuantity[index] += value.amount;
      map.set('Total', totalQuantity);
    }
    let quantity = map.get(value.tiffinName)

    quantity[index] += value.amount;

    map.set(value.tiffinName, quantity);

  }

  const fillBins = (map, orders, flag) => {
    for (const value of orders) {
      const date = new Date(value.date);
      date.setHours(0, 0, 0, 0)

      if (duration.label === 'Last 7 days' || duration.label === 'Last 14 days') {
        dateString = date.toISOString()
        const index = dateIndexMap.get(dateString)
        addQuantity(map, value, index, flag)

      }
      else if (duration.label === 'This Year') {
        const orderMonth = date.getMonth();
        const index = orderMonth
        addQuantity(map, value, index, flag)
      }
      else {
        const orderDay = date.getDate();
        console.log(orderDay)
        let index = 0;

        if (1 <= orderDay && orderDay <= 5)
          index = 0;

        else if (6 <= orderDay && orderDay <= 10)
          index = 1;

        else if (11 <= orderDay && orderDay <= 15)
          index = 2;

        else if (16 <= orderDay && orderDay <= 20)
          index = 3;

        else if (21 <= orderDay && orderDay <= 25)
          index = 4;

        else index = 5;

        addQuantity(map, value, index, flag);
      }
    }
  }

  const handleGraphData = (map, color_map) => {
    const finalData = {
      datasets: []
    }

    console.log(map)
    for (const [key, value] of map) {
      console.log(key)
      console.log(value)
      //console.log(colorMap.get(key))
      const singleData = {
        data: value,
        color: (opacity = 1) => color_map.get(key),
        strokeWidth: 1,
      }
      finalData.datasets.push(singleData);
    }

    console.log(finalData.datasets.length)

    setGraphData({
      ...graphData,
      datasets: finalData.datasets
    });

    setLegendMap(colorMap)
  }

  useEffect(() => {
    handleDuration();
  }, [duration.label])

  useEffect(() => {
    handleInitialRecords()
  }, [durationSize, durationToggle])



  useEffect(() => {
    console.log('------')
    handleRecords()
  }, [tiffinName])


  useEffect(() => {
    fetchWallet()
    //fetchTransactions()
    
  }, [, refresh])

  useEffect(() =>{
    createDuration()
  }, [])

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

  const findOptionByLabel = (label) => {
    return durationOptions.find(option => option.label === label);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {isWallet ? (
            <>
              <View>
                <WalletHeader
                  name={screen}
                  onPressWallet={() => setScreen('Wallet')}
                  onPressInsights={() => setScreen('Insights')}
                />
                <View style={styles.upperScreen}>
                  {screen === 'Wallet' ? (
                    <View>
                      <WalletComponent
                        walletDetails={wallet}
                        onWithdraw={toggleWithdrawModal}
                      />
                    </View>
                  ) : (
                    <View>
                      <View style={styles.row}>
                        <View style={styles.filters}>
                          <Text>Tiffins</Text>
                          <RNPickerSelect
                            placeholder={{ label: 'Select Tiffins', value: null }}
                            value={tiffinName}
                            onValueChange={value => setTiffinName(value)}
                            items={tiffinNameOptions}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                          />
                        </View>
                        <View style={styles.duration}>
                          <Text>Duration</Text>
                          <RNPickerSelect
                            placeholder={{ label: 'Select Duration', value: null }}
                            value={duration ? duration.label : null}
                            onValueChange={label => {
                              const selectedOption = findOptionByLabel(label, durationOptions);
                              setDuration(selectedOption);
                            }}
                            items={durationOptions.map(option => ({
                              label: option.label,
                              value: option.label,
                            }))}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                          />
                        </View>
                      </View>
                      <LegendComponent colorMap={legendMap} />
                      {graphData.datasets && graphData.datasets.length ? (
                        <View style={styles.graphContainer}>
                        <LineGraph data={graphData} scroll={scroll} value={'Amount'} />
                        </View>
                      ) : (
                        <Text style={styles.noInsights}>No Insights</Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.transactions}>
                <Text style={styles.header}>Transactions</Text>
                <FlatList
                  data={transactions}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => <TransactionComponent {...item} />}
                  contentContainerStyle={styles.flatList}
                />
              </View>
              {withdrawModal && (
                <WithdrawModal 
                  isVisible={withdrawModal}
                  onClose={toggleWithdrawModal}
                  onWithdraw={finalWithdraw}
                />
              )}
            </>
          ) : (
            <>
              <View style={styles.btnView}>
                <TouchableOpacity onPress={toggleCreateModal} style={styles.btn}>
                  <Text style={styles.btnText}>Create Wallet</Text>
                </TouchableOpacity>
              </View>
              {createModal && (
                <CreateWalletModal
                  isVisible={createModal}
                  onClose={toggleCreateModal}
                  onCreate={handleCreate}
                  type={authState.authType}
                />
              )}
            </>
          )}
        </>
      )}
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
  upperScreen: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    marginBottom: 12,
    height: windowHeight * 0.47,
  },
  header: {
    textAlign: 'center',
    fontSize: windowHeight * 0.025,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  tiffinName: {
    flex: 1,
    alignItems: 'center',
  },
  tiffinType: {
    flex: 1,
    alignItems: 'center',
  },
  orderType: {
    flex: 1,
    alignItems: 'center',
  },
  duration: {
    flex: 1.5,
    alignItems: 'center',
  },
  filters: {
    flex: 1,
    alignItems: 'center',
  },
  noInsights: {
    textAlign: 'center',
    fontSize: windowHeight * 0.02,
  },
  graphContainer: {
    height: windowHeight * 0.3, 
  },
  transactions: {
   height: windowHeight * 0.53,
  },
  flatList: {
    flexGrow: 1,
    paddingBottom: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: windowWidth * 0.04,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: windowWidth * 0.02,
    color: 'black',
    paddingRight: windowWidth * 0.1,
    marginBottom: windowHeight * 0.01,
  },
  inputAndroid: {
    fontSize: windowWidth * 0.035,
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.01,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: windowWidth * 0.02,
    color: 'black',
    paddingRight: windowWidth * 0.1,
    marginBottom: windowHeight * 0.01,
  },
});
