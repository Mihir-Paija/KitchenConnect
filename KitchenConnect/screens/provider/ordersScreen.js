import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList, Alert } from 'react-native';
import { AuthContext } from "@/context/authContext";
import { RefreshContext } from '@/context/refreshContext'
import OrderHeader from '@/components/provider/orderHeader';
import { getSubscribers, decideStatus } from '@/utils/provider/subscriberAPI';
import OrderComponent from '@/components/provider/orderComponent';
import OrderCard from '@/components/provider/orderCard';

const OrdersScreen = ({navigation}) => {
  const [authState] = useContext(AuthContext)
  const [refresh, setRefresh] = useContext(RefreshContext)
  const [loading, setLoading] = useState(false)

  const [type, setType] = useState('Lunch')
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])

  const fetchSubscribers = async() => {
    try {
      setLoading(true)
      const response = await getSubscribers(authState.authToken)
      console.log(response)

      const lunch = [];
      const dinner = [];
      const currentDate = new Date();

      for (const subscriber of response) {
        if (new Date(subscriber.startDate) < currentDate && currentDate < new Date(subscriber.endDate) && subscriber.accepted) {
          if(subscriber.tiffinType === 'Lunch')
            lunch.push(subscriber)
          else dinner.push(subscriber)
        }
      }

      setLunch(lunch);
      setDinner(dinner);
      setLoading(false)

    } catch (error) {
      console.log('Error in Fetching Orders ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    }
  }

  useEffect(() =>{
    fetchSubscribers()
  },[])

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
      onPressLunch={()=>setType('Lunch')}
      onPressDinner={()=>setType('Dinner')}
      />
          <View style = {styles.view}>
      <OrderCard/>
      </View>
      {/*
      {type === 'Lunch' ?
      <>
      { lunch.length !== 0 ?
       <FlatList
       data={lunch}
       renderItem={({ item }) => (
         <OrderComponent {...item} />
       )}
       keyExtractor={(item) => item._id.toString()}
       contentContainerStyle={styles.flatList}
     />
     :
     <View style={styles.emptyView}>
       <Text>No Lunch Deliveries Today</Text>
     </View>
      }
      </>
      : null}
      {type === 'Dinner' ?
      <>
      { dinner.length !== 0 ?
       <FlatList
       data={dinner}
       renderItem={({ item }) => (
         <OrderComponent {...item} />
       )}
       keyExtractor={(item) => item._id.toString()}
       contentContainerStyle={styles.flatList}
     />
     :
     <View style={styles.emptyView}>
       <Text>No Dinner Deliveries Today</Text>
     </View>
      }
      </>
      : null}
    */}
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: StatusBar.currentHeight * 1.2

  },
  flatList: {
    flex: 1,
    paddingBottom: 70,
  },
  view:{
    flex: 1,
    marginVertical: 10,
    alignItems: 'center'
  },


  emptyView: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
  }
})