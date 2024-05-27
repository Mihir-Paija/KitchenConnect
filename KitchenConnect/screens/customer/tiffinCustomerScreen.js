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
  Menu,
  Button,
} from "react-native";
import React, { useState } from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import activeScreenStyles from "@/styles/shared/activeScreen";
import HeaderTiffinCustomer from "../../components/customer/tiffinScreenHeader";
import TiffinComponent from "../../components/customer/tiffinComponent";
import BackButtonComponent from "../../components/shared/BackButton";
import RNPickerSelect from "react-native-picker-select";

//dummy data
const tiffinsList = [
  {
    id: "1",
    title: "Lunch Meals",
    price: "220",
    deliveryCharge: "25",
    foodType: "Veg",
    tiffinType: "Lunch",
    description: "Veg preparation | Spring mix, plant based, organic",
    rating: 4.3,
  },
  {
    id: "2",
    title: "Special Meals",
    price: "250",
    deliveryCharge: "30",
    foodType: "NonVeg",
    tiffinType: "Lunch",
    description: "Veg preparation | Spring mix, plant based, organic",
    rating: 4.3,
  },
  {
    id: "3",
    title: "Dinner Meals",
    price: "230",
    deliveryCharge: "20",
    foodType: "Vegan",
    tiffinType: "Dinner",
    description: "Veg preparation | Spring mix, plant based, organic",
    rating: 4.3,
  },
  {
    id: "4",
    title: "Lunch Meals",
    price: "220",
    deliveryCharge: "25",
    foodType: "Jain",
    tiffinType: "Dinner",
    description: "Veg preparation | Spring mix, plant based, organic",
    rating: 4.3,
  },
  {
    id: "5",
    title: "Special Meals",
    price: "250",
    deliveryCharge: "30",
    foodType: "Swaminarayan",
    tiffinType: "Dinner",
    description: "Veg preparation | Spring mix, plant based, organic",
    rating: 4.3,
  },
];

const TiffinCustomerScreen = ({ navigation, route }) => {
  // route params
  const { kitchen } = route.params;

  //states
  const [tiffins, setTiffins] = useState(tiffinsList);
  const [sortCriteria, setSortCriteria] = useState("rating");

  //functions
  const tiffinHandler = (item) => {
    // navigation.navigate("TiffinCustomer", { kitchen: item });
    console.log("tiffin item pressed : ", item.title);
  };

  const backHandler = () => {
    navigation.goBack();
  };

  const sortTiffins = (criteria) => {
    let sortedTiffins;
    if (criteria === "price") {
      sortedTiffins = [...tiffins].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (criteria === "rating") {
      sortedTiffins = [...tiffins].sort((a, b) => b.rating - a.rating);
    }
    setTiffins(sortedTiffins);
  };

  const onSortChange = (value) => {
    setSortCriteria(value);
    sortTiffins(value);
  };

  // render flatlist item
  const renderItem = ({ item }) => (
    <TiffinComponent
      title={item.title}
      price={item.price}
      deliveryCharge={item.deliveryCharge}
      foodType={item.foodType}
      tiffinType={item.tiffinType}
      description={item.description}
      rating={item.rating}
      onPress={() => tiffinHandler(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackButtonComponent onPress={backHandler} />
      <HeaderTiffinCustomer kitchen={kitchen} />

      <View style={styles.filterSortContainer}>
        <Text style={styles.filterSortText}>Sort by:</Text>
        <RNPickerSelect
          onValueChange={(value) => onSortChange(value)}
          items={[
            { label: "Price", value: "price" },
            { label: "Rating", value: "rating" },
          ]}
          style={pickerSelectStyles}
          value={sortCriteria}
        />
      </View>

      <FlatList
        data={tiffins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.tiffinList}
      />
    </SafeAreaView>
  );
};

export default TiffinCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
  },
  filterSortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  filterSortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  filterSortText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: 150,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
