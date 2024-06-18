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
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import LogoutButton from "@/components/shared/logoutButton";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { logoutCustomer } from "@/utils/APIs/customerApi";
import BackButtonComponent from "@/components/shared/BackButton";
import RightButton from "../../components/shared/RightButton";

const ProfileCustomerScreen = ({ navigation }) => {
  //gloabal states
  const [authState, setAuthState] = useContext(AuthContext);

  //functions
  const backHandler = () => {
    navigation.goBack();
  };

  const profileHandler = () => {
    // console.log("profile clicked");
    navigation.navigate("ProfileDetailsCustomer");
  };

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
          <BackButtonComponent onPress={backHandler} />
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

          <TouchableOpacity
            onPress={profileHandler}
            style={[styles.sectionBox]}
          >
            <View style={styles.sectionLineBox}>
              <View style={styles.sectionLableBox}>
                <Image
                  source={require("../../assets/shared/icons8-male-user-ios-17-outlined/icons8-male-user-100.png")}
                  style={styles.iconImage}
                />
                <Text style={styles.sectionContentText}>Your Profile</Text>
              </View>
              <RightButton onPress={profileHandler} />
            </View>
          </TouchableOpacity>

          <View style={styles.sectionBox}>
            <View
              style={[
                styles.sectionLineBox,
                {
                  borderLeftWidth: windowWidth * 0.02,
                  borderColor: "#ffa500",
                  borderRadius: windowWidth * 0.02,
                  // marginLeft: windowWidth * 0.01,
                  paddingLeft: 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.sectionTitleText,
                  { paddingLeft: windowWidth * 0.01 },
                ]}
              >
                Orders
              </Text>
            </View>
            <View style={styles.sectionLineBox}>
              <View style={styles.sectionLableBox}>
                <Image
                  source={require("../../assets/shared/icons8-male-user-ios-17-outlined/icons8-male-user-100.png")}
                  style={styles.iconImage}
                />
                <Text style={styles.sectionContentText}>Your Profile</Text>
              </View>
              <RightButton onPress={profileHandler} />
            </View>
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
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
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
  sectionBox: {
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: windowWidth * 0.95,
    paddingVertical: windowHeight * 0.002,
    marginVertical: windowHeight * 0.01,
    // paddingHorizontal: windowWidth * 0.04,
    borderRadius: windowWidth * 0.04,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation property for Android
    elevation: 2,
  },
  sectionLineBox: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // backgroundColor: "#aaff",
    paddingVertical: windowHeight * 0.01,
    marginVertical: windowHeight * 0.001,
    paddingHorizontal: windowWidth * 0.04,
  },
  sectionLableBox: {
    // backgroundColor: "#aaff",
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },
  sectionContentText: {
    fontSize: windowWidth * 0.05,
    color: "#3C3636",
    fontFamily: "NunitoSemiBold",
  },
  iconImage: {
    height: windowWidth * 0.07,
    width: windowWidth * 0.07,
    marginRight: windowWidth * 0.025,
  },
  sectionTitleText: {
    fontSize: windowWidth * 0.054,
    color: "#000",
    fontFamily: "NunitoBold",
  },
});
