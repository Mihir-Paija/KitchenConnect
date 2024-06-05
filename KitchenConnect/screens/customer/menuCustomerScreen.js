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
import { getMenuCustomer } from "@/utils/APIs/customerApi";
import LoadingScreen from "@/screens/shared/loadingScreen";
import Collapsible from "react-native-collapsible";
import { FontAwesome, Feather } from "@expo/vector-icons";
import MenuItemComponent from "../../components/customer/menuItemComponent";
import DaysScrollView from "../../components/customer/dayScrollViewMenuCustomer";

const MenuCustomerScreen = ({ navigation, route }) => {
  //dummyy data
  //   const menuData = {
  //     Mon: [
  //       { name: "Sev Tameta", quantity: "250", unit: "g", id: 1 },
  //       { name: "Butter Roti", quantity: "4", unit: "pcs", id: 2 },
  //       { name: "Jeera Rice", quantity: "250", unit: "g", id: 3 },
  //       { name: "Dal", quantity: "250", unit: "ml", id: 4 },
  //       { name: "Butter Milk", quantity: "200", unit: "ml", id: 5 },
  //     ],
  //     Tue: [
  //       { name: "Dal Tadka", quantity: "250", unit: "g", id: 1 },
  //       { name: "Steamed Rice", quantity: "200", unit: "g", id: 2 },
  //       { name: "Chapati", quantity: "4", unit: "pcs", id: 3 },
  //       { name: "Salad", quantity: "100", unit: "g", id: 4 },
  //       { name: "Sweet", quantity: "1", unit: "pcs", id: 5 },
  //     ],
  //     Wed: [
  //       { name: "Aloo Paratha", quantity: "2", unit: "pcs", id: 1 },
  //       { name: "Curd", quantity: "100", unit: "g", id: 2 },
  //       { name: "Pickle", quantity: "50", unit: "g", id: 3 },
  //       { name: "Sweet", quantity: "1", unit: "pcs", id: 4 },
  //     ],
  //     Thu: [
  //       { name: "Chole", quantity: "250", unit: "g", id: 1 },
  //       { name: "Pulao", quantity: "200", unit: "g", id: 2 },
  //       { name: "Salad", quantity: "100", unit: "g", id: 3 },
  //       { name: "Sweet", quantity: "1", unit: "pcs", id: 4 },
  //     ],
  //     Fri: [
  //       { name: "Paneer Butter Masala", quantity: "250", unit: "g", id: 1 },
  //       { name: "Naan", quantity: "2", unit: "pcs", id: 2 },
  //       { name: "Jeera Rice", quantity: "200", unit: "g", id: 3 },
  //       { name: "Salad", quantity: "100", unit: "g", id: 4 },
  //       { name: "Sweet", quantity: "1", unit: "pcs", id: 5 },
  //     ],
  //     Sat: [
  //       { name: "Kadhi Chawal", quantity: "250", unit: "g", id: 1 },
  //       { name: "Mix Veg", quantity: "200", unit: "g", id: 2 },
  //       { name: "Chapati", quantity: "4", unit: "pcs", id: 3 },
  //       { name: "Salad", quantity: "100", unit: "g", id: 4 },
  //       { name: "Sweet", quantity: "1", unit: "pcs", id: 5 },
  //     ],
  //     Sun: [
  //       { name: "Rajma Chawal", quantity: "250", unit: "g", id: 1 },
  //       { name: "Raita", quantity: "100", unit: "g", id: 2 },
  //       { name: "Pickle", quantity: "50", unit: "g", id: 3 },
  //       { name: "Sweet", quantity: "1", unit: "pcs", id: 4 },
  //     ],
  //   };

  // route params
  const { tiffin } = route.params;

  const [authState, setAuthState] = useContext(AuthContext);
  //states
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [menuList, setMenuList] = useState([]);

  //functions
  const backHandler = () => {
    navigation.goBack();
  };

  const onDayChange = (day) => {
    setSelectedDay(day);
  };

  const fetchMenu = async (kitchenID, tiffinID) => {
    try {
      const response = await getMenuCustomer(kitchenID, tiffinID);
      const menuData = response.data.menu;
      const formattedMenu = menuData.reduce((acc, menuItem) => {
        acc[menuItem.day] = menuItem.items;
        return acc;
      }, {});

      setMenuList(formattedMenu);
      console.log("menuList:", formattedMenu);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu(tiffin.providerID, tiffin._id);
  }, [tiffin]);

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <BackButtonComponent onPress={backHandler} />
              <HeaderMenuCustomer tiffin={tiffin} />
              <DaysScrollView
                selectedDay={selectedDay}
                onDayChange={onDayChange}
              />

              {!menuList[selectedDay] || menuList[selectedDay].length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    No Menu Available on this Day...
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={menuList[selectedDay]}
                  keyExtractor={(item) => item._id.toString()}
                  renderItem={({ item }) => (
                    <MenuItemComponent
                      name={item.itemName}
                      quantity={item.quantity}
                      unit={item.unit}
                    />
                  )}
                  contentContainerStyle={styles.mealList}
                />
              )}
              {/* <Text>MenuCustomerScreen</Text>
            <Text>{JSON.stringify(tiffin)}</Text> */}
            </>
          )}
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
  mealList: {
    paddingBottom: 16,
  },
  emptyContainer: {
    alignSelf: "center",
    position: "absolute",
    marginTop: windowHeight * 0.5,
  },
  emptyText: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
  },
});