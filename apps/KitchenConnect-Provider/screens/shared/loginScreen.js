import {
  StyleSheet,
  View,
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
import { AuthContext } from "@/context/authContext";
import { loginProvider } from "@/utils/provider/providerAPI";

const LoginScreen = ({ navigation }) => {
 
  
  const [authState, setAuthState] = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setAuth = async (responseData, bodyData) => {
    const newAuthState = {
      authReady: true,
      authToken: responseData.authToken,
      authType: "provider",
      authData: responseData.authData,
    };

    setAuthState(newAuthState);

    try {
      await AsyncStorage.setItem("@auth", JSON.stringify(newAuthState));
      console.log("Auth state saved to AsyncStorage:", newAuthState);
    } catch (error) {
      console.error("Error saving auth state to AsyncStorage:", error);
    }
  };

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
          const responseData = await loginProvider(bodyData);
          setAuth(responseData, bodyData);
          //navigation.navigate("Provider Home");
          navigation.navigate("Provider Home", { screen: "Menu" });
          //console.log("Provider login data => " + JSON.stringify(bodyData));
        }
      }
    catch (error) {
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
      console.log(error);
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
