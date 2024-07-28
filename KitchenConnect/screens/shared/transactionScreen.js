import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  Platform,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import FooterMenu from "../../components/shared/menu/footerMenu";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import LoadingScreen from "../shared/loadingScreen";
import SubmitButton from "../../components/shared/forms/submitButton";
import BackButtonComponent from "../../components/shared/BackButton";
import AddMoneyModal from "../shared/addMoneyModal";
import WithdrawMoneyModal from "../shared/withdrawMoneyModal";
import { getTransactionHistoryCustomer } from "../../utils/APIs/customerApi";
import TransactionCard from "../../components/shared/transactionCard";
const TransactionScreen = ({ transactions }) => {
  //states
  const [loading, setLoading] = useState(false);
  // console.log(transactions);
  const renderItem = ({ item }) => {
    // console.log("item ", item);
    return <TransactionCard transaction={item} />;
  };

  return (
    <View style={styles.transactionBox}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Text style={styles.transactionBoxTxt}>Transaction History</Text>
          {transactions.length === 0 ? (
            <Text style={styles.noTransactionsText}>
              No transactions available
            </Text>
          ) : (
            <View style={styles.listBox}>
              <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.transactionContentBox}
                // style={styles.mainComponent}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  mainComponent: {
    marginBottom: windowHeight * 0.1,
  },
  listBox: {
    // backgroundColor: "#aaff",
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.17,
  },
  transactionBox: {
    // flex: 1,
    height: windowHeight * 0.6,
    width: windowWidth * 0.98,
    backgroundColor: "#fdfdfd",

    // paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.015,
    // paddingBottom: windowHeight * 0.2,
    // justifyContent: "flex-end",
    borderTopRightRadius: windowWidth * 0.05,
    borderTopLeftRadius: windowWidth * 0.05,
    alignSelf: "center",
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation property for Android
    elevation: 10,
  },
  transactionBoxTxt: {
    marginLeft: windowWidth * 0.05,
    fontSize: windowWidth * 0.056,
    fontFamily: "NunitoBold",
  },
  transactionContentBox: {
    // marginTop: windowHeight * 0.01,
    // marginBottom: windowHeight * 0.2,
  },
  noTransactionsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
