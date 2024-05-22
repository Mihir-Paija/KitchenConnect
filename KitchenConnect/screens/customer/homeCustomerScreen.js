import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import FooterMenu from "../../components/shared/menu/footerMenu";
import KitchenComponent from "@/components/customer/kitchenComponent";
import LoadingScreen from "../../screens/shared/loadingScreen";
import { getKitchenCustomer } from "@/utils/customerApi";
import { windowWidth, windowHeight } from "@utils/dimensions";

const HomeCustomerScreen = ({ navigation }) => {
  //const [authCustomerState, setAuthCustomerState] = useContext(CustomerAuthContext);
  const [authState, setAuthState] = useContext(AuthContext);
  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchKitchens();

    const backAction = () => {
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
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
              {/* <Text style={styles.kitchenNumberText}>
                {kitchens.length} Tiffin Services Around You
              </Text> */}
              <FlatList
                ListHeaderComponent={
                  <Text style={styles.kitchenNumberText}>
                    {kitchens.length} Tiffin Services Around You
                  </Text>
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
});
