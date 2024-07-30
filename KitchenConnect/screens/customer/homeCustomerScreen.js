import {
  StyleSheet,
  Text,
  SafeAreaView,
  BackHandler,
  Alert,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import FooterMenu from "../../components/shared/menu/footerMenu";
import KitchenComponent from "@/components/customer/kitchenComponent";
import LoadingScreen from "../../screens/shared/loadingScreen";
import { getKitchenCustomer } from "@/utils/APIs/customerApi";
import HeaderHomeCustomer from "@/components/customer/kitchenScreenHeader";
import { useRoute, useIsFocused } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { fetchCustomerProfile } from "../../utils/APIs/customerApi";

const HomeCustomerScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);
  const isFocused = useIsFocused();

  //states
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  //functions

  // Fetch user profile and check for FCM token and address
  const fetchProfile = async () => {
    try {
      const profile = await fetchCustomerProfile(authState.authData._id);
      setAuthState((prevState) => ({
        ...prevState,
        authData: {
          ...prevState.authData,
          fcmToken: profile.fcmToken,
          address: profile.address,
        },
      }));
      console.log("profile", profile);
      if (!profile.fcmToken) {
        console.log("fcm token");
        // navigation.replace("NotificationPermission");
      }
      if (profile.address.length === 0) {
        navigation.replace("LocationSelection");
      } else {
        setHasCheckedAuth(true); // Set the flag after performing checks
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Check for FCM token and address, navigate if necessary
  useEffect(() => {
    if (authState.authToken && !hasCheckedAuth) {
      fetchProfile();
    }
  }, []); // Run only once when the component mounts

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

  const kitchenHandler = (item) => {
    navigation.navigate("TiffinCustomer", { kitchen: item });
  };

  useEffect(() => {
    fetchKitchens();

    fetchCities();

    const backAction = () => {
      if (isFocused) {
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
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, isFocused]);

  const renderItem = ({ item }) => (
    <KitchenComponent
      title={item.kitchenName}
      subtitle={item.shortDescription}
      rating={item.rating} // Assume a default rating for now
      price={item.basePrice}
      imageSource={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
      delivery={item.provideDelivery}
      onPress={() => kitchenHandler(item)}
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

  const handlePress = () => {
    navigation.navigate("SuccessScreen", {
      msg: "Your custom message",
      navigationScreen: "SubscriptionCustomerNavigator",
    });
  };

  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {/* <Button title="Test Success Animation" onPress={handlePress} /> */}
              <FlatList
                ListHeaderComponent={
                  <HeaderHomeCustomer
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    cities={cities}
                    handleProfile={() => handleProfile()}
                    kitchensCount={kitchens.length}
                  />
                }
                data={kitchens.length > 0 ? kitchens : ["No kitchen"]}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                  kitchens.length > 0 ? item._id : index.toString()
                }
                showsVerticalScrollIndicator={false}
                style={styles.mainComponent}
              />

              <FooterMenu navigation={navigation} />
            </>
          )}
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
    marginBottom: windowHeight * 0.05,
  },
  noKitchenContainer: {
    alignSelf: "center",
    position: "absolute",
    marginTop: windowHeight * 0.5,
  },
  noKitchenText: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
  },
});
