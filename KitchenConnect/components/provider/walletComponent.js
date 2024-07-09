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
  import { AuthContext } from "@/context/authContext";
  import activeScreenStyles from "@/styles/shared/activeScreen";
  import { windowHeight, windowWidth } from "@/utils/dimensions"
  import LoadingScreen from "@/screens/shared/loadingScreen";
  
  const WalletComponent = ({ walletDetails, onWithdraw}) => {
    //gloabal states
    const [authState, setAuthState] = useContext(AuthContext);
    console.log(walletDetails);
  
    const [loading, setLoading] = useState(false);
    // const [refresh, setRefresh] = useState(false);
    // const [wallet, setWallet] = useState([]);
  
    //functions
  
    return (
      <SafeAreaView>
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
                {' '}
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
              <TouchableOpacity style={styles.operationBox} onPress ={onWithdraw}>
                <View style={styles.iconBox}>
                  <Image
                    style={styles.icon}
                    source={require("@assets/shared/withdraw_money.png")}
                  />
                </View>
                <Text style={styles.iconTxt}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    );
  };
  
  export default WalletComponent;
  
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
  