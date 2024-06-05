import React, {useContext, useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import TiffinSubscription from '../../components/provider/tiffinSubscriptionComponent';
import {AuthContext} from '@/context/authContext'
import {RefreshContext} from '@/context/refreshContext'
import { windowWidth, windowHeight } from '@/utils/dimensions';
import LoadingScreen from '../shared/loadingScreen';
import { getSubscriptions, addSubscription } from '@/utils/provider/subscriptionAPI';

const TiffinSubscriptionScreen = ({ route, navigation}) => {
  const {tiffin} = route.params
  const [subscriptions, setSubscriptions] = useState([
  {
    id: 1,
    title: "Weekly",
    price: 500,
    days: 7,
    exists: false
  },
  {
    id: 2,
    title: "Fortnightly",
    price: 1000,
    days: 14,
    exists: false
  },
  {
    id: 3,
    title: "Monthly",
    price: 1500,
    days: 30,
    exists: false
  }]);

  const [newSubscription, setNewSubscription] = useState({
    title: "",
    price: "",
    days: ""
  })
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useContext(RefreshContext)
  const [authState] = useContext(AuthContext)

  const fetchSubscriptions = async() =>{
    try {
      const response = await getSubscriptions(authState.authToken, tiffin.id)

      const updatedSubscriptions = subscriptions.map((subscription) => {
        const match = response.find((item) => item.title === subscription.title);
        if (match) {
          return {
            ...subscription,
            price: match.price,
            days: match.days,
            exists: true,
          };
        }
        return subscription;
      });

      setSubscriptions(updatedSubscriptions);

      /*
      setSubscriptions([
        
      ])
      */
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

  const handleCreate = async(item) =>{
    try {
      //console.log(item)
      setNewSubscription({
        title: item.title,
        price: item.price,
        days: item.days,
      })

      const response = await addSubscription(authState.authToken, tiffin.id, newSubscription)

    } catch (error) {
      
    } finally{
      setRefresh(!refresh)
    }
  }

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
          title= {item.title}
          price={item.price}
          days={item.days} 
          exists={item.exists}
          onCreate={() => handleCreate(item)}/>
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