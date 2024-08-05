import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import foodTypeIcon from "../utils/foodTypeIconPath";

// Mapping object
const foodTypeMapping = {
  Veg: "Veg",
  "Non-Veg": "NonVeg",
  Swaminarayan: "Swaminarayan",
  Jain: "Jain",
  Vegan: "Vegan",
};

const TiffinComponent = ({
  title,
  price,
  deliveryCharge,
  foodType,
  tiffinType,
  description,
  rating,
  onPress,
}) => {
  const iconKey = foodTypeMapping[foodType];
  const iconData = foodTypeIcon[iconKey];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.tiffinItem}>
        <View style={styles.tiffinDetails}>
          <Image source={iconData.path} style={iconData.foodTypeStyle} />
          <Text style={styles.tiffinTitle}>{title}</Text>
          <Text style={styles.tiffinType}>{tiffinType}</Text>
          <Text style={styles.tiffinPrice}>Starting From ₹ {price}</Text>
          <Text style={styles.tiffinDelivery}>
            ₹ {deliveryCharge} delivery charge
          </Text>
          <Text style={styles.tiffinDescription}>{description}</Text>
        </View>
        <View style={styles.sideBar}>
          <Image
            source={require("@/assets/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
            style={styles.tiffinImage}
          />
          <TouchableOpacity style={styles.bookButton} onPress={onPress}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TiffinComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFF",
    height: windowHeight * 0.2,
    width: windowWidth * 0.97,
    overflow: "hidden",
    marginBottom: windowHeight * 0.015,
    alignSelf: "center",

    //border
    borderRadius: windowWidth * 0.015,
    borderCurve: "circular",

    // borderBottomWidth: 1,
    // borderBottomColor: "#eee",
    // paddingBottom: 16,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 4,
    // Android shadow (elevation)
    elevation: 2,
  },

  tiffinItem: {
    flexDirection: "row",
  },

  tiffinDetails: {
    width: "60%",
    height: "100%",
    backgroundColor: "#ffff",
    padding: "2%",
    paddingLeft: "3%",
    paddingRight: "2%",
    justifyContent: "space-around",
  },
  tiffinTitle: {
    fontSize: windowWidth * 0.055,
    fontFamily: "NunitoSemiBold",
  },
  tiffinType: {
    fontSize: windowWidth * 0.04,
    color: "#3C3636",
    fontFamily: "NunitoRegular",
  },
  tiffinPrice: {
    fontSize: windowWidth * 0.04,
    color: "#3C3636",
    fontFamily: "NunitoRegular",
  },
  tiffinDelivery: {
    fontSize: windowWidth * 0.035,
    color: "#3C3636",
    fontFamily: "NunitoRegular",
  },
  tiffinDescription: {
    fontSize: windowWidth * 0.035,
    color: "#3C3636",
    fontFamily: "NunitoRegular",
  },
  sideBar: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "2%",
    backgroundColor: "#ffff",
  },
  tiffinImage: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.35,
    borderRadius: windowWidth * 0.02,
    marginTop: windowWidth * 0.02,
  },
  bookButton: {
    backgroundColor: "#FFECEC",
    paddingVertical: windowWidth * 0.01,
    borderRadius: windowWidth * 0.02,
    borderWidth: 0.5,
    borderColor: "#ffa500",
    width: "65%",
    marginVertical: windowHeight * 0.005,
  },
  bookButtonText: {
    color: "#ffa500",
    textAlign: "center",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoRegular",
  },
});
