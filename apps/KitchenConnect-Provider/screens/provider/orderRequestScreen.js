import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet,  StatusBar, FlatList, Alert } from 'react-native';
import { AuthContext } from "@/context/authContext";
import {RefreshContext} from '@/context/refreshContext'
import OrderRequestComponent from '@/components/provider/orderRequestComponent';
import { getPendingOrders, decideOrderStatus } from '@/utils/provider/orderAPI';
import LoadingScreen from '../shared/loadingScreen';

const OrderRequestScreen = () =>{
    const [authState] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [requests, setRequests] = useState([]);
    const [globalRefresh, setGlobalRefresh] = useContext(RefreshContext)

    const fetchRequests = async() =>{
      try {
        setLoading(true)
        const response = await getPendingOrders(authState.authToken)
        console.log(response)
  
        setRequests(response.pendingOrders)
  
      } catch (error) {
        console.log('Error in Fetching Orders ', error);
        Alert.alert(error.message || "An error occurred");
        setLoading(false);
      }finally{
        setLoading(false)
      }
    }

    const handleStatus = async(orderID, status) =>{
      try {
        console.log(status)
        setLoading(true)
        const response = await decideOrderStatus(authState.authToken, orderID, status)
        console.log(response)
  
      } catch (error) {
        console.log('Error in Fetching Orders ', error);
        Alert.alert(error.message || "An error occurred");
        setLoading(false);
      }finally{
        setLoading(false)
        setGlobalRefresh(!globalRefresh);
      }
    }

    useEffect (() =>{
        fetchRequests()
    }, [, globalRefresh])
    
    return (
        <SafeAreaView style={styles.screen}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
            {requests.length !== 0 ?
            <FlatList
            data = {requests}
            renderItem={({ item }) => (
                <OrderRequestComponent {...item} 
                onAccept={handleStatus}
                onReject={handleStatus}/>
              )}
              contentContainerStyle={styles.flatList}
              />
              :
              <View style = {styles.emptyView}>
              <Text>No Pending Requests</Text>
              </View>
              }           
               </> 
              ) }
            </>
    ) : <Text>You are not authorised to access this screen</Text> }
    </SafeAreaView>
    )
}

export default OrderRequestScreen

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#fff',
    },
    flatList: {
        paddingBottom: 30,
        alignItems: 'center'
      },
      emptyView: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
      }

})