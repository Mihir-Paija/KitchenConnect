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
import HeaderTiffinCustomer from "../../components/customer/tiffinScreenHeader";
import TiffinComponent from "../../components/customer/tiffinComponent";
import BackButtonComponent from "../../components/shared/BackButton";
import { AuthContext } from "@/context/authContext";
import SortModalTiffinCustomer from "../../components/customer/SortModalTiffinCustome";
import FilterModalTiffinCustomer from "../../components/customer/FilterModalTiffinCustomer";
import { getTiffinCustomer } from "@/utils/APIs/customerApi";
import LoadingScreen from "@/screens/shared/loadingScreen";

//dummy data
// const tiffinsList = [
//   {
//     id: "1",
//     title: "Lunch Meals",
//     price: "220",
//     deliveryCharge: "25",
//     foodType: "Veg",
//     tiffinType: "Lunch",
//     description: "Veg preparation | Spring mix, plant based, organic",
//     rating: 4.3,
//   },
//   {
//     id: "2",
//     title: "Special Meals",
//     price: "250",
//     deliveryCharge: "30",
//     foodType: "Non-Veg",
//     tiffinType: "Lunch",
//     description: "Veg preparation | Spring mix, plant based, organic",
//     rating: 4.3,
//   },
//   {
//     id: "3",
//     title: "Dinner Meals",
//     price: "230",
//     deliveryCharge: "20",
//     foodType: "Vegan",
//     tiffinType: "Dinner",
//     description: "Veg preparation | Spring mix, plant based, organic",
//     rating: 4.3,
//   },
//   {
//     id: "4",
//     title: "Lunch Meals",
//     price: "220",
//     deliveryCharge: "25",
//     foodType: "Jain",
//     tiffinType: "Dinner",
//     description: "Veg preparation | Spring mix, plant based, organic",
//     rating: 4.3,
//   },
//   {
//     id: "5",
//     title: "Special Meals",
//     price: "250",
//     deliveryCharge: "30",
//     foodType: "Swaminarayan",
//     tiffinType: "Dinner",
//     description: "Veg preparation | Spring mix, plant based, organic",
//     rating: 4.3,
//   },
// ];

const TiffinCustomerScreen = ({ navigation, route }) => {
  // route params
  const { kitchen } = route.params;
  // console.log(kitchen);
  const [authState, setAuthState] = useContext(AuthContext);

  //states
  const [loading, setLoading] = useState(true);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("rating");
  const [filterCriteria, setFilterCriteria] = useState({
    tiffinType: "all",
    foodType: "all",
  });
  const [tiffins, setTiffins] = useState([]);
  const [originalTiffins, setOriginalTiffins] = useState([]);

  //functions

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor(styles.container.backgroundColor);
  });

  const fetchTiffins = async (kitchenId) => {
    try {
      const response = await getTiffinCustomer(kitchenId);
      const tiffinsList = response.data;
      setTiffins(tiffinsList);
      setOriginalTiffins(tiffinsList);
      // console.log("Tiffins:", tiffinsList);
    } catch (error) {
      console.error("Failed to fetch tiffins:", error);
    } finally {
      setLoading(false);
    }
  };

  const tiffinHandler = (item, KitchenData) => {
    navigation.navigate("MenuCustomer", { tiffin: item, kitchen: KitchenData });
    // console.log("tiffin item pressed : ", item.name);
  };

  const backHandler = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchTiffins(kitchen._id); // Adjust if the kitchen ID is stored differently
  }, [kitchen]);

  useEffect(() => {
    let sortedTiffins = [...originalTiffins];

    if (sortCriteria === "priceHighToLow") {
      sortedTiffins.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortCriteria === "priceLowToHigh") {
      sortedTiffins.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortCriteria === "rating") {
      sortedTiffins.sort((a, b) => b.rating - a.rating);
    }

    let filteredTiffins = [...sortedTiffins];

    if (filterCriteria.tiffinType !== "all") {
      filteredTiffins = filteredTiffins.filter(
        (tiffin) => tiffin.tiffinType === filterCriteria.tiffinType
      );
    }

    if (filterCriteria.foodType !== "all") {
      filteredTiffins = filteredTiffins.filter(
        (tiffin) => tiffin.foodType === filterCriteria.foodType
      );
    }

    setTiffins(filteredTiffins);
  }, [sortCriteria, filterCriteria, , originalTiffins]);

  const onSortChange = (criteria) => {
    setSortCriteria(criteria);
    setSortModalVisible(false);
  };

  const onFilterChange = (type, value) => {
    setFilterCriteria((prev) => ({ ...prev, [type]: value }));
    setFilterModalVisible(false);
  };

  // render flatlist item
  const renderItem = ({ item }) => {
    KitchenData = { kitchenID: kitchen._id, kitchenName: kitchen.kitchenName };
    return (
      <TiffinComponent
        title={item.name}
        price={item.price}
        deliveryCharge={item.deliveryDetails.deliveryCharge}
        foodType={item.foodType}
        tiffinType={item.tiffinType}
        description={item.shortDescription}
        rating={item.rating}
        onPress={() => tiffinHandler(item, KitchenData)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <BackButtonComponent onPress={backHandler} />
              <HeaderTiffinCustomer kitchen={kitchen} />

              <View style={styles.filterSortContainer}>
                <TouchableOpacity
                  style={[
                    styles.sortContainer,
                    sortCriteria !== "rating" && {
                      borderColor: "#ffa500",
                      backgroundColor: "#FFECEC",
                    },
                  ]}
                  onPress={() => setSortModalVisible(true)}
                >
                  <Text style={styles.filterSortText}>Sort</Text>
                  <Image
                    source={
                      sortCriteria === "rating"
                        ? require("../../assets/sort_filter/icons8-tune-ios-17-outlined/icons8-tune-100.png")
                        : require("../../assets/sort_filter/icons8-tune-ios-17-filled/icons8-tune-100.png")
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sortContainer,
                    (filterCriteria.tiffinType !== "all" ||
                      filterCriteria.foodType !== "all") && {
                      backgroundColor: "#FFECEC",
                      borderColor: "#ffa500",
                    },
                  ]}
                  onPress={() => setFilterModalVisible(true)}
                >
                  <Text style={styles.filterSortText}>Filter</Text>
                  <Image
                    source={
                      filterCriteria.tiffinType === "all" &&
                      filterCriteria.foodType === "all"
                        ? require("../../assets/sort_filter/icons8-filter-ios-17-outlined/icons8-filter-100.png")
                        : require("../../assets/sort_filter/icons8-filter-ios-17-filled/icons8-filter-100.png")
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <SortModalTiffinCustomer
                visible={sortModalVisible}
                onClose={() => setSortModalVisible(false)}
                onSortChange={onSortChange}
                sortCriteria={sortCriteria}
              />

              <FilterModalTiffinCustomer
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onFilterChange={onFilterChange}
                filterCriteria={filterCriteria}
              />

              {tiffins.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    No Tiffin Available for this Kitchen...
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={tiffins}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                  style={styles.tiffinList}
                />
              )}
            </>
          )}
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default TiffinCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
  },
  filterSortContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    marginBottom: windowHeight * 0.005,
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: windowWidth * 0.02,
    // backgroundColor: "#ffaa",
    marginBottom: windowHeight * 0.01,
  },
  filterSortText: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoRegular",
    marginRight: windowWidth * 0.02,
  },
  sortContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: windowWidth * 0.05,
    padding: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.03,
    marginLeft: windowWidth * 0.02,
  },
  icon: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
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
