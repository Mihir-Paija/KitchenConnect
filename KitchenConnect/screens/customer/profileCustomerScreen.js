import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
} from "react-native";
import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import FooterMenu from "../../components/shared/menu/footerMenu";
import LogoutButton from "@/components/shared/logoutButton";
import { windowHeight } from "@/utils/dimensions";
import { logoutCustomer } from "@/utils/customerApi";

const ProfileCustomerScreen = ({ navigation }) => {
  //gloabal states
  const [authState, setAuthState] = useContext(AuthContext);

  // handle logout
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
          authType: "",
        });
        await AsyncStorage.removeItem("@auth");
        console.log("Logged out successfully");
        navigation.navigate("Choose");
      } else {
        console.error("Failed to log out:", response);
      }
    } catch (error) {
      console.log("Error In Logging Out Customer", error);
    }
  };

  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      {authState.authToken ? (
        <>
          <Text>ProfileCustomerScreen</Text>
          <Text>{JSON.stringify(authState)}</Text>
          <View style={styles.logoutButtonContainer}>
            <LogoutButton handleLogoutBtn={handleLogout} />
          </View>
          <FooterMenu navigation={navigation} />
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default ProfileCustomerScreen;

const styles = StyleSheet.create({
  logoutButtonContainer: {
    position: "absolute",
    bottom: windowHeight * 0.1,
    alignSelf: "center",
  },
});
