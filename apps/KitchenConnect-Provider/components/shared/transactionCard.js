import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import { formatDate, formatTime } from "@/utils/formateDateTime";

const TransactionCard = ({ transaction }) => {
  // console.log("transaction:", transaction);
  var type = transaction.transactionType;

  const icon = {
    Deposit: {
      name: "paper-plane",
      sign: "+",
      color: "#008000",
      style: {
        backgroundColor: "rgba(0,255,0,0.1)",
        transform: [{ rotate: "0deg" }],
      },
    },
    Orders: {
      name: "paper-plane",
      sign: "+",
      color: "#008000",
      style: {
        backgroundColor: "rgba(0,255,0,0.1)",
        transform: [{ rotate: "0deg" }],
      },
    },
    Withdraw: {
      name: "paper-plane",
      sign: "-",
      color: "#D22B2B",
      style: {
        backgroundColor: "#rgba(255,0,0,0.1)",
        transform: [{ rotate: "180deg" }],
      },
    },
    SubscriptionOrder: {
      name: "paper-plane",
      sign: "-",
      color: "#D22B2B",
      style: {
        backgroundColor: "#rgba(255,0,0,0.1)",
        transform: [{ rotate: "180deg" }],
      },
    },
    SingleOrder: {
      name: "paper-plane",
      sign: "-",
      color: "#D22B2B",
      style: {
        backgroundColor: "#rgba(255,0,0,0.1)",
        transform: [{ rotate: "180deg" }],
      },
    },
  };

  //functions
  // console.log(icon[transaction.transactionType].color);
  return (
    <View style={styles.transactionBox}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.coverPhoto}>
          <Icon
            name={icon[transaction.transactionType].name}
            type="Ionicons"
            color={icon[transaction.transactionType].color}
            size={windowWidth * 0.052}
            style={[styles.iconStyle, icon[transaction.transactionType].style]}
          />
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.partyNameTxt}>
            {transaction.transactionType === "Withdraw" ||
            transaction.transactionType === "Deposit"
              ? transaction.transactionType
              : 'Orders'}
          </Text>
          <Text style={styles.dateTxt}>
            {formatDate(transaction.createdAt)} at{" "}
            {formatTime(transaction.createdAt)}
          </Text>
        </View>
      </View>
      <View style={styles.amountBox}>
        <Text style={[styles.amountTxt, { color: icon[type].color }]}>
          {icon[type].sign} ₹ {transaction.amount}
        </Text>
      </View>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  transactionBox: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    width: windowWidth * 0.95,
    justifyContent: "space-between",
    marginVertical: windowHeight * 0.005,
    //marginHorizontal: windowWidth * 0.03,
    borderRadius: windowWidth * 0.03,
    padding: windowWidth * 0.02,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation property for Android
    elevation: 3,
  },
  coverPhoto: {},
  iconStyle: {
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.05,
  },
  detailsBox: {
    marginLeft: windowWidth * 0.03,
    // backgroundColor: "#ffaa",
    justifyContent: "space-around",
  },
  partyNameTxt: {
    fontSize: windowWidth * 0.048,
    fontFamily: "NunitoSemiBold",
    color: "#000",
  },
  dateTxt: {
    fontSize: windowWidth * 0.038,
    fontFamily: "NunitoRegular",
    color: "#505050",
  },
  amountBox: {
    justifyContent: "center",
    // backgroundColor: "#ffaa",
    marginRight: windowWidth * 0.02,
  },
  amountTxt: {
    fontSize: windowWidth * 0.048,
    fontFamily: "NunitoSemiBold",
  },
});
