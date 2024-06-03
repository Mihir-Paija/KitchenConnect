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
  ScrollView,
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
import Collapsible from "react-native-collapsible";
import { FontAwesome, Feather } from "@expo/vector-icons";
import MenuItemComponent from "../../components/customer/menuItemComponent";
import DaysScrollView from "../../components/customer/dayScrollViewMenuCustomer";

const MenuCustomerScreen = ({ navigation, route }) => {
  //dummyy data
  const menuData = {
    Mon: [
      { name: "Sev Tameta", quantity: "250", unit: "g", id: 1 },
      { name: "Butter Roti", quantity: "4", unit: "pcs", id: 2 },
      { name: "Jeera Rice", quantity: "250", unit: "g", id: 3 },
      { name: "Dal", quantity: "250", unit: "ml", id: 4 },
      { name: "Butter Milk", quantity: "200", unit: "ml", id: 5 },
    ],
    Tue: [
      { name: "Dal Tadka", quantity: "250", unit: "g", id: 1 },
      { name: "Steamed Rice", quantity: "200", unit: "g", id: 2 },
      { name: "Chapati", quantity: "4", unit: "pcs", id: 3 },
      { name: "Salad", quantity: "100", unit: "g", id: 4 },
      { name: "Sweet", quantity: "1", unit: "pcs", id: 5 },
    ],
    Wed: [
      { name: "Aloo Paratha", quantity: "2", unit: "pcs", id: 1 },
      { name: "Curd", quantity: "100", unit: "g", id: 2 },
      { name: "Pickle", quantity: "50", unit: "g", id: 3 },
      { name: "Sweet", quantity: "1", unit: "pcs", id: 4 },
    ],
    Thu: [
      { name: "Chole", quantity: "250", unit: "g", id: 1 },
      { name: "Pulao", quantity: "200", unit: "g", id: 2 },
      { name: "Salad", quantity: "100", unit: "g", id: 3 },
      { name: "Sweet", quantity: "1", unit: "pcs", id: 4 },
    ],
    Fri: [
      { name: "Paneer Butter Masala", quantity: "250", unit: "g", id: 1 },
      { name: "Naan", quantity: "2", unit: "pcs", id: 2 },
      { name: "Jeera Rice", quantity: "200", unit: "g", id: 3 },
      { name: "Salad", quantity: "100", unit: "g", id: 4 },
      { name: "Sweet", quantity: "1", unit: "pcs", id: 5 },
    ],
    Sat: [
      { name: "Kadhi Chawal", quantity: "250", unit: "g", id: 1 },
      { name: "Mix Veg", quantity: "200", unit: "g", id: 2 },
      { name: "Chapati", quantity: "4", unit: "pcs", id: 3 },
      { name: "Salad", quantity: "100", unit: "g", id: 4 },
      { name: "Sweet", quantity: "1", unit: "pcs", id: 5 },
    ],
    Sun: [
      { name: "Rajma Chawal", quantity: "250", unit: "g", id: 1 },
      { name: "Raita", quantity: "100", unit: "g", id: 2 },
      { name: "Pickle", quantity: "50", unit: "g", id: 3 },
      { name: "Sweet", quantity: "1", unit: "pcs", id: 4 },
    ],
  };

  // route params
  const { tiffin } = route.params;

  const [authState, setAuthState] = useContext(AuthContext);
  //states
  const [loading, setLoading] = useState(true);
  //   const [dayModalVisible, setDayModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Mon");

  //functions
  const backHandler = () => {
    navigation.goBack();
  };

  const onDayChange = (day) => {
    setSelectedDay(day);
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backHandler} />
          <HeaderMenuCustomer tiffin={tiffin} />
          <DaysScrollView selectedDay={selectedDay} onDayChange={onDayChange} />
          <FlatList
            data={menuData[selectedDay]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MenuItemComponent
                name={item.name}
                quantity={item.quantity}
                unit={item.unit}
              />
            )}
            contentContainerStyle={styles.mealList}
          />
          {/* <Text>MenuCustomerScreen</Text>
            <Text>{JSON.stringify(tiffin)}</Text> */}
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
  buttonContainer: {
    flexDirection: "row",
    marginBottom: windowHeight * 0.005,
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: windowWidth * 0.02,
    marginBottom: windowHeight * 0.01,
  },
  dayContainer: {
    backgroundColor: "#747C7rgba(116, 124, 124, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(116, 124, 124, 1)",
    borderRadius: windowWidth * 0.05,
    padding: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.03,
    marginLeft: windowWidth * 0.02,
  },
  dayText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginRight: windowWidth * 0.01,
  },
  icon: {
    fontSize: windowWidth * 0.04,
    color: "black",
  },
  mealList: {
    paddingBottom: 16,
  },
});
