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
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { logoutCustomer } from "../services/customerAPI";
import BackButtonComponent from "../components/BackButton";
import RightButton from "../components/RightButton";
import { ScrollView } from "react-native-gesture-handler";

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

  const yourOrderHandler = () => {
    // console.log("yourOrderHandler clicked");
    navigation.navigate("HistoryCustomer");
  };
  const yourSubHandler = () => {
    // console.log("yourSubHandler clicked");
    navigation.navigate("SubscriptionCustomerNavigator");
  };
  const yourWalletHandler = () => {
    // console.log("yourWalletHandler clicked");
    navigation.navigate("WalletCustomer");
  };
  const settingHandler = () => {
    // console.log("settingHandler clicked");
    navigation.navigate("SettingCustomer");
  };
  const aboutHandler = () => {
    // console.log("aboutHandler clicked");
    navigation.navigate("AboutScreen");
  };

  // handle logout
  const handleLogout = async () => {
    try {
      const response = await logoutCustomer();
      if (response && response.status === 200) {
        setAuthState({
          authReady: true,
          authToken: "",
          authType: "",
        });
        await AsyncStorage.removeItem("@auth");
        console.log("Logged out successfully");
        navigation.navigate("Login");
      } else {
        console.error("Failed to log out:", response);
      }
    } catch (error) {
      console.log("Error In Logging Out Customer", error);
    }
  };
  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout Cancelled"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: handleLogout,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backHandler} />
          {/* <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View> */}
          <View style={styles.sectionBox}>
            <View style={styles.sectionLineBox}>
              <View style={styles.sectionLableBox}>
                <Image
                  source={{ uri: "https://via.placeholder.com/100" }} // Placeholder image URL
                  style={styles.profileImage}
                />
                <View style={styles.profileContainer}>
                  <Text style={styles.name}>{authState.authData.name}</Text>
                  <Text style={styles.city}>{authState.authData.email}</Text>
                  <Text style={styles.city}>{authState.authData.mobile}</Text>
                </View>
              </View>
              {/* <RightButton onPress={yourOrderHandler} /> */}
            </View>
          </View>

          <ScrollView>
            <TouchableOpacity
              onPress={profileHandler}
              style={[styles.sectionBox]}
            >
              <View style={styles.sectionLineBox}>
                <View style={styles.sectionLableBox}>
                  <Image
                    source={require("../assets/icons8-male-user-ios-17-outlined/icons8-male-user-100.png")}
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
                    { paddingLeft: windowWidth * 0.015 },
                  ]}
                >
                  Orders
                </Text>
              </View>

              <TouchableOpacity
                onPress={yourOrderHandler}
                style={styles.sectionLineBox}
              >
                <View style={styles.sectionLableBox}>
                  <Image
                    source={require("../assets/icons8-take-away-food-ios-17-outlined/icons8-take-away-food-100.png")}
                    style={[styles.iconImage, { borderRadius: 0 }]}
                  />
                  <Text style={styles.sectionContentText}>Your Orders</Text>
                </View>
                <RightButton onPress={yourOrderHandler} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={yourSubHandler}
                style={styles.sectionLineBox}
              >
                <View style={styles.sectionLableBox}>
                  <Image
                    source={require("../assets/icons8-grey-tiffin-ios-17-outlined/icons8-tiffin-100.png")}
                    style={styles.iconImage}
                  />
                  <Text style={styles.sectionContentText}>
                    Your Subscription
                  </Text>
                </View>
                <RightButton onPress={yourSubHandler} />
              </TouchableOpacity>
            </View>

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
                    { paddingLeft: windowWidth * 0.015 },
                  ]}
                >
                  Money
                </Text>
              </View>

              <TouchableOpacity
                onPress={yourWalletHandler}
                style={styles.sectionLineBox}
              >
                <View style={styles.sectionLableBox}>
                  <Image
                    source={require("../assets/icons8-wallet-ios-17-outlined/icons8-wallet-100.png")}
                    style={[styles.iconImage, { borderRadius: 0 }]}
                  />
                  <Text style={styles.sectionContentText}>Your Wallet</Text>
                </View>
                <RightButton onPress={yourWalletHandler} />
              </TouchableOpacity>
            </View>

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
                    { paddingLeft: windowWidth * 0.015 },
                  ]}
                >
                  More
                </Text>
              </View>

              <TouchableOpacity
                onPress={aboutHandler}
                style={styles.sectionLineBox}
              >
                <View style={styles.sectionLableBox}>
                  <Image
                    source={require("../assets/icons8-about-ios-17-outlined/icons8-about-100.png")}
                    style={styles.iconImage}
                  />
                  <Text style={styles.sectionContentText}>About</Text>
                </View>
                <RightButton onPress={aboutHandler} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={settingHandler}
                style={styles.sectionLineBox}
              >
                <View style={styles.sectionLableBox}>
                  <Image
                    source={require("../assets/icons8-setting-ios-17-outlined/icons8-setting-100.png")}
                    style={styles.iconImage}
                  />
                  <Text style={styles.sectionContentText}>Settings</Text>
                </View>
                <RightButton onPress={settingHandler} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmLogout}
                style={styles.sectionLineBox}
              >
                <View style={styles.sectionLableBox}>
                  <Image
                    source={require("../assets/icons8-logout-ios-17-outlined/icons8-logout-100.png")}
                    style={styles.iconImage}
                  />
                  <Text style={styles.sectionContentText}>Log Out</Text>
                </View>
                <RightButton onPress={confirmLogout} />
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    justifyContent: "center",
    paddingLeft: windowWidth * 0.03,
  },
  profileImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.2,
  },
  name: {
    fontSize: windowWidth * 0.055,
    fontFamily: "NunitoExtraBold",
    marginBottom: windowHeight * 0.0015,
  },
  city: {
    fontSize: windowWidth * 0.035,
    fontFamily: "NunitoRegular",
    color: "#353535",
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
    borderRadius: windowWidth * 0.1,
    padding: 0,
  },
  sectionTitleText: {
    fontSize: windowWidth * 0.054,
    color: "#000",
    fontFamily: "NunitoBold",
  },
});
