import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dropdown,
  TouchableWithoutFeedback,
  Button,
  Image,
  Modal,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import activeScreenStyles from "@/styles/shared/activeScreen";
import HeaderMenuCustomer from "../../components/customer/menuScreenHeader";
import TiffinComponent from "../../components/customer/tiffinComponent";
import BackButtonComponent from "../../components/shared/BackButton";
import { AuthContext } from "@/context/authContext";
import SortModalTiffinCustomer from "../../components/customer/SortModalTiffinCustome";
import FilterModalTiffinCustomer from "../../components/customer/FilterModalTiffinCustomer";
import { getTiffinCustomer } from "@/utils/APIs/customerApi";
import LoadingScreen from "@/screens/shared/loadingScreen";

const MenuCustomerScreen = ({ navigation, route }) => {
  // route params
  const { tiffin } = route.params;

  const [authState, setAuthState] = useContext(AuthContext);

  //states
  const [loading, setLoading] = useState(true);

  //functions
  const backHandler = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backHandler} />
          <HeaderMenuCustomer tiffin={tiffin} />
          <Text>MenuCustomerScreen</Text>
          <Text>{JSON.stringify(tiffin)}</Text>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default MenuCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
  },
});
