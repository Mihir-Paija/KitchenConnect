import {
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import InputBox from "../../../components/shared/forms/inputBox";
import SubmitButton from "../../../components/shared/forms/submitButton";
import authAdStyles from "../../../styles/shared/authAd";
import activeScreenStyles from "../../../styles/shared/activeScreen";

const screenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const SignupScreen = ({ navigation }) => {
  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  //functions
  const handleSignup = () => {
    try {
      setLoading(true);
      if (!name || !email || !phone || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        console.log(
          "register data => " + JSON.stringify({ name, email, phone, password })
        );
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
          <InputBox input="Name" value={name} setValue={setName} />
          <InputBox
            input="Email"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            setValue={setEmail}
          />
          <InputBox
            input="Mobile No."
            keyboardType="phone-pad"
            value={phone}
            setValue={setPhone}
          />
          <InputBox
            input="Password"
            secureTextEntry={true}
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />

          <SubmitButton
            btnTitle={"SignUp"}
            handleSubmitBtn={handleSignup}
            loading={loading}
          />

          <Text style={styles.loginNavText}>
            Already have an account?
            <Text
              style={styles.loginNav}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}
              Login{" "}
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    // backgroundColor: "#ffff",
    width: screenWidth * 0.9,
    top: ScreenHeight * 0.4,
    marginBottom: ScreenHeight * 0.01,
  },
  loginNavText: {
    fontFamily: "NunitoRegular",
    fontSize: screenWidth * 0.045, // 18
    textAlign: "center",
  },
  loginNav: {
    color: "#ffa500",
  },
});
