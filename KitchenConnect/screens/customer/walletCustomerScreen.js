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
import {
  getWalletCustomer,
  createWalletCustomer,
} from "../../utils/APIs/customerApi";
import CreateWalletModal from "../shared/createWalletModal";
import LoadingScreen from "../shared/loadingScreen";
import SubmitButton from "../../components/shared/forms/submitButton";
import BackButtonComponent from "../../components/shared/BackButton";
import WalletDetailsScreen from "../shared/walletDetailsScreen";
const WalletCustomerScreen = ({ navigation }) => {
  //gloabal states
  const [authState, setAuthState] = useContext(AuthContext);
  const [isWallet, setIsWallet] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [wallet, setWallet] = useState([]);

  const customerID = authState.authData._id;
  //functions
  const fetchWallet = async () => {
    try {
      setLoading(true);
      const response = await getWalletCustomer(customerID);

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
      const response = await createWalletCustomer(customerID, details);

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

  const backHandler = () => {
    navigation.goBack();
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
                <>
                  <BackButtonComponent onPress={backHandler} />
                  <WalletDetailsScreen
                    navigation={navigation}
                    walletDetials={wallet}
                  />
                  <FooterMenu navigation={navigation} />
                </>
              ) : (
                <>
                  <BackButtonComponent onPress={backHandler} />
                  <SafeAreaView
                    style={[styles.container, { justifyContent: "center" }]}
                  >
                    <SubmitButton
                      btnTitle={"Get Started"}
                      style={styles.submitBtnStyle}
                      txtStyle={styles.submitBtnTextStyle}
                      handleSubmitBtn={() => setCreateModal(true)}
                    />
                  </SafeAreaView>
                  {createModal ? (
                    <CreateWalletModal
                      isVisible={createModal}
                      onClose={() => setCreateModal(false)}
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
    backgroundColor: "#ffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  submitBtnStyle: {
    marginBottom: 0,
    marginTop: 0,
    // width: windowWidth * 0.4,
    // height: windowHeight * 0.04,
    backgroundColor: "#ffa500",
    borderColor: "#ffa500",
    borderWidth: 1,
  },
  submitBtnTextStyle: {
    color: "#ffff",
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
  },
  btnView: {
    position: "absolute",
    right: windowWidth * 0.33,
    bottom: windowHeight * 0.05,
  },
});
