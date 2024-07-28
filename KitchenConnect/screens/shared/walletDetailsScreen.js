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
import {
  addMoneyWalletCustomer,
  withdrawMoneyWalletCustomer,
} from "../../utils/APIs/customerApi";
import TransactionScreen from "./transactionScreen";

const WalletDetailsScreen = ({
  navigation,
  walletDetails,
  transactions,
  refreshWallet,
}) => {
  //gloabal states
  const [authState, setAuthState] = useContext(AuthContext);
  const customerID = authState.authData._id;
  const walletID = walletDetails.walletID;
  // console.log(walletDetails);
  // console.log(transactions);
  //states

  const [loading, setLoading] = useState(false);
  const [isAddMoneyModalVisible, setAddMoneyModalVisible] = useState(false);
  const [isWithdrawMoneyModalVisible, setWithdrawMoneyModalVisible] =
    useState(false);

  // const [refresh, setRefresh] = useState(false);
  // const [wallet, setWallet] = useState([]);

  //functions
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    // StatusBar.setBackgroundColor(styles.container.backgroundColor);
  }, []);

  const handleAddMoney = async (amount, pin) => {
    // Add money logic here
    try {
      const bodyData = { PIN: pin, amount };
      // console.log(bodyData);
      setLoading(true);
      const response = await addMoneyWalletCustomer(walletID, bodyData);
      if (response && response.status === 200) {
        Alert.alert("Money Added Successfully");
        refreshWallet();
        // setRefresh(!refresh);
      } else Alert.alert("An Error Occurred");
    } catch (error) {
      console.log("Error adding money Wallet ", error);
      Alert.alert(error.message || "An Error Occured");
    } finally {
      setLoading(false);
    }
    setAddMoneyModalVisible(false);
  };

  const handleWithdrawMoney = async (amount, pin) => {
    // Withdraw money logic here
    try {
      const bodyData = { PIN: pin, amount };
      console.log(bodyData);
      setLoading(true);
      const response = await withdrawMoneyWalletCustomer(walletID, bodyData);
      if (response && response.status === 200) {
        Alert.alert("Money withdrew Successfully");
        refreshWallet();
        // setRefresh(!refresh);
      } else Alert.alert("An Error Occurred");
    } catch (error) {
      console.log("Error withdraw money Wallet ", error);
      Alert.alert(error.message || "An Error Occured");
    } finally {
      setLoading(false);
    }
    setWithdrawMoneyModalVisible(false);
  };

  return (
    <View>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <View style={styles.headerBox}>
            <Text
              style={[styles.helloTxt, { marginBottom: windowHeight * 0.001 }]}
            >
              Hello,{" "}
            </Text>
            <Text style={styles.nameTxt}>
              {walletDetails.firstName}
              {walletDetails.lastName}
            </Text>
          </View>
          <View style={styles.amountBox}>
            <Text
              style={[
                styles.helloTxt,
                {
                  color: "#fff",
                  fontFamily: "NunitoSemiBold",
                  marginBottom: windowHeight * 0.001,
                },
              ]}
            >
              Total Balance
            </Text>
            <Text style={styles.amountTxt}>
              ₹ {walletDetails.amount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.operationLineBox}>
            <TouchableOpacity
              style={styles.operationBox}
              onPress={() => setAddMoneyModalVisible(true)}
            >
              <View style={styles.iconBox}>
                <Image
                  style={styles.icon}
                  source={require("@assets/shared/add_money.png")}
                />
              </View>
              <Text style={styles.iconTxt}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.operationBox}>
              <View style={styles.iconBox}>
                <Image
                  style={styles.icon}
                  source={require("@assets/shared/money-bill-transfer.png")}
                />
              </View>
              <Text style={styles.iconTxt}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.operationBox}
              onPress={() => setWithdrawMoneyModalVisible(true)}
            >
              <View style={styles.iconBox}>
                <Image
                  style={styles.icon}
                  source={require("@assets/shared/withdraw_money.png")}
                />
              </View>
              <Text style={styles.iconTxt}>Withdraw</Text>
            </TouchableOpacity>
          </View>
          <AddMoneyModal
            isVisible={isAddMoneyModalVisible}
            onClose={() => setAddMoneyModalVisible(false)}
            onAddMoney={handleAddMoney}
          />
          <WithdrawMoneyModal
            isVisible={isWithdrawMoneyModalVisible}
            onClose={() => setWithdrawMoneyModalVisible(false)}
            onWithdrawMoney={handleWithdrawMoney}
          />

          {transactions ? (
            <View style={{ marginBottom: windowHeight * 0.02 }}>
              <TransactionScreen transactions={transactions} />
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

export default WalletDetailsScreen;

const styles = StyleSheet.create({
  headerBox: {
    width: windowWidth * 0.95,
    alignSelf: "center",
    // backgroundColor: "#faaf",
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.002,
    marginBottom: windowHeight * 0.02,
    marginTop: windowHeight * 0.01,
  },
  helloTxt: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoRegular",
    color: "#505050",
  },
  nameTxt: {
    fontSize: windowWidth * 0.07,
    fontFamily: "NunitoSemiBold",
    // color:"#505050"
  },
  amountBox: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.17,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FFAA1D",
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.002,
    //border
    // borderWidth: windowWidth * 0.005,
    borderRadius: windowWidth * 0.03,
    marginBottom: windowHeight * 0.03,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 7,
  },
  amountTxt: {
    fontSize: windowWidth * 0.09,
    fontFamily: "NunitoExtraBold",
    color: "#ffff",
  },
  operationLineBox: {
    width: windowWidth * 0.9,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-around",
    alignContent: "center",
    // paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.002,
    marginBottom: windowHeight * 0.03,
  },
  operationBox: {
    alignSelf: "center",
    justifyContent: "center",
  },
  iconBox: {
    alignSelf: "center",
    backgroundColor: "rgba(255,156,0,0.2)",
    borderRadius: windowWidth * 0.025,
    padding: windowWidth * 0.025,
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    justifyContent: "center",
    alignContent: "center",
    // Shadow for iOS
    shadowColor: "rgba(255,156,0,0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 20,
  },
  icon: {
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    marginBottom: 2,
    alignSelf: "center",
    justifyContent: "center",
  },
  iconTxt: {
    marginTop: windowHeight * 0.005,
    color: "#000",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    textAlign: "center",
  },
  transactionBox: {
    // flex: 1,
    height: windowHeight,
    width: windowWidth * 0.98,
    backgroundColor: "#fff",
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.015,

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
    fontSize: windowWidth * 0.056,
    fontFamily: "NunitoBold",
  },
  transactionContentBox: {
    marginBottom: windowHeight * 0.05,
  },
});
