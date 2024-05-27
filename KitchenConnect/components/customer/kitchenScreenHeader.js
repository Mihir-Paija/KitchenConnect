import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { windowWidth, windowHeight } from "@utils/dimensions";

const HeaderHomeCustomer = ({
  selectedCity,
  setSelectedCity,
  cities,
  handleProfile,
  kitchensCount,
}) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.locationPickerContainer}>
          <Image
            source={require("@assets/shared/icons8-location-ios-17-filled/icons8-location-100.png")}
            style={styles.locationIcon}
          />
          <RNPickerSelect
            onValueChange={(value) => setSelectedCity(value)}
            items={cities}
            style={styles.cityPicker}
            placeholder={{ label: "Select City", value: null }}
            value={selectedCity}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={handleProfile}>
          <Image
            source={require("@assets/shared/icons8-male-user-ios-17-filled/icons8-male-user-100.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.kitchenNumberText}>
        {kitchensCount} Tiffin Services Around You
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    marginBottom: "2%",
    flexDirection: "row",
  },
  locationPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityPicker: {
    inputIOS: {
      color: "black",
      justifyContent: "flex-start",
      borderRadius: 5,
      paddingHorizontal: 10,
      fontSize: windowHeight * 0.025,
      fontFamily: "NunitoRegular",
    },
    inputAndroid: {
      color: "black",
      justifyContent: "flex-start",
      borderRadius: 5,
      paddingHorizontal: 10,
      fontSize: windowHeight * 0.025,
      fontFamily: "NunitoRegular",
    },
  },
  menuItem: {
    alignItems: "flex-end",
  },
  locationIcon: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
  },
  icon: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
  },
  kitchenNumberText: {
    fontSize: windowWidth * 0.06,
    fontFamily: "NunitoRegular",
    alignSelf: "flex-start",
    marginBottom: "4%",
  },
});

export default HeaderHomeCustomer;
