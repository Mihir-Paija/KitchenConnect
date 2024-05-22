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
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { CustomerAuthContext } from "../../context/customerAuthContext";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import FooterMenu from "../../components/shared/menu/footerMenu";
import KitchenComponent from "@/components/customer/kitchenComponent";
import { windowHeight } from "@/utils/dimensions";
import { logoutCustomer } from "@/utils/customerApi";

const HomeCustomerScreen = ({ navigation }) => {
  //const [authCustomerState, setAuthCustomerState] = useContext(CustomerAuthContext);
  const [authState, setAuthState] = useContext(AuthContext);

  useEffect(() => {
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

  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      {authState.authToken ? (
        <>
          {/* <Text>HomeCustomerScreen</Text> */}
          {/* <Text>{JSON.stringify(authState)}</Text> */}
          <ScrollView style={styles.mainComponent}>
            <KitchenComponent
              title="Padma Kamal"
              subtitle="Delicious vegetarian meals"
              rating="3.5"
              price="3000"
              imageSource={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
              delivery={true}
            />
            <KitchenComponent
              title="Gourmet Kitchen"
              subtitle="Exquisite non-veg dishes"
              rating="4.0"
              price="5000"
              imageSource={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
              delivery={false}
            />
            <KitchenComponent
              title="Gourmet Kitchen"
              subtitle="Exquisite non-veg dishes"
              rating="4.0"
              price="5000"
              imageSource={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
              delivery={false}
            />
            <KitchenComponent
              title="Gourmet Kitchen"
              subtitle="Exquisite non-veg dishes"
              rating="4.0"
              price="5000"
              imageSource={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
              delivery={false}
            />
            <KitchenComponent
              title="Gourmet Kitchen"
              subtitle="Exquisite non-veg dishes"
              rating="4.0"
              price="5000"
              imageSource={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
              delivery={false}
            />
          </ScrollView>

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
});
