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
import React, { useState } from "react";
import InputBox from "@/components/shared/forms/inputBox";
import SubmitButton from "@/components/shared/forms/submitButton";
import authAdStyles from "@/styles/shared/authAd";
import activeScreenStyles from "@/styles/shared/activeScreen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { loginCustomer } from "../../../utils/customerApi";

const LoginScreen = ({ navigation, route }) => {
  //states
  const { type } = route.params;
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
        if (type === "customer") {
          const responseData = await loginCustomer(bodyData);
          await AsyncStorage.setItem("@auth", JSON.stringify(bodyData));
          getLocalStorageData();
          alert(responseData && responseData.message);
        }
        console.log("login data => " + JSON.stringify(bodyData));
      }
    } catch (error) {
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
      console.log(error);
    }
  };
  //temp function for local storage
  const getLocalStorageData = async () => {
    let _data = await AsyncStorage.getItem("@auth");
    console.log("local storage : ", _data);
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
              onPress={() => navigation.navigate("Signup", { type: type })}
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
