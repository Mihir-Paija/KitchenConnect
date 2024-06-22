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
import SubscriptionModalCustomer from "../../components/customer/subscriptionModalCustomer";
import { getMenuCustomer } from "@/utils/APIs/customerApi";
import LoadingScreen from "@/screens/shared/loadingScreen";
import Collapsible from "react-native-collapsible";
import { FontAwesome, Feather } from "@expo/vector-icons";
import MenuItemComponent from "../../components/customer/menuItemComponent";
import DaysScrollView from "../../components/customer/dayScrollViewMenuCustomer";
import SubmitButton from "../../components/shared/forms/submitButton";
import OrderModalCustomer from "../../components/customer/orderModalCustomer";

const MenuCustomerScreen = ({ navigation, route }) => {
  //dummyy data
  //   const menuDummyList = {
  //     Mon: [
  //       { itemName: "Sev Tameta", quantity: "250", unit: "g", _id: 1 },
  //       { itemName: "Butter Roti", quantity: "4", unit: "pcs", _id: 2 },
  //       { itemName: "Jeera Rice", quantity: "250", unit: "g", _id: 3 },
  //       { itemName: "Dal", quantity: "250", unit: "ml", _id: 4 },
  //       { itemName: "Butter Milk", quantity: "200", unit: "ml", _id: 5 },
  //       { itemName: "Sev Tameta", quantity: "250", unit: "g", _id: 6 },
  //       { itemName: "Butter Roti", quantity: "4", unit: "pcs", _id: 7 },
  //       { itemName: "Jeera Rice", quantity: "250", unit: "g", _id: 8 },
  //       { itemName: "Dal", quantity: "250", unit: "ml", _id: 9 },
  //       { itemName: "Butter Milk", quantity: "200", unit: "ml", _id: 10 },
  //     ],
  //     Tue: [
  //       { itemName: "Dal Tadka", quantity: "250", unit: "g", _id: 1 },
  //       { itemName: "Steamed Rice", quantity: "200", unit: "g", _id: 2 },
  //       { itemName: "Chapati", quantity: "4", unit: "pcs", _id: 3 },
  //       { itemName: "Salad", quantity: "100", unit: "g", _id: 4 },
  //       { itemName: "Sweet", quantity: "1", unit: "pcs", _id: 5 },
  //     ],
  //     Wed: [
  //       { itemName: "Aloo Paratha", quantity: "2", unit: "pcs", _id: 1 },
  //       { itemName: "Curd", quantity: "100", unit: "g", _id: 2 },
  //       { itemName: "Pickle", quantity: "50", unit: "g", _id: 3 },
  //       { itemName: "Sweet", quantity: "1", unit: "pcs", _id: 4 },
  //     ],
  //     Thu: [
  //       { itemName: "Chole", quantity: "250", unit: "g", _id: 1 },
  //       { itemName: "Pulao", quantity: "200", unit: "g", _id: 2 },
  //       { itemName: "Salad", quantity: "100", unit: "g", _id: 3 },
  //       { itemName: "Sweet", quantity: "1", unit: "pcs", _id: 4 },
  //     ],
  //     Fri: [
  //       { itemName: "Paneer Butter Masala", quantity: "250", unit: "g", _id: 1 },
  //       { itemName: "Naan", quantity: "2", unit: "pcs", _id: 2 },
  //       { itemName: "Jeera Rice", quantity: "200", unit: "g", _id: 3 },
  //       { itemName: "Salad", quantity: "100", unit: "g", _id: 4 },
  //       { itemName: "Sweet", quantity: "1", unit: "pcs", _id: 5 },
  //     ],
  //     Sat: [
  //       { itemName: "Kadhi Chawal", quantity: "250", unit: "g", _id: 1 },
  //       { itemName: "Mix Veg", quantity: "200", unit: "g", _id: 2 },
  //       { itemName: "Chapati", quantity: "4", unit: "pcs", _id: 3 },
  //       { itemName: "Salad", quantity: "100", unit: "g", _id: 4 },
  //       { itemName: "Sweet", quantity: "1", unit: "pcs", _id: 5 },
  //     ],
  //     Sun: [
  //       { itemName: "Rajma Chawal", quantity: "250", unit: "g", _id: 1 },
  //       { itemName: "Raita", quantity: "100", unit: "g", _id: 2 },
  //       { itemName: "Pickle", quantity: "50", unit: "g", _id: 3 },
  //       { itemName: "Sweet", quantity: "1", unit: "pcs", _id: 4 },
  //     ],
  //   };

  // route params
  const { tiffin, kitchen } = route.params;

  const [authState, setAuthState] = useContext(AuthContext);
  //states
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [menuList, setMenuList] = useState([]);
  const [subscriptionModalVisible, setSubscriptionModalVisible] =
    useState(false);
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  //functions
  const backHandler = () => {
    navigation.goBack();
  };

  const subscriptionHandler = () => {
    // console.log("click on subscription");
    setSubscriptionModalVisible(true);
  };

  const orderHandler = () => {
    console.log("click on order");
    setOrderModalVisible(true);
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
      //   console.log("menuList:", formattedMenu);
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
                <>
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
                  <SubmitButton
                    btnTitle={"Order"}
                    handleSubmitBtn={orderHandler}
                    loading={loading}
                  />
                  <SubmitButton
                    btnTitle={"Subscriptions"}
                    handleSubmitBtn={subscriptionHandler}
                    loading={loading}
                  />
                  <OrderModalCustomer
                    kitchen={kitchen}
                    tiffin={tiffin}
                    navigation={navigation}
                    visible={orderModalVisible}
                    setVisible={setOrderModalVisible}
                    onClose={() => setOrderModalVisible(false)}
                  />
                  <SubscriptionModalCustomer
                    navigation={navigation}
                    visible={subscriptionModalVisible}
                    setVisible={setSubscriptionModalVisible}
                    onClose={() => setSubscriptionModalVisible(false)}
                  />
                </>
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
