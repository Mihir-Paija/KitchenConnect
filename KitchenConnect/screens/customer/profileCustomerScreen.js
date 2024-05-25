import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
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
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }} // Placeholder image URL
              style={styles.profileImage}
            />
            <Text style={styles.name}>{authState.authData.name}</Text>
            <Text style={styles.city}>{authState.authData.city}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{authState.authData.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{authState.authData.mobile}</Text>
          </View>
          <View style={styles.logoutButtonContainer}>
            <LogoutButton handleLogoutBtn={handleLogout} />
          </View>
          {/* <FooterMenu navigation={navigation} /> */}
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default ProfileCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },
  logoutButtonContainer: {
    position: "absolute",
    bottom: windowHeight * 0.1,
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#343a40",
    padding: 15,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  city: {
    fontSize: 16,
    color: "#6c757d",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
});
