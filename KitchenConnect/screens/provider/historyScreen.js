import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, Alert, TouchableOpacity, StatusBar, FlatList, ScrollView } from 'react-native';
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
import LegendComponent from '../../components/provider/legendComponent';

const GRAPH_DATA = [
  {
    _id: "667babbabe047a6f717c5d1d",
    title: 'Subscription',
    subscriberFirstName: 'John',
    subscriberLastName: 'Doe',
    tiffinName: 'Full Tiffin',
    tiffinType: 'Lunch',
    day: 5,
    orderDate: "2024-07-05T12:00:00",
    orderTime: "12:00",
    noOfTiffins: 2,
    pricePerTiffin: 150,
    OTP: null,
    amountPaid: 300,
    kitchenPaymentBreakdown: {
      perOrderPrice: 300
    },
    transactionID: "Z339021GR9S",
    date: new Date(2024, 6, 5),
  },
  {
    _id: "667babbabe047a6f717c5d2d",
    title: 'One-Time',
    customerName: 'Alex',
    tiffinName: 'Full Tiffin',
    tiffinType: 'Dinner',
    status: "Completed",
    orderDate: "2024-07-04T13:00:00",
    orderTime: "13:00",
    noOfTiffins: 3,
    pricePerTiffin: 150,
    OTP: "123456",
    amountPaid: 450,
    kitchenPaymentBreakdown: {
      perOrderPrice: 450
    },
    transactionID: "A567723YU0P",
    date: new Date(2024, 6, 4),
  },
  {
    _id: "667babbabe047a6f717c5d3d",
    title: 'One-Time',
    customerName: 'Alex',
    tiffinName: 'Deluxe Tiffin',
    tiffinType: 'Lunch',
    status: "Completed",
    orderDate: "2024-07-02T14:00:00",
    orderTime: "14:00",
    noOfTiffins: 1,
    pricePerTiffin: 200,
    OTP: "654321",
    amountPaid: 200,
    kitchenPaymentBreakdown: {
      perOrderPrice: 200
    },
    transactionID: "D348229YE5T",
    date: new Date(2024, 6, 2),
  },
  {
    _id: "667babbabe047a6f717c5d4d",
    title: 'Subscription',
    customerName: 'Alex',
    tiffinName: 'Deluxe Tiffin',
    tiffinType: 'Lunch',
    status: "Pending",
    orderDate: "2024-07-02T15:00:00",
    orderTime: "15:00",
    noOfTiffins: 2,
    pricePerTiffin: 200,
    OTP: null,
    amountPaid: 0,
    kitchenPaymentBreakdown: {
      perOrderPrice: 400
    },
    transactionID: "D348229YE6T",
    date: new Date(2024, 6, 2),
  },
  {
    _id: "667babbabe047a6f717c5d5d",
    title: 'Subscription',
    subscriberFirstName: 'John',
    subscriberLastName: 'Doe',
    tiffinName: 'Half Tiffin',
    tiffinType: 'Dinner',
    day: 29,
    orderDate: "2024-06-29T19:00:00",
    orderTime: "19:00",
    noOfTiffins: 1,
    pricePerTiffin: 100,
    OTP: null,
    amountPaid: 100,
    kitchenPaymentBreakdown: {
      perOrderPrice: 100
    },
    transactionID: "A567723YU1P",
    date: new Date(2024, 5, 29),
  },
  {
    _id: "667babbabe047a6f717c5d6d",
    title: 'One-Time',
    customerName: 'Alex',
    tiffinName: 'Mini Tiffin',
    tiffinType: 'Dinner',
    status: "Completed",
    orderDate: "2024-06-27T20:00:00",
    orderTime: "20:00",
    noOfTiffins: 1,
    pricePerTiffin: 100,
    OTP: "987654",
    amountPaid: 100,
    kitchenPaymentBreakdown: {
      perOrderPrice: 100
    },
    transactionID: "D348229YE7T",
    date: new Date(2024, 4, 27),
  },
  {
    _id: "667babbabe047a6f717c5d6d",
    title: 'One-Time',
    customerName: 'Jane',
    tiffinName: 'Mini Tiffin',
    tiffinType: 'Dinner',
    status: "Completed",
    orderDate: "2024-05-25T20:00:00",
    orderTime: "20:00",
    noOfTiffins: 1,
    pricePerTiffin: 100,
    OTP: "987654",
    amountPaid: 100,
    kitchenPaymentBreakdown: {
      perOrderPrice: 100
    },
    transactionID: "D348229YE7T",
    date: new Date(2024, 4, 25),
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
const monthDivision = ['1-5', '6-10', '11-15', '16-20', '21-25', '26-']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let dateSet = new Set()
let dateIndexMap = new Map();
let colorMap = new Map()
let tiffinNameValueMap = new Map()
let tempNameSet = new Set()
let tempValueMap = new Map()
let tempColorMap = new Map()

const HistoryScreen = ({ navigation }) => {
  //const [authState, setAuthState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  //const [refresh, setRefresh] = useState(false)
  const [history, setHistory] = useState(GRAPH_DATA)

  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: []
  })
  const [scroll, setScroll] = useState(false)
  const [scrollToggle, setScrollToggle] = useState(false)
  const [tiffinName, setTiffinName] = useState('All')
  const [tiffinNameOptions, setTiffinNameOptions] = useState([{ label: 'All', value: 'All' }])
  const [tiffinType, setTiffinType] = useState('All')

  const [orderType, setOrderType] = useState('All')

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
  //const [orders, setOrders] = useState([])


  const tiffinTypeOptions = [
    { label: 'All', value: 'All' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' }
  ]
  const orderTypeOptions = [
    { label: 'All', value: 'All' },
    { label: 'Subscription', value: 'Subscription' },
    { label: 'One-Time', value: 'One-Time' }
  ]



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
    setTiffinName('All')
    setTiffinType('All')
    setOrderType('All')
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

      //setDurationSize(7)
      if(!scroll)
        setScrollToggle(!scrollToggle)
      else
      setScroll(false)
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

      //setDurationSize(14)
      setGraphData({ ...graphData, labels: graphLabels })
      if(scroll)
        setScrollToggle(!scrollToggle)
      else
      setScroll(true)

    }

    else if (duration.label === 'This Year') {
      for (let i = 0; i < 12; ++i) {
        dateSet.add(i);
        dateIndexMap.set(i, i);
      }
      //setDurationSize(12)
      setGraphData({ ...graphData, labels: months })
      if(scroll)
        setScrollToggle(!scrollToggle)
      else
      setScroll(true)
    }
    else {
      for (let i = 1; i <= 26; i = i + 5) {
        dateSet.add(i);
        dateIndexMap.set(i, i / 5)
      }
      setGraphData({ ...graphData, labels: monthDivision })
      if(!scroll)
        setScrollToggle(!scrollToggle)
      else
      setScroll(false)
    }

    console.log(dateSet)
    console.log(dateIndexMap)
  }

  const handleDurationSize = () =>{
    if (duration.label === 'Last 7 days') {
      setDurationSize(7)
      
    }

    else if (duration.label === 'Last 14 days') {

      setDurationSize(14)
         }

    else if (duration.label === 'This Year') {
      
      setDurationSize(12)
      
    }
    else {
  
      if (durationSize === 6)
        setDurationToggle(!durationToggle)
      else {
        setDurationSize(6)
      }

    }

  }

  const handleInitialTiffins = () => {

    if (!durationSize)
      return;

    const initialOrders = []
    const tiffinNameSet = new Set();
    tiffinNameSet.add('All')
    let colors = [...originalColors]
    colorMap.clear();
    colorMap.set('All', '#FFA500')

    for (const value of history) {

      const orderDate = new Date(value.date)
      orderDate.setHours(0, 0, 0, 0)
      orderDateString = orderDate.toISOString()

      if (duration.label === 'Last 7 days' || duration.label === 'Last 14 days') {
        if (dateSet.has(orderDateString)) {
          addToSet(tiffinNameSet, value, initialOrders, colors, colorMap)
        }
      }
      else if (duration.label === 'This Year') {
        const orderYear = orderDate.getFullYear()
        const currentYear = duration.value

        if (orderYear === currentYear)
          addToSet(tiffinNameSet, value, initialOrders, colors, colorMap)
      }
      else {
        const orderYear = orderDate.getFullYear()
        const orderMonth = orderDate.getMonth()
        const currentYear = new Date(duration.value).getFullYear()
        const currentMonth = new Date(duration.value).getMonth()

        if (currentMonth === orderMonth && currentYear === orderYear)
          addToSet(tiffinNameSet, value, initialOrders, colors, colorMap)

      }
    }

    setOriginalOrders(initialOrders)

    const tiffinNameOptionsArray = []
    tiffinNameValueMap.clear()
    for (const value of tiffinNameSet) {
      tiffinNameOptionsArray.push({ label: value, value: value })
      tiffinNameValueMap.set(value, new Array(durationSize).fill(0))
    }

    setTiffinNameOptions(tiffinNameOptionsArray)

    fillBins(tiffinNameValueMap, initialOrders, true)
    handleGraphData(tiffinNameValueMap, colorMap)

  }

  const handleTiffins = () => {

    if (tiffinName === 'All' && tiffinType === 'All' && orderType === 'All') {
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

    else if (tiffinType === 'All' && orderType === 'All') { //don't want to calculate again
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
    else {
      let colors = [...originalColors]
      tempColorMap.clear();
      
      tempNameSet.clear()
      let flag = false;
      if (tiffinName === 'All') {
        tempNameSet.add('All')
        colorMap.set('All', '#FFA500')
        flag = true
      }
     tempValueMap.clear()
      const orders = []
      console.log(orderType)

      for (const value of originalOrders) {
        console.log(value.title)
        console.log(orderType)
        console.log(value.title === orderType)
        let count = true;
        if (tiffinName !== 'All' && value.tiffinName !== tiffinName)
          count = false;

        
        if (count && tiffinType !== 'All' && value.tiffinType !== tiffinType)
          count = false

        
        if (count && orderType !== 'All' && value.title !== orderType)
          count = false;

        if (count) {
        console.log(value)
          addToSet(tempNameSet, value, orders, colors, tempColorMap)
        }
      }

      for (const value of tempNameSet) {
        tempValueMap.set(value, new Array(durationSize).fill(0))
      }

      console.log(orders)
      fillBins(tempValueMap, orders, flag)
      console.log(tempValueMap)
      handleGraphData(tempValueMap, tempColorMap)
    }
  }

  const addToSet = (set, value, initialOrders, colors, map) => {
    set.add(value.tiffinName)
    const randomIndex = Math.floor(Math.random() * colors.length);
    map.set(value.tiffinName, colors[randomIndex]);
    const setColor = colors[randomIndex]
    colors = colors.filter(item => item !== setColor)
    initialOrders.push(value);
  }

  const addQuantity = (map, value, index, flag) => {

    if (flag) {
      let totalQuantity = map.get('All')
      totalQuantity[index] += value.noOfTiffins;
      map.set('All', totalQuantity);
    }
    let quantity = map.get(value.tiffinName)

    quantity[index] += value.noOfTiffins;

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

  useEffect(() =>{
    handleDurationSize()
  }, [scroll, scrollToggle])

  useEffect(() => {
    handleInitialTiffins()
  }, [durationSize, durationToggle])



  useEffect(() => {
    console.log('------')
    handleTiffins()
  }, [tiffinName, tiffinType, orderType])

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
        <View style={styles.insights}>
          <Text style={styles.header}>Insights</Text>
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
            <View style={styles.filters}>
              <Text>Time</Text>
              <RNPickerSelect
                placeholder={{ label: 'Select Time', value: null }}
                value={tiffinType}
                onValueChange={value => setTiffinType(value)}
                items={tiffinTypeOptions}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
              />
            </View>
            <View style={styles.filters}>
              <Text>Type</Text>
              <RNPickerSelect
                placeholder={{ label: 'Select Order Type', value: null }}
                value={orderType}
                onValueChange={value => setOrderType(value)}
                items={orderTypeOptions}
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
              <LineGraph
                data={graphData}
                scroll={scroll}
                value={'No Of Tiffins'}
              />
            </View>
          ) : (
            <Text style={styles.noInsights}>No Insights</Text>
          )}
        </View>
          <View style={styles.history}>
        <Text style={styles.header}>History</Text>
        <FlatList
          data={history}
          renderItem={({ item }) => <HistoryComponent {...item} />}
          contentContainerStyle={styles.flatList}
        />
        </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight * 1.2,
  },
  header: {
    textAlign: 'center',
    fontSize: windowHeight * 0.025,
    marginBottom: 8,
    paddingBottom: 10,
    borderColor: 'black',
  },
  insights: {
    
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  filters: {
    flex: 1,
    alignItems: 'center',
  },
  duration: {
    flex: 1.5,
    alignItems: 'center',
  },
  noInsights: {
    textAlign: 'center',
    fontSize: windowHeight * 0.02,
  },
  flatList: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  graphContainer: {
    height: windowHeight * 0.3, 
  },
  history:{
    height: '100%',
    //flex: 1,
   //height: windowHeight * 0.57,
    width: windowWidth,
    backgroundColor: "#fdfdfd",
    // paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.015,

    // justifyContent: "flex-end",
    borderTopRightRadius: windowWidth * 0.05,
    borderTopLeftRadius: windowWidth * 0.05,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  }
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
    width: '100%'
  },
  inputAndroid: {
    fontSize: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.02,
    paddingVertical: windowHeight * 0.01,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: windowWidth * 0.02,
    color: 'black',
    //paddingRight: windowWidth * 0.02,
    marginBottom: windowHeight * 0.01,
    width: '100%'
  },
});