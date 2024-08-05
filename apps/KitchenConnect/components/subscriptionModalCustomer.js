import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as NavigationBar from "expo-navigation-bar";
import { getSubscriptionPlanCustomer } from "../services/customerAPI";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// const subscriptionPlans = [
//   {
//     id: "1",
//     title: "Basic Plan",
//     price: "100 ",
//     duration: "week",
//     discount: null,
//     benefits: ["Choose 1 dish per meal"],
//   },
//   {
//     id: "2",
//     title: "Standard Plan",
//     price: "2000 ",
//     discount: "10",
//     duration: "fortNight",
//     benefits: ["Choose 2 dishes per meal", "Free delivery"],
//   },
//   {
//     id: "3",
//     title: "Premium Plan",
//     price: "4000",
//     discount: "20",
//     duration: "Month",
//     benefits: [
//       "Choose 3 dishes per meal",
//       "Free dessert with every meal",
//       "Free delivery",
//     ],
//   },
// ];

const SubscriptionModalCustomer = ({
  kitchen,
  tiffin,
  navigation,
  visible,
  setVisible,
  onClose,
}) => {
  const [loading, setLoading] = useState(true);
  const [subPlans, setSubPlans] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [navigationBarColor, setnavigationBarColor] = useState("#ffffff");
  const subscriptionTypes = {
    7: "week",
    14: "fortNight",
    30: "month",
  };

  const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice =
      parseFloat(price) - (parseFloat(price) * parseFloat(discount)) / 100;
    return discountedPrice.toFixed(2);
  };

  const fetchSubPlans = async (kitchenID, tiffinID) => {
    try {
      console.log("hi");
      const response = await getSubscriptionPlanCustomer(kitchenID, tiffinID);
      setSubPlans(response.data.subscriptions);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch subsription plan :", error);
    } finally {
      // console.log("subPlans:", subPlans);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubPlans(tiffin.providerID, tiffin._id);
  }, [tiffin]);

  const submitHandler = (item) => {
    // console.log("submit clicked");
    setVisible(!visible);
    navigation.navigate("SubscribeCustomer", {
      subscriptionPlan: item,
      kitchenID: tiffin.providerID,
      tiffinID: tiffin._id,
      kitchen,
      tiffin,
    });
  };

  useEffect(() => {
    const checkNavigationBarColor = async () => {
      const color = await NavigationBar.getBackgroundColorAsync();
      //   console.log("Current navigation bar color:", color);
    };
    const setNavigationBarColor = async (color) => {
      try {
        await NavigationBar.setBackgroundColorAsync(color);
        const updatedColor = await NavigationBar.getBackgroundColorAsync();
        // console.log("Updated navigation bar color:", updatedColor);
      } catch (error) {
        console.error("Error setting navigation bar color:", error);
      }
    };
    checkNavigationBarColor();
    if (visible) {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)");
      setNavigationBarColor("rgba(0, 0, 0, 0.5)");
    } else {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#ffffff");
      setNavigationBarColor("#ffffff");
      scrollX.setValue(0);
    }
  }, [visible]);

  useEffect(() => {
    const applyNavigationBarColor = async () => {
      await NavigationBar.setBackgroundColorAsync(navigationBarColor);
    };
    applyNavigationBarColor();
  }, [navigationBarColor]);

  const renderPlan = ({ item, index }) => {
    const inputRange = [
      (index - 1) * windowWidth,
      index * windowWidth,
      (index + 1) * windowWidth,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [windowWidth * 0.05, 0, -windowWidth * 0.05],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.card,
          { transform: [{ scale }, { translateX }] },
          //   index === 0 &&
          //     {
          //       // marginLeft: windowWidth * 0.11,
          //       // marginRight: windowWidth * 0.11,
          //     },
          //   index === subscriptionPlans.length - 1 &&
          //     {
          //       // marginLeft: windowWidth * 0.11,
          //       // marginRight: windowWidth * 0.11,
          //     },
          //   index != 0 &&
          //     index != subscriptionPlans.length - 1 &&
          //     {
          //       //   marginLeft: windowWidth * 0.11,
          //       //   marginRight: windowWidth * 0.11,
          //     },
          { opacity },
        ]}
      >
        {item.priceDetails.kitchenDiscount ||
        item.priceDetails.serviceDiscount ? (
          <View style={styles.discountBox}>
            <Text style={styles.discountText}>
              {(item.priceDetails.kitchenDiscount +
                item.priceDetails.serviceDiscount) *
                100}
              % OFF
            </Text>
          </View>
        ) : (
          <></>
        )}
        <Text style={styles.planTitle}>{item.title}</Text>
        <View style={styles.priceContainer}>
          {item.priceDetails.kitchenDiscount ||
          item.priceDetails.serviceDiscount ? (
            <Text style={styles.originalPrice}>
              ₹{item.priceDetails.price * item.days}
            </Text>
          ) : (
            <></>
          )}
          <Text
            style={
              item.priceDetails.kitchenDiscount ||
              item.priceDetails.serviceDiscount
                ? styles.discountedPrice
                : styles.planPrice
            }
          >
            ₹
            {item.priceDetails.kitchenDiscount ||
            item.priceDetails.serviceDiscount
              ? calculateDiscountedPrice(
                  item.priceDetails.price,
                  item.priceDetails.kitchenDiscount +
                    item.priceDetails.serviceDiscount
                ) * item.days
              : item.priceDetails.price * item.days}{" "}
            / {subscriptionTypes[item.days]}
          </Text>
        </View>

        <Text style={styles.benefitText}>{item.description}</Text>

        <TouchableOpacity
          onPress={() => submitHandler(item)}
          style={styles.getStartedButton}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* <TouchableWithoutFeedback onPress={onClose}> */}
      <SafeAreaView style={styles.modalBackground}>
        {/* <Icon
          name="close-circle-outline"
          style={styles.closeButton}
          onPress={onClose}
        /> */}
        {/* <TouchableWithoutFeedback> */}
        <View style={styles.modalContainer}>
          {/* <Text style={styles.title}>Choose Your Plan</Text> */}
          <Animated.FlatList
            data={subPlans}
            renderItem={renderPlan}
            keyExtractor={(item) => item._id}
            horizontal
            pagingEnabled
            // snapToInterval={windowWidth * 0.85} // Ensure snapping to each card
            // decelerationRate="fast" // Smooth scrolling
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            contentContainerStyle={[
              styles.flatListContent,
              { paddingHorizontal: 0 },
            ]}
          />
          <View style={styles.dotContainer}>
            {subPlans.map((_, index) => {
              const opacity = scrollX.interpolate({
                inputRange: [
                  (index - 1) * windowWidth,
                  index * windowWidth,
                  (index + 1) * windowWidth,
                ],
                outputRange: [0.5, 1, 0.5],
                extrapolate: "clamp",
              });
              return (
                <Animated.View key={index} style={[styles.dot, { opacity }]} />
              );
            })}
          </View>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </SafeAreaView>
      {/* </TouchableWithoutFeedback> */}
    </Modal>
  );
};

export default SubscriptionModalCustomer;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: windowWidth,
    height: windowHeight * 0.45,
    // backgroundColor: "#aaff",
    borderRadius: 10,
    padding: windowWidth * 0.04,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "center",
    marginBottom: windowWidth * 0.01,
    fontSize: windowWidth * 0.12,
    color: "#ffa500",
  },
  title: {
    fontSize: windowWidth * 0.045,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffff",
  },
  trialText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  flatListContent: {
    alignItems: "center",
    // backgroundColor: "#ffaa",
    // paddingVertical: 10,
  },
  card: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.35,
    backgroundColor: "#ffff",
    borderRadius: windowWidth * 0.05,
    padding: windowWidth * 0.05,
    marginLeft: windowWidth * 0.11,
    marginRight: windowWidth * 0.11,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  discountBox: {
    position: "absolute",
    top: -windowWidth * 0.03,
    right: -windowWidth * 0.03,
    backgroundColor: "#ffa500",
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowWidth * 0.01,
    borderTopLeftRadius: windowWidth * 0.05,
    borderBottomRightRadius: windowWidth * 0.05,
    zIndex: 1,
  },
  discountText: {
    color: "#ffffff",
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoBold",
  },
  planTitle: {
    fontSize: windowWidth * 0.08,
    fontFamily: "NunitoBold",
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: windowWidth * 0.02,
  },

  planPrice: {
    fontSize: windowHeight * 0.032,
    fontFamily: "NunitoBold",
    color: "#ffa500",
    marginBottom: windowWidth * 0.01,
  },
  originalPrice: {
    fontSize: windowHeight * 0.02,
    fontFamily: "NunitoSemiBold",
    textDecorationLine: "line-through",
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: windowHeight * 0.02,
    fontFamily: "NunitoSemiBold",

    color: "#ffa500",
    marginBottom: 5,
  },
  benefitText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  getStartedButton: {
    alignSelf: "center",
    marginTop: windowHeight * 0.1,
    paddingVertical: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.045,
    backgroundColor: "#ffa500",
    borderRadius: windowWidth * 0.02,
    // position: "absolute",
  },
  getStartedText: {
    color: "#ffffff",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoBold",
  },
  dotContainer: {
    flexDirection: "row",
    marginTop: windowHeight * 0.02,
    justifyContent: "center",
  },
  dot: {
    width: windowWidth * 0.02,
    height: windowWidth * 0.02,
    borderRadius: windowWidth * 0.04,
    backgroundColor: "#ffa500",
    marginHorizontal: windowWidth * 0.01,
  },
});
