import { StyleSheet, Text, View, SafeAreaView, BackHandler } from "react-native";
import React, { useContext } from "react";
//import { AuthContext } from "../../context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import SubmitButton from '@/components/shared/forms/submitButton'
import LogoutButton from "@/components/shared/logoutButton";
import {windowHeight} from '@/utils/dimensions'
import { logoutProvider } from "../../utils/providerAPI";
import { AuthContext } from "@/context/authContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
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
        <Text>Add Your Menu</Text>
        {/* {authState.authToken ? ( // Check for authToken in authState
          <>
            <Text>Add Your Menu</Text>
            <Text>{JSON.stringify(authState)}</Text>
          </>
        ) : (
          <Text>You are not authorized to access this screen.</Text>
        )} */}

      <View style={styles.logoutButtonContainer}>
        <LogoutButton 
        handleLogoutBtn = {handleLogout}/>
      </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutButtonContainer: {
    position: "absolute",
    bottom: windowHeight * 0.1,
    alignSelf: "center",
  },
});

export default HomeScreen;