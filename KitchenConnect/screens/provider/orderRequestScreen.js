import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList, Alert } from 'react-native';
import { AuthContext } from "@/context/authContext";
import {RefreshContext} from '@/context/refreshContext'
import OrderRequestComponent from '../../components/provider/orderRequestComponent';

const OrderRequestScreen = () =>{
    const [authState] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [requests, setRequests] = useState([]);
    const [refresh, setRefresh] = useContext(RefreshContext)

    const fetchRequests = () =>{
        console.log('Fetching Requests')
    }

    const handleStatus = () =>{
        console.log('Handling Status')
    }

    useEffect (() =>{
        fetchRequests()
    }, [, refresh])
    
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
                onAccept={() =>handleStatus}
                onReject={() =>handleStatus}/>
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