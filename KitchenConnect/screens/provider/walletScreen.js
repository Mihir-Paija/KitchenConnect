import React, {useContext, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import activeScreenStyles from '../../styles/shared/activeScreen';
import { logoutProvider } from "@/utils/provider/providerAPI";
import { AuthContext } from "@/context/authContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {windowHeight} from '@/utils/dimensions'
import LogoutButton from '@/components/shared/logoutButton'


const WalletScreen = ({navigation}) => {
    const [authState, setAuthState] = useContext(AuthContext);

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

    const handleLogout = async() =>{
        try {
          const response = await logoutProvider();
          if(response && response.status === 200){
            setAuthState({
              authReady: true,
              authToken: "",
              authType: ""
            })
            await AsyncStorage.removeItem("@auth")
            console.log('Logged out successfully');
            navigation.navigate("Choose")
          } else {
            console.error('Failed to log out:', response);
        }
        } catch (error) {
          console.log("Error In LogOut-Provider ", error)
        }
    
      }
  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      <Text>Wallet Screen</Text>
      <View style={styles.logoutButtonContainer}>
        <LogoutButton 
        handleLogoutBtn = {handleLogout}/>
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
    logoutButtonContainer: {
      position: "absolute",
      bottom: windowHeight * 0.1,
      alignSelf: "center",
    },
  });
  
