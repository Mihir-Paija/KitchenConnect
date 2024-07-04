import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import FooterMenu from "../../components/shared/menu/footerMenu";
import { AuthContext } from "@/context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import { getWallet, createWallet } from "../../utils/walletAPI";
import CreateWalletModal from "../shared/createWalletModal";
import LoadingScreen from "../shared/loadingScreen";

const WalletCustomerScreen = ({ navigation }) => {
  //gloabal states
  const [authState, setAuthState] = useContext(AuthContext);
  const [isWallet, setIsWallet] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [wallet, setWallet] = useState([]);

  //functions
  const fetchWallet = async () => {
    try {
      setLoading(true);
      const response = await getWallet(authState.authToken);

      if (response && response.status === 200) {
        console.log(response.data);
        setIsWallet(response.data.wallet);
        setWallet(response.data);
      } else Alert.alert("An Error Occurred");
    } catch (error) {
      console.log("Error Fetching Wallet ", error);
      Alert.alert(error.message || "An Error Occured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [, refresh]);

  const toggleCreateModal = () => {
    setCreateModal(!createModal);
  };

  const handleCreate = async (details) => {
    try {
      toggleCreateModal();
      setLoading(true);
      console.log(details);
      const response = await createWallet(authState.authToken, details);

      if (response && response.status === 201) {
        Alert.alert("Wallet Created Successfully");
        setRefresh(!refresh);
      } else Alert.alert("An Error Occurred");
    } catch (error) {
      console.log("Error Fetching Wallet ", error);
      Alert.alert(error.message || "An Error Occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {isWallet ? (
                <View>
                  <Text style={{ fontSize: 20 }}>
                    {wallet.firstName + " " + wallet.lastName}'s Wallet
                  </Text>
                  <Text style={{ fontSize: 20 }}>Amount: ₹{wallet.amount}</Text>
                </View>
              ) : (
                <>
                  <View style={styles.btnView}>
                    <TouchableOpacity
                      onPress={toggleCreateModal}
                      style={styles.btn}
                    >
                      <Text style={styles.btnText}>Create Wallet</Text>
                    </TouchableOpacity>
                  </View>
                  {createModal ? (
                    <CreateWalletModal
                      isVisible={createModal}
                      onClose={toggleCreateModal}
                      onCreate={handleCreate}
                      type={authState.authType}
                    />
                  ) : null}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default WalletCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  btnView: {
    position: "absolute",
    right: windowWidth * 0.33,
    bottom: windowHeight * 0.05,
  },
  btn: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.34,
    backgroundColor: "#4DAF7C",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  btnText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});
