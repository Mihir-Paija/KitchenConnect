import React, {useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import activeScreenStyles from '../../styles/shared/activeScreen';
import { logoutProvider } from "@/utils/providerAPI";
import { AuthContext } from "@/context/authContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {windowHeight} from '@/utils/dimensions'
import LogoutButton from '@/components/shared/logoutButton'


const ProfileScreen = ({navigation}) => {
    const [authState, setAuthState] = useContext(AuthContext);

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
            navigation.navigate("Welcome")
          } else {
            console.error('Failed to log out:', response);
        }
        } catch (error) {
          console.log("Error In LogOut-Provider ", error)
        }
    
      }
  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      <Text>Profile Screen</Text>
      <View style={styles.logoutButtonContainer}>
        <LogoutButton 
        handleLogoutBtn = {handleLogout}/>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    logoutButtonContainer: {
      position: "absolute",
      bottom: windowHeight * 0.1,
      alignSelf: "center",
    },
  });
  
