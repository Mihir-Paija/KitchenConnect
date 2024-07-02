import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, Alert, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import activeScreenStyles from '../../styles/shared/activeScreen';
import { AuthContext } from "@/context/authContext";
import { windowHeight, windowWidth } from '@/utils/dimensions'
import { getWallet, createWallet } from '../../utils/walletAPI';
import CreateWalletModal from '../shared/createWalletModal';
import LoadingScreen from '../shared/loadingScreen'
import HistoryComponent from '../../components/provider/historyComponent';
import LineGraph from '../../components/provider/lineGraph';
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from '../../utils/formateDateTime';
import RNPickerSelect from "react-native-picker-select";

const DUMMY_DATA = [
  {
    _id: "667babbabe047a6f717c5c4d",
    title: 'Subscription',
    subscriberFirstName: 'John',
    subscriberLastName: 'Doe',
    tiffinName: 'Full Tiffin',
    tiffnType: 'Lunch',
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
    tiffinName: 'Deluxe Tiffin',
    tiffnType: 'Lunch',
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
    tiffnType: 'Dinner',
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

const GRAPH_DATA = [
  {
    date: new Date(2024, 6, 1),
    tiffinType: "Lunch",
    title: 'Subscription',
    tiffinName: "Full Tiffin",
    noOfTiffins: 1
  },
  {
    date: new Date(2024, 6, 2),
    tiffinType: "Lunch",
    title: 'Subscription',
    tiffinName: "Full Tiffin",
    noOfTiffins: 2
  },
  {
    date: new Date(2024, 5, 30),
    tiffinType: "Dinner",
    title: 'One Time',
    tiffinName: "Full Tiffin",
    noOfTiffins: 3
  },
  {
    date: new Date(2024, 5, 29),
    tiffinType: "Lunch",
    title: 'One Time',
    tiffinName: "Deluxe Tiffin",
    noOfTiffins: 5
  },
  {
    date: new Date(2024, 5, 29),
    tiffinType: "Lunch",
    title: 'One Time',
    tiffinName: "Deluxe Tiffin",
    noOfTiffins: 2
  },
  {
    date: new Date(2024, 5, 28),
    tiffinType: "Dinner",
    title: 'Subscription',
    tiffinName: "Deluxe Tiffin",
    noOfTiffins: 1
  },
  {
    date: new Date(2024, 6, 1),
    tiffinType: "Lunch",
    title: 'One Time',
    tiffinName: "Half Tiffin",
    noOfTiffins: 1
  },
  {
    date: new Date(2024, 6, 2),
    tiffinType: "Lunch",
    title: 'Subscription',
    tiffinName: "Half Tiffin",
    noOfTiffins: 2
  },
  {
    date: new Date(2024, 5, 27),
    tiffinType: "Dinner",
    title: 'Subscription',
    tiffinName: "Half Tiffin",
    noOfTiffins: 3
  }
];


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
const monthDivision = ['1-5', '6-10', '11-15', '16-20', '21-25', '25-']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


const HistoryScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [history, setHistory] = useState(GRAPH_DATA)

  const [graphData, setGraphData] = useState([])
  const [tiffinName, setTiffinName] = useState('All')
  const [tiffinNameOptions, setTiffinNameOptions] = useState([{ label: 'All', value: 'All' }])
  const [tiffinType, setTiffinType] = useState('All')
  const [tiffinTypeOptions, setTiffinTypeOptions] = useState([
    { label: 'All', value: 'All' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' }
  ])
  const [orderType, setOrderType] = useState('All')
  const [orderTypeOptions, setOrderTypeOptions] = useState([
    { label: 'All', value: 'All' },
    { label: 'Subscription', value: 'Subscription' },
    { label: 'One Time', value: 'One Time' }
  ])
  const [duration, setDuration] = useState({ label: 'Last 7 days', value: 'Last 7' });
  const [durationOptions, setDurationOptions] = useState([
    { label: 'Last 7 days', value: 'Last 7' },
    { label: 'Last 14 days', value: 'Last 14' },
  ])

  const [durationSize, setDurationSize] = useState(7);
  const [graphLabel, setGraphLabel] = useState([])
  const [originalColors, setOriginalColors] = useState([
    `rgba(255, 87, 51, 1)`,      // Vivid Orange
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
  ])
  const orders = [];
  const colorMap = new Map()
  const tiffinNameValueMap = new Map()

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

  const handleGraphData = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const graphLabels = [];
    const dateSet = new Set();
    const dateIndexMap = new Map();
    if (duration.label === 'Last 7 days') {

      const currentDate = new Date(today);

      for (let i = 6; i >= 0; --i) {
        const dayName = currentDate.getDay();
        console.log(dayName)
        graphLabels.unshift(weekMap[dayName]);
        const currentDateString = currentDate.toISOString()
        dateSet.add(currentDateString);
        dateIndexMap.set(currentDateString, i);
        currentDate.setDate(currentDate.getDate() - 1);
      }

      setDurationSize(7)
      setGraphLabel(graphLabels)
    }


    if (tiffinName === 'All') {
      const tiffinNameSet = new Set();
      tiffinNameSet.add('All')
      let colors = [...originalColors]
      colorMap.set('All', '#FFA500')


      for (const value of history) {

        const orderDate = new Date(value.date)
        orderDate.setHours(0, 0, 0, 0)
        orderDateString = orderDate.toISOString()

        if (dateSet.has(orderDateString)) {
          console.log(value)
          if (tiffinType === 'All' && orderType === 'All') {
            tiffinNameSet.add(value.tiffinName)
            const randomIndex = Math.floor(Math.random() * colors.length);
            colorMap.set(value.tiffinName, colors[randomIndex]);
            const setColor = colors[randomIndex]
            colors = colors.filter(item => item != setColor)
            orders.push(value);
          }
          else if (tiffinType === 'All' && orderType !== 'All') {
            if (value.title === orderType) {
              tiffinNameSet.add(value.tiffinName)
              orders.push(value);
            }
          }
          else if (tiffinType !== 'All' && orderType === 'All') {
            if (value.tiffinType === tiffinType) {
              tiffinNameSet.add(value.tiffinName)
              orders.push(value);
            }
          }
          else {
            if (value.tiffinType === tiffinType && value.title === orderType) {
              tiffinNameSet.add(value.tiffinName)
              orders.push(value);
            }
          }
        }
      }

      const tiffinNameOptionsArray = []
      for (const value of tiffinNameSet) {
        tiffinNameOptionsArray.push({ label: value, value: value })
        tiffinNameValueMap.set(value, new Array(durationSize).fill(0))
      }

      setTiffinNameOptions(tiffinNameOptionsArray)



    }

    for (const value of orders) {
      if (duration.label === 'Last 7 days') {
        console.log(value.date)
        const date = new Date(value.date);
        date.setHours(0, 0, 0, 0)
        dateString = date.toISOString()
        console.log(dateString)
        let totalQuantity = tiffinNameValueMap.get('All')
        let quantity = tiffinNameValueMap.get(value.tiffinName)
        const index = dateIndexMap.get(dateString)
        quantity[index] += value.noOfTiffins;
        totalQuantity[index] += value.noOfTiffins;
        tiffinNameValueMap.set(value.tiffinName, quantity);
        tiffinNameValueMap.set('All', totalQuantity);
      }
    }

    const finalData = {
      labels: graphLabel,
      datasets: []
    }

    console.log(colorMap)

    for (const [key, value] of tiffinNameValueMap) {
      console.log(key)
      console.log(value)
      console.log(colorMap.get(key))

      const singleData = {
        data: value,
        color: (opacity = 1) => colorMap.get(key)
      }


      finalData.datasets.push(singleData);

    }

    console.log(finalData.labels)
    console.log(finalData.datasets[1])

    if(finalData.datasets.length)
      setGraphData(finalData)
  }

  useEffect(() => {
    handleGraphData();
  }, [, tiffinName, tiffinType, orderType, duration])


  useEffect(() => {
    //fetchHistory()
    createDuration();
  }, [])



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
      {loading ?
        <LoadingScreen />
        :
        <>
          <View style={styles.insights} >
            <Text style={styles.header}>Insights</Text>
            <RNPickerSelect
              placeholder={{ label: 'Select Tiffins', value: null }}
              value={tiffinName}
              onValueChange={(value) => setTiffinName(value)}
              items={tiffinNameOptions}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
            <RNPickerSelect
              placeholder={{ label: 'Select Type', value: null }}
              value={tiffinType}
              onValueChange={(value) => setTiffinType(value)}
              items={tiffinTypeOptions}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
            <RNPickerSelect
              placeholder={{ label: 'Select Order Type', value: null }}
              value={orderType}
              onValueChange={(value) => setOrderType(value)}
              items={orderTypeOptions}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
            <RNPickerSelect
              placeholder={{ label: 'Select Duration', value: null }}
              value={duration ? duration.label : null}
              onValueChange={(label) => {
                const selectedOption = findOptionByLabel(label);
                setDuration(selectedOption);
              }}
              items={durationOptions.map(option => ({
                label: option.label,
                value: option.label,
              }))}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
            {graphData.length !== 0 ?
              <LineGraph
                data={graphData}
              />
              : <Text>No Insights</Text>}
          </View>
          <Text style={styles.header}>History</Text>
          <FlatList
            data={DUMMY_DATA}
            renderItem={({ item }) => (
              <HistoryComponent {...item} />
            )}
            contentContainerStyle={styles.flatList}
          />
        </>}
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: StatusBar.currentHeight * 1.2,
  },
  header: {
    textAlign: 'center',
    fontSize: windowHeight * 0.03,
  },
  insights: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
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

// const [datePicker1, setDatePicker1] = useState(false);
// const [datePicker2, setDatePicker2] = useState(false);
// const [fromDate, setFromDate] = useState('');
// const [toDate, setToDate] = useState('')

// const toggleDatePicker1 = () =>{
//   setDatePicker2(false)
//   setDatePicker1(!datePicker1)
// }

// const toggleDatePicker2 = () =>{
//   setDatePicker1(false)
//   setDatePicker2(!datePicker2)
// }

