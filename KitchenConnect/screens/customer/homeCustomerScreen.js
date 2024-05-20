import { StyleSheet, Text, View, BackHandler} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from "react";
import { CustomerAuthContext } from "../../context/customerAuthContext";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import FooterMenu from "../../components/shared/menu/footerMenu";
import LogoutButton from "@/components/shared/logoutButton"; 
import { windowHeight } from '@/utils/dimensions';
import { logoutCustomer } from "@/utils/customerApi"; 

const HomeCustomerScreen = ({navigation}) => {
  //const [authCustomerState, setAuthCustomerState] = useContext(CustomerAuthContext);
  const [authState, setAuthState] = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      const response = await logoutCustomer(); 
      if (response && response.status === 200) {
        // setAuthCustomerState({
        //   authCustomerReady: true,
        //   authCustomerToken: "",
        // });
        // await AsyncStorage.removeItem('@authCustomer');
        setAuthState({
          authReady: true,
          authToken: "",
          authType: ""
        })
        await AsyncStorage.removeItem("@auth")
        console.log('Logged out successfully');
        navigation.navigate("Choose")
        
      } else {
        console.error('Failed to log out:', responseData);
      }
    } catch (error) {
      console.log("Error In Logging Out Customer", error);
    }
  };

  return (
    <View style={activeScreenStyles.screen}>
      {authState.authToken ? (
        <>
          <Text>HomeCustomerScreen</Text>
          <Text>{JSON.stringify(authState)}</Text>
          <View style={styles.logoutButtonContainer}>
            <LogoutButton handleLogoutBtn={handleLogout} />
          </View>
          <FooterMenu />
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeCustomerScreen;

const styles = StyleSheet.create({
  logoutButtonContainer: {
    position: "absolute",
    bottom: windowHeight * 0.1,
    alignSelf: "center",
  },
});
