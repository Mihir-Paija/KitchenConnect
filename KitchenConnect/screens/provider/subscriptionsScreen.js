import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import { SocketContext } from '@/context/socketContext';



const SubscriptionsScreen = ({ navigation}) => {

  const [notification, setNotification] = useState("")
  const [socket] = useContext(SocketContext)
  
  useEffect(() =>{
    socket.on('notification', (message) =>{
     console.log(message)
      setNotification(message);
    })

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
  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      <Text>Subscriptions Screen</Text>
      <Text>{notification}</Text>
    </SafeAreaView>
  );
};


export default SubscriptionsScreen;