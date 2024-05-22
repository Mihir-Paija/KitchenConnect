import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import FooterMenu from "../../components/shared/menu/footerMenu";
import KitchenComponent from "@/components/customer/kitchenComponent";
import LoadingScreen from "../../screens/shared/loadingScreen";
import { getKitchenCustomer } from "@/utils/customerApi";
import { windowWidth, windowHeight } from "@utils/dimensions";
import MenuItem from "../../components/shared/menu/meuItem";
import RNPickerSelect from "react-native-picker-select";
import FontAwesome5 from "react-native-vector-icons/dist/FontAwesome5";

const HomeCustomerScreen = ({ navigation }) => {
  //const [authCustomerState, setAuthCustomerState] = useContext(CustomerAuthContext);
  const [authState, setAuthState] = useContext(AuthContext);

  //states
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(true);

  //functions
  const fetchKitchens = async () => {
    try {
      const response = await getKitchenCustomer();
      setKitchens(response.data);
    } catch (error) {
      console.error("Error fetching kitchens:", error);
      Alert.alert("Error", "Could not fetch kitchen data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      // const response = await axios.get(
      //   `http://api.geonames.org/searchJSON?country=IN&featureClass=P&maxRows=1000&username=your_geonames_username`
      // );
      // const cityList = response.data.geonames.map((city) => ({
      //   label: city.name,
      //   value: city.name,
      // }));
      const cityList = [
        { label: "Mumbai", value: "Mumbai" },
        { label: "Delhi", value: "Delhi" },
        { label: "Bengaluru", value: "Bengaluru" },
        { label: "Hyderabad", value: "Hyderabad" },
        { label: "Ahmedabad", value: "Ahmedabad" },
        { label: "Chennai", value: "Chennai" },
        { label: "Kolkata", value: "Kolkata" },
        { label: "Surat", value: "Surat" },
        { label: "Pune", value: "Pune" },
        { label: "Jaipur", value: "Jaipur" },
        // Add more cities as needed
      ];
      setCities(cityList);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKitchens();

    fetchCities();

    const backAction = () => {
      const currentRoute =
        navigation.getState().routes[navigation.getState().index].name;

      if (currentRoute === "HomeCustomer") {
        Alert.alert(
          "Exit!",
          "Are You Sure You Want To Exit?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            { text: "Exit", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const renderItem = ({ item }) => (
    <KitchenComponent
      title={item.kitchenName}
      subtitle={item.shortDescription}
      rating={3.5} // Assume a default rating for now
      price={item.basePrice}
      imageSource={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
      delivery={item.provideDelivery}
    />
  );

  const Profile = {
    screen: "ProfileCustomer",
    active: require("@assets/shared/icons8-male-user-ios-17-filled/icons8-male-user-100.png"),
    inactive: require("@assets/shared/icons8-male-user-ios-17-outlined/icons8-male-user-100.png"),
  };

  const handleProfile = () => {
    navigation.navigate("ProfileCustomer");
  };

  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      {authState.authToken ? (
        <>
          {/* <Text>HomeCustomerScreen</Text> */}
          {/* <Text>{JSON.stringify(authState)}</Text> */}
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <FlatList
                ListHeaderComponent={
                  <>
                    <View style={styles.header}>
                      <View style={styles.locationPickerContainer}>
                        <Image
                          source={require("@assets/shared/icons8-location-ios-17-filled/icons8-location-100.png")}
                          style={styles.Locationicon}
                        />
                        <RNPickerSelect
                          onValueChange={(value) => setSelectedCity(value)}
                          items={cities}
                          style={styles.cityPicker}
                          placeholder={{
                            label: "Select City",
                            value: null,
                          }}
                          value={selectedCity}
                          useNativeAndroidPickerStyle={false}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.menuItem}
                        onPress={handleProfile}
                      >
                        <Image
                          source={require("@assets/shared/icons8-male-user-ios-17-filled/icons8-male-user-100.png")}
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.kitchenNumberText}>
                      {kitchens.length} Tiffin Services Around You
                    </Text>
                  </>
                }
                data={kitchens}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                style={styles.mainComponent}
              />
            </>
          )}

          <FooterMenu navigation={navigation} />
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeCustomerScreen;

const styles = StyleSheet.create({
  mainComponent: {
    alignContent: "space-between",
  },
  kitchenNumberText: {
    fontSize: windowWidth * 0.06,
    fontFamily: "NunitoRegular",
    alignSelf: "flex-start",
    // marginLeft: "%",
    marginBottom: "4%",
  },
  header: {
    justifyContent: "space-between",
    marginBottom: "2%",
    // backgroundColor: "#aaff",
    flexDirection: "row",
  },
  locationPickerContainer: {
    flexDirection: "row",
    // backgroundColor: "#808",
    alignItems: "center",
  },
  cityPicker: {
    inputIOS: {
      color: "black",
      justifyContent: "flex-start", // Align text to the left
      // backgroundColor: "#ffaa",
      borderRadius: 5,
      paddingHorizontal: 10, // Add padding on both sides
      fontSize: windowHeight * 0.025, // Adjust font size if needed
      // margin: 5,
      fontFamily: "NunitoRegular",
    },
    inputAndroid: {
      color: "black",
      justifyContent: "flex-start", // Align text to the left
      // backgroundColor: "#ffaa",
      borderRadius: 5,
      paddingHorizontal: 10, // Add padding on both sides
      fontSize: windowHeight * 0.025, // Adjust font size if needed
      fontFamily: "NunitoRegular",
    },
  },
  menuItem: {
    alignItems: "flex-end",
  },
  Locationicon: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
  },
  icon: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
  },
});
