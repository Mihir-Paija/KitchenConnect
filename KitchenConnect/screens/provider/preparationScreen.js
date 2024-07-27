import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  StatusBar,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from "react-native";
import { AuthContext } from "@/context/authContext";
import { RefreshContext } from "@/context/refreshContext";
import OrderHeader from "@/components/provider/orderHeader";
import OrderComponent from "@/components/provider/orderComponent";
import OrderCard from "@/components/provider/orderCard";
import {
  getOrders,
  optOut,
  sendOTP,
  completeOrder,
} from "../../utils/provider/orderAPI";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPModal from "./modals/OTPModal";
import LoadingScreen from "../shared/loadingScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { PermissionsAndroid } from "react-native";
import OptOutModal from "./modals/optOutModal";

const addresses = [
  "Suryajyot Lake, Gandhinagar",
  "Infocity, Gandhinagar",
  "D-Mart, Sargasan, Gandhinagar",
];

const PreparationScreen = ({ navigation }) => {
  const [authState] = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [globalRefresh, setGlobalRefresh] = useContext(RefreshContext);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [optVisible, setOptVisible] = useState(false);
  const [order, setOrder] = useState([]);

  const [type, setType] = useState("Lunch");
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [lunchAdresses, setLunchAddresses] = useState([]);
  const [dinnerAdresses, setDinnerAddresses] = useState([]);

  const [currentLocation, setCurrentLocation] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders(authState.authToken);
      console.log(response);

      setLunch(response.lunch);
      setDinner(response.dinner);
      setLunchAddresses(response.lunchAdresses);
      setDinnerAddresses(response.dinnerAdresses);
    } catch (error) {
      console.log("Error in Fetching Orders ", error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [, globalRefresh, refresh]);

  const handleMaps = () => {
    requestPermission();
    openMaps();
  };

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      console.log("Requesting");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "We need access to your location to show the route.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log("Location permission denied");
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(position.coords);
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      Alert.alert(`Couldn't Get Location`);
    }
  };

  const openMaps = () => {
    if (!currentLocation) {
      console.log("Current location not available");
      Alert.alert(`Couldn't Get Location`);
      return;
    }

    const addresses = type === "Lunch" ? lunchAdresses : dinnerAdresses;
    const waypoints = addresses
      .map((address) => encodeURIComponent(address))
      .join("|");
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    console.log(origin);

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${origin}&waypoints=${waypoints}`;
    //const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${origin}`
    console.log(url);

    Linking.openURL(url);
  };
  const generateOTP = async (item) => {
    const OTP = Math.floor(Math.random() * 9000) + 1000;
    console.log(OTP);

    try {
      await AsyncStorage.setItem("@otp", OTP.toString());
      setOrder(item);
      const bodyData = {
        otp: OTP,
        order: item,
      };
      const response = await sendOTP(authState.authToken, bodyData);
      if (response && response.status === 200) {
        setModalVisible(true);
      } else {
        Alert.alert(`Couldn't Generate OTP! Please Try Again`);
      }
    } catch (error) {
      console.log("Error Generating OTP ", error);
      Alert.alert(`Couldn't Generate OTP! Please Try Again`);
    }
  };

  const verifyOTP = async (otp, order) => {
    try {
      setLoading(true);
      setModalVisible(false);
      const storedOTP = await AsyncStorage.getItem("@otp");
      if (otp === storedOTP) {
        const response = await completeOrder(authState.authToken, order);
        if (response && response.status == 200) {
          await AsyncStorage.removeItem("@otp");
          Alert.alert(`Order Completed`);
        } else Alert.alert(`Couldn't Complete Order! Please Try Again`);
      } else Alert.alert("Incorrect OTP");
    } catch (error) {
      console.log("Error Generating OTP ", error);
      Alert.alert(`Couldn't Verify OTP! Please Try Again`);
    } finally {
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  const toggleOpt = () => {
    setOptVisible(!optVisible);
  };

  const handleOut = async (type) => {
    try {
      setLoading(true);
      const bodyData = {
        orders: type === "Lunch" ? lunch : dinner,
        type,
      };

      const response = await optOut(authState.authToken, bodyData);

      if (response && response.status === 200) {
        toggleOpt();
        Alert.alert(`Opted Out of ${type} Orders`);
        setRefresh(!refresh);
      } else {
        Alert.alert(`Couldn't Opt Out`);
      }
    } catch (error) {
      console.log("Error in Opting Out Screen ", error);
      console.log(error.message || "An Error Occured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("My Tiffins");

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <OrderHeader
        name={type}
        onPressLunch={() => setType("Lunch")}
        onPressDinner={() => setType("Dinner")}
      />
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {type === "Lunch" ? (
            <>
              {lunch.length !== 0 ? (
                <>
                  <FlatList
                    data={lunch}
                    renderItem={({ item }) => (
                      <OrderCard {...item} onPress={generateOTP} />
                    )}
                    contentContainerStyle={styles.flatList}
                  />
                </>
              ) : (
                <View style={styles.emptyView}>
                  <Text>No Lunch Deliveries Today</Text>
                </View>
              )}
            </>
          ) : null}
          {type === "Dinner" ? (
            <>
              {dinner.length !== 0 ? (
                <>
                  <FlatList
                    data={dinner}
                    renderItem={({ item }) => <OrderCard {...item} />}
                    contentContainerStyle={styles.flatList}
                  />
                </>
              ) : (
                <View style={styles.emptyView}>
                  <Text>No Dinner Deliveries Today</Text>
                </View>
              )}
            </>
          ) : null}
          <View style={styles.functions}>
            <View style={styles.map}>
              <TouchableOpacity onPress={handleMaps} style={styles.mapBtn}>
                <Image
                  source={require("@assets/shared/google-maps-icon/gMapIcon.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <Icon
              name="settings-outline"
              type="ionicon"
              style={styles.settings}
              onPress={toggleOpt}
            />
          </View>
          {optVisible ? (
            <OptOutModal
              isVisible={optVisible}
              onClose={toggleOpt}
              optLunch={() => handleOut("Lunch")}
              optDinner={() => handleOut("Dinner")}
            />
          ) : null}

          {modalVisible ? (
            <OTPModal
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              order={order}
              onVerify={verifyOTP}
            />
          ) : null}
        </>
      )}

      {/*

      {optVisible ?
                    <View style={styles.btnView}>
                      <TouchableOpacity onPress={() => handleOut('Lunch')} style={styles.btn}>
                        <Text style={styles.btnText}>Opt Out</Text>
                        <Text style={styles.btnText}>For Lunch</Text>
                      </TouchableOpacity>
                    </View>
                    : null}

      {optVisible ?
                    <View style={styles.btnView}>
                      <TouchableOpacity onPress={() => handleOut('Dinner')} style={styles.btn}>
                        <Text style={styles.btnText}>Opt Out</Text>
                        <Text style={styles.btnText}>For Dinner</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    null}
      */}
    </SafeAreaView>
  );
};

export default PreparationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // paddingTop: StatusBar.currentHeight * 1.2
  },
  flatList: {
    alignItems: "center",
    marginTop: 12,
    paddingBottom: 20,
    marginBottom: 30,
  },
  view: {
    flex: 1,
    marginVertical: 10,
    alignItems: "center",
  },
  functions: {
    //position: 'relative',
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.015,
  },
  map: {
    //position: 'relative',
    width: "90%",
    //alignItems: 'flex-start',
    fontSize: windowHeight * 0.035,
    //marginBottom: windowHeight * 0.03,
    //marginLeft: windowWidth * 0.03,
  },
  mapBtn: {
    width: "10%",
  },

  icon: {
    width: 45,
    height: 45,
  },
  settings: {
    //position: 'relative',
    //alignItems: 'flex-end',
    //marginBottom: windowHeight * 0.03,
    //marginLeft: windowWidth * 0.87,
    //right: windowWidth * 0.07,
    //bottom: windowHeight * 0.05,
    fontSize: windowHeight * 0.04,
  },
  emptyView: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  btnView: {
    //position: 'relative',
    //alignItems: 'flex-end',
    //marginTop: windowHeight * 0.3,
    marginRight: windowWidth * 0.05,
    //alignItems: 'center',
    marginBottom: windowHeight * 0.03,
  },
  btn: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.3,
    backgroundColor: "red",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  btnText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
