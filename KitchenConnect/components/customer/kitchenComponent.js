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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RatingComponent from "./ratingComponent";

const KitchenComponent = ({
  title,
  subtitle,
  rating,
  price,
  imageSource,
  delivery,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.kitchenContainer} onPress={onPress}>
      <Image source={imageSource} style={styles.kitchenImage} />
      <View style={styles.kitchenContent}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.rightSideBox}>
          <RatingComponent rating={rating} />
          <View style={styles.priceContainer}>
            {delivery ? (
              <Image
                source={require("@assets/shared/icons8-delivery-scooter-ios-17-glyph/icons8-delivery-scooter-90.png")}
                style={styles.deliveryIcon}
              />
            ) : (
              <Text> </Text>
            )}
            <Text style={styles.priceText}>Starting from ₹{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default KitchenComponent;

const styles = StyleSheet.create({
  kitchenContainer: {
    backgroundColor: "#ffff",
    height: windowHeight * 0.3,
    width: windowWidth * 0.95,
    overflow: "hidden",
    marginBottom: "7%",
    //border
    borderRadius: windowWidth * 0.03,
    borderCurve: "circular",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 40 },
    shadowOpacity: 1,
    shadowRadius: 4,
    // Android shadow (elevation)
    elevation: 3,
  },
  kitchenImage: {
    width: "100%",
    height: "75%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
  },
  kitchenContent: {
    flexDirection: "row",
    padding: "2%",
    paddingLeft: "3%",
    paddingRight: "2%",
    width: "100%",
    height: "25%",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderColor: "#888",
  },
  content: {
    backgroundColor: "#fff",
    marginRight: "2%",
    width: "53%",
  },
  title: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
  },
  subtitle: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginVertical: "1%",
  },
  rightSideBox: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    width: "46%",
  },
  ratingContainer: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#ffa500",
    paddingHorizontal: "4%",
    paddingVertical: "1%",
    //border
    borderRadius: windowWidth * 0.02,
  },
  ratingText: {
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoSemiBold",
    textAlign: "center",
    color: "#fff",
    marginRight: "2%",
  },
  priceContainer: {
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: "4%",
    paddingVertical: "1%",
    justifyContent: "space-between",
  },
  deliveryIcon: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },
  priceText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginLeft: "2%",
  },
});
