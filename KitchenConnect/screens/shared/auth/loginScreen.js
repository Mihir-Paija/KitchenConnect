import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useContext } from "react";
import InputBox from "@/components/shared/forms/inputBox";
import SubmitButton from "@/components/shared/forms/submitButton";
import authAdStyles from "@/styles/shared/authAd";
import activeScreenStyles from "@/styles/shared/activeScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { loginCustomer } from "../../../utils/customerApi";
import { CustomerAuthContext } from "../../../context/authContext";
import { UserTypeContext } from "../../../context/userTypeContext";

const LoginScreen = ({ navigation }) => {
  //global states
  const [authCustomerState, setAuthCustomerState] =
    useContext(CustomerAuthContext);
  const [userType] = useContext(UserTypeContext);

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //functions
  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        const bodyData = {
          email,
          password,
        };
        if (userType === "customer") {
          const responseData = await loginCustomer(bodyData);
          setAuthCustomerState({
            authCustomerReady: true,
            authCustomerToken: responseData.authCustomerToken,
          });
          await AsyncStorage.setItem(
            "@authCustomer",
            JSON.stringify(responseData.authCustomerToken)
          );
          getLocalStorageData();
          // alert(responseData && responseData.message);
          navigation.navigate("HomeCustomer");
          console.log("Customer login data => " + JSON.stringify(bodyData));
        } else {
        }
      }
    } catch (error) {
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
      console.log(error);
    }
  };
  //temp function for local storage
  const getLocalStorageData = async () => {
    try {
      let localStorageData = await AsyncStorage.getItem("@authCustomer");
      if (localStorageData) {
        let authData = JSON.parse(localStorageData);
        console.log("Local storage => ", authData);
      }
    } catch (e) {
      console.log("Error loading local storage data:", e);
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={activeScreenStyles.screen}>
        <View style={authAdStyles.header}>
          <Text style={authAdStyles.title}>Welcome Back</Text>
        </View>
        <View style={styles.formContainer}>
          <InputBox
            input="Email"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            setValue={setEmail}
          />

          <InputBox
            input="Password"
            secureTextEntry={true}
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />

          <SubmitButton
            btnTitle={"Login"}
            handleSubmitBtn={handleLogin}
            loading={loading}
          />

          <Text style={styles.signupNavText}>
            New To Kitchen Connect?
            <Text
              style={styles.signupNav}
              onPress={() => navigation.navigate("Signup")}
            >
              {" "}
              SignUp{" "}
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    // backgroundColor: "#fff",
    width: windowWidth * 0.9,
    top: windowHeight * 0.4,
  },
  signupNavText: {
    fontSize: windowWidth * 0.035,
    fontFamily: "NunitoRegular",
    textAlign: "center",
  },
  signupNav: {
    color: "#ffa500",
  },
});
