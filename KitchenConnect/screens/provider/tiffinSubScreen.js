import React, {useContext, useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import TiffinSubscription from '../../components/provider/tiffinSubscriptionComponent';
import {AuthContext} from '@/context/authContext'
import {RefreshContext} from '@/context/refreshContext'
import { windowWidth, windowHeight } from '@/utils/dimensions';
import LoadingScreen from '../shared/loadingScreen';

const TiffinSubscriptionScreen = ({ navigation}) => {

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useContext(RefreshContext)
  const [authState] = useContext(AuthContext)

  const fetchSubscriptions = async() =>{
    try {
      setSubscriptions([
        {
          id: 1,
          name: "Weekly",
          price: 500,
          days: 7
        },
        {
          id: 2,
          name: "Fortnightly",
          price: 1000,
          days: 14
        },
        {
          id: 3,
          name: "Monthly",
          price: 1500,
          days: 30
        },
      ])
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
    
  }


  useEffect(() =>{
    setLoading(true)
    fetchSubscriptions()

  }, [, refresh])

  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      {authState.authToken ?<>
      {loading ? 
      <LoadingScreen /> 
      :
      <>
      <FlatList
        data={subscriptions}
        renderItem={({item}) =>(
          <TiffinSubscription
          name= {item.name}
          price={item.price}
          days={item.days} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatList}
      />
    
      </> 
      }
      </> 
      : 
      <Text>Please Login!</Text>
      }
    </SafeAreaView>
  );
};


export default TiffinSubscriptionScreen;

const styles = StyleSheet.create({
  flatList: {
  },
})