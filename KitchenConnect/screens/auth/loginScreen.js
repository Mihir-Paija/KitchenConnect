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
import InputBox from "../../components/forms/inputBox";
import SubmitButton from "../../components/forms/submitButton";
import authAdStyles from "../../styles/authAd";
import activeScreenStyles from "../../styles/activeScreen";

const screenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const LoginScreen = ({ navigation }) => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //functions
  const handleLogin = () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        console.log("login data => " + JSON.stringify({ email, password }));
      }
    } catch (error) {
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
          <Text style={authAdStyles.title}>Join KitchenConnect</Text>
          <Text style={authAdStyles.subtitle}>
            Tasty Meals Just A Click Away
          </Text>
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
            Didn't have an account?
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
    width: screenWidth * 0.9,
    top: ScreenHeight * 0.4,
  },
  signupNavText: {
    fontSize: screenWidth * 0.045,
    fontFamily: "NunitoRegular",
    textAlign: "center",
  },
  signupNav: {
    color: "#ffa500",
  },
});
