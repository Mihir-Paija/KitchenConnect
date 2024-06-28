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
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import * as NavigationBar from "expo-navigation-bar";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import foodTypeIcon from "@/utils/foodTypeIconPath";
import CheckBox from "react-native-check-box";
import SubmitButton from "../shared/forms/submitButton";
import { placeOrder } from "../../utils/APIs/customerApi";
// Mapping object
const foodTypeMapping = {
  Veg: "Veg",
  "Non-Veg": "NonVeg",
  Swaminarayan: "Swaminarayan",
  Jain: "Jain",
  Vegan: "Vegan",
};

const OrderModalCustomer = ({
  kitchen,
  tiffin,
  customerData,
  navigation,
  visible,
  setVisible,
  onClose,
}) => {
  const iconKey = foodTypeMapping[tiffin.foodType];
  const iconData = foodTypeIcon[iconKey];

  // states
  const [noOfTiffins, setNumberOfTiffins] = useState(1);
  const [tiffinPrice, setTiffinPrice] = useState(
    tiffin && tiffin.price ? parseFloat(tiffin.price.toFixed(2)) : 0
  );
  const [wantDelivery, setWantDelivery] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ensure all necessary properties are defined
  const deliveryCharge =
    tiffin && tiffin.deliveryDetails && tiffin.deliveryDetails.deliveryCharge
      ? parseFloat(tiffin.deliveryDetails.deliveryCharge)
      : 0;
  const discount = tiffin && tiffin.discount ? parseFloat(tiffin.discount) : 10;

  // Calculate prices
  const price = {
    tiffinPrice: tiffin.price,
    deliveryCharge: tiffin.deliveryDetails.deliveryCharge,
    platformCommission: 0.02,
    GST_on_tiffin: 0.05,
    GST_on_service: 0.18,
    serviceDiscount: 0,
    kitchenDiscount: 0,
  };

  const updatedOrderPrice = parseFloat(
    (noOfTiffins * price.tiffinPrice).toFixed(2)
  );
  const updatedServicePrice = parseFloat(
    (price.platformCommission * updatedOrderPrice).toFixed(2)
  );
  const updatedTaxPriceCustomer = parseFloat(
    (
      price.GST_on_tiffin * updatedOrderPrice +
      price.GST_on_service * updatedServicePrice
    ).toFixed(2)
  );
  const updatedTaxPriceProvider = parseFloat(
    (
      price.GST_on_tiffin * updatedOrderPrice -
      price.GST_on_service * updatedServicePrice
    ).toFixed(2)
  );
  const updatedDeliveryCharge = wantDelivery ? price.deliveryCharge : 0;
  const updatedDiscountCustomer = parseFloat(
    (
      ((price.serviceDiscount || 0) + (price.kitchenDiscount || 0)) *
      updatedOrderPrice
    ).toFixed(2)
  );
  const updatedDiscountProvider = parseFloat(
    ((price.kitchenDiscount || 0) * updatedOrderPrice).toFixed(2)
  );
  const updatedTotalCustomer = parseFloat(
    (
      updatedOrderPrice +
      updatedServicePrice +
      updatedTaxPriceCustomer +
      updatedDeliveryCharge -
      updatedDiscountCustomer
    ).toFixed(2)
  );
  const updatedTotalProvider = parseFloat(
    (
      updatedOrderPrice -
      updatedServicePrice +
      updatedTaxPriceProvider +
      updatedDeliveryCharge -
      updatedDiscountProvider
    ).toFixed(2)
  );

  // Payment breakdown JSON data
  const customerPaymentBreakdown = {
    orderPrice: updatedOrderPrice,
    platformCharge: updatedServicePrice,
    tax: updatedTaxPriceCustomer,
    deliveryCharge: updatedDeliveryCharge,
    discount: updatedDiscountCustomer,
    total: updatedTotalCustomer,
  };
  const kitchenPaymentBreakdown = {
    orderPrice: updatedOrderPrice,
    platformCharge: updatedServicePrice,
    tax: updatedTaxPriceProvider,
    deliveryCharge: updatedDeliveryCharge,
    discount: updatedDiscountProvider,
    total: updatedTotalProvider,
  };

  //function
  const plusTiffin = () => {
    setNumberOfTiffins(noOfTiffins + 1);
  };

  const minusTiffin = () => {
    if (noOfTiffins > 1) setNumberOfTiffins(noOfTiffins - 1);
  };

  // Update tiffin price when number of tiffins changes
  //   useEffect(() => {
  //     setTiffinPrice(parseFloat((noOfTiffins * tiffinPrice).toFixed(2)));
  //   }, [noOfTiffins]);

  useEffect(() => {
    if (visible) {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)");
    } else {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#ffffff");
    }
  }, [visible]);

  const handleSubmitBtn = () => {
    //priamry IDs
    const customerID = customerData.customerID;
    const kitchenID = kitchen.kitchenID;
    const tiffinID = tiffin._id;
    // console.log({ customerID, kitchenID, tiffinID });
    //body Data
    const bodyData = {
      customerName: customerData.customerName,
      orderDate: new Date().toISOString(),
      wantDelivery,
      noOfTiffins,
      address: "123 Main St, City, State, ZIP",
      status: "Pending",
      price,
      customerPaymentBreakdown,
      kitchenPaymentBreakdown,
    };
    // console.log("click on submit");
    // console.log(bodyData);
    placeOrder(customerID, kitchenID, tiffinID, bodyData);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalBackground}>
        <Icon
          name="closecircleo"
          style={styles.closeButton}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.contentBox,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "space-between",
              },
            ]}
          >
            <View style={styles.tiffinDetails}>
              <Image source={iconData.path} style={iconData.foodTypeStyle} />
              <Text style={styles.kitchenName}>{tiffin.name}</Text>
              <Text style={styles.tiffinName}>{kitchen.kitchenName}</Text>
              <Text style={styles.price}>
                {tiffin.tiffinType} {"Tiffin"}
              </Text>
              <Text style={styles.price}>₹{tiffin.price}</Text>
            </View>
            <View style={styles.sideBar}>
              <Image
                source={require("@/assets/customer/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png")}
                style={styles.tiffinImage}
              />
              <View style={styles.bookButton}>
                <Icon
                  name="minus"
                  type="AntDesign"
                  style={styles.icon}
                  onPress={minusTiffin}
                />
                <Text style={styles.noTiffins}>{noOfTiffins}</Text>
                <Icon
                  name="plus"
                  type="AntDesign"
                  style={styles.icon}
                  onPress={plusTiffin}
                />
              </View>
            </View>
          </View>
          <View style={[styles.contentBox]}>
            <Text style={styles.sectionTitleTxt}>Payment Details</Text>
            <View style={styles.paymentLineBox}>
              <Text style={styles.paymentTxt}>Tiffin Price : </Text>
              <Text style={styles.paymentValueTxt}> ₹ {updatedOrderPrice}</Text>
            </View>
            <View style={styles.paymentLineBox}>
              <Text style={styles.paymentTxt}>GST :</Text>
              <Text style={styles.paymentValueTxt}>
                {" "}
                ₹ {updatedTaxPriceCustomer}
              </Text>
            </View>
            <View style={styles.paymentLineBox}>
              <Text style={styles.paymentTxt}>Platform Charge :</Text>
              <Text style={styles.paymentValueTxt}>
                {" "}
                ₹ {updatedServicePrice}
              </Text>
            </View>
            {updatedDiscountCustomer > 0 && (
              <View style={styles.paymentLineBox}>
                <Text style={styles.paymentTxt}>Discount :</Text>
                <Text style={styles.paymentValueTxt}>
                  {" "}
                  - ₹ {updatedDiscountCustomer}
                </Text>
              </View>
            )}

            {wantDelivery && (
              <View style={styles.paymentLineBox}>
                <Text style={styles.paymentTxt}>Delivery Charge :</Text>
                <Text style={styles.paymentValueTxt}>
                  {" "}
                  {updatedDeliveryCharge
                    ? "₹ " + updatedDeliveryCharge
                    : "FREE"}
                </Text>
              </View>
            )}

            <View
              style={[
                styles.paymentLineBox,
                { borderColor: "#ccc", borderTopWidth: windowWidth * 0.002 },
              ]}
            >
              <Text style={styles.paymentTxt}>Grand Total:</Text>
              <Text style={styles.paymentValueTxt}>
                {" "}
                ₹ {updatedTotalCustomer}
              </Text>
            </View>

            {tiffin.deliveryDetails.availability && (
              <View
                style={[
                  styles.paymentLineBox,
                  { justifyContent: "flex-start" },
                ]}
              >
                <CheckBox
                  isChecked={wantDelivery}
                  onClick={() => setWantDelivery(!wantDelivery)}
                  boxType="square" // Optional: to specify box type (square or circle)
                  checkBoxColor="#ffa500"
                />
                <Text
                  style={[
                    styles.paymentValueTxt,
                    {
                      fontSize: windowWidth * 0.04,
                      paddingLeft: windowWidth * 0.01,
                    },
                  ]}
                >
                  Do you want Delivery?
                </Text>
              </View>
            )}
          </View>
          <View
            style={[
              styles.paymentLineBox,
              {
                backgroundColor: "rgba(128,128,128,0.2)",
                borderRadius: windowWidth * 0.02,
                width: windowWidth * 0.9,
                alignSelf: "center",
                justifyContent: "center",
                marginVertical: windowHeight * 0.008,
              },
            ]}
          >
            <Text
              style={[
                styles.paymentTxt,
                { fontSize: windowWidth * 0.04, textAlign: "center" },
              ]}
            >
              {wantDelivery
                ? `Tiffin will be deliver to you around ${tiffin.deliveryDetails.deliveryTime}`
                : `Tiffin will be ready around ${tiffin.time}`}
            </Text>
          </View>
          <View
            style={[
              styles.paymentLineBox,
              {
                backgroundColor: "rgba(256,156,0,0.2)",
                borderRadius: windowWidth * 0.02,
                width: windowWidth * 0.9,
                justifyContent: "center",
                alignSelf: "center",
                marginVertical: windowHeight * 0.008,
              },
            ]}
          >
            <Text style={[styles.paymentTxt, { fontSize: windowWidth * 0.04 }]}>
              ₹ {updatedTotalCustomer} will be automatically deducted from your
              wallet when you receive tiffin.
            </Text>
          </View>
          <SubmitButton
            btnTitle={"Place Order"}
            handleSubmitBtn={handleSubmitBtn}
            style={{ height: windowHeight * 0.05 }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default OrderModalCustomer;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: windowWidth,
    // height: windowHeight * 0.5,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: windowWidth * 0.04,
    // alignItems: "center",
  },
  closeButton: {
    alignSelf: "center",
    marginBottom: windowWidth * 0.02,
    fontSize: windowWidth * 0.09,
    color: "#ffa500",
  },
  contentBox: {
    marginVertical: windowHeight * 0.01,
    alignSelf: "center",
    backgroundColor: "#ffff",
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.9,
    padding: windowWidth * 0.03,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation property for Android
    elevation: 2,
  },
  tiffinDetails: {
    // backgroundColor: "#aaff",
    alignItems: "flex-start",
    // width: windowWidth * 0.6,
    // height: "100%",
  },
  kitchenName: {
    textAlign: "center",
    fontSize: windowWidth * 0.06,
    fontFamily: "NunitoBold",
    marginBottom: windowWidth * 0.013,
  },
  tiffinName: {
    fontSize: windowWidth * 0.044,
    fontFamily: "NunitoSemiBold",
    marginBottom: windowWidth * 0.013,
    color: "#505050",
  },
  price: {
    textAlign: "center",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    color: "#505050",
    marginBottom: windowWidth * 0.013,
  },
  sideBar: {
    // backgroundColor: "#ffaa",
    // width: windowWidth * 0.35,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    // height: "100%",
  },
  tiffinImage: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    borderRadius: windowWidth * 0.03,
  },
  tiffinType: {
    color: "#000",
    textAlign: "center",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoRegular",
  },
  bookButton: {
    flexDirection: "row",
    backgroundColor: "#FFECEC",
    paddingVertical: windowWidth * 0.005,
    paddingHorizontal: windowWidth * 0.02,
    borderRadius: windowWidth * 0.02,
    borderWidth: 0.5,
    borderColor: "#ffa500",
    marginTop: windowHeight * 0.005,
    alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
    // marginRight: windowWidth * 0.02,
    fontSize: windowWidth * 0.05,
    color: "#ffa500",
    fontFamily: "NunitoLight",
    // backgroundColor: "#ffff",
  },
  noTiffins: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoBold",
    textAlign: "center",
    marginHorizontal: windowWidth * 0.015,
  },
  sectionTitleTxt: {
    fontSize: windowWidth * 0.054,
    fontFamily: "NunitoBold",
    marginBottom: windowHeight * 0.01,
  },
  paymentLineBox: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginVertical: windowHeight * 0.005,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    paddingVertical: windowHeight * 0.008,
    justifyContent: "space-between",
    paddingHorizontal: windowWidth * 0.03,
    // backgroundColor: "#aaff",
  },
  paymentTxt: {
    textAlign: "left",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoSemiBold",
  },
  paymentValueTxt: {
    textAlign: "right",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoSemiBold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: windowHeight * 0.02,
    // alignSelf: "center",
  },
});
