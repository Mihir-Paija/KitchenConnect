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
import InputBox from "@/components/shared/forms/inputBox";
import SubmitButton from "@/components/shared/forms/submitButton";
import authAdStyles from "@/styles/shared/authAd";
import activeScreenStyles from "@/styles/shared/activeScreen";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { signupCustomer } from "../../../utils/customerApi";

const SignupScreen = ({ navigation, route }) => {
  //states
  const { type } = route.params;
  // console.log(type);
  var subtitles;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setmobile] = useState("");
  const [loading, setLoading] = useState(false);

  if (type == "customer") subtitle = "Tasty Meals Just A Click Away";
  else subtitle = "Expand Your Business";
  //functions
  const handleSignup = async () => {
    try {
      setLoading(true);
      if (!name || !email || !mobile || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        const bodyData = { name, email, mobile, password };
        if (type === "customer") {
          const responseData = await signupCustomer(bodyData);
          // alert(responseData && responseData.message);
          navigation.navigate("Login", { type: type });
        }
        console.log("register data => " + JSON.stringify(bodyData));
      }
    } catch (error) {
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
          <Text style={authAdStyles.title}>Join KitchenConnect</Text>
          <Text style={authAdStyles.subtitle}>{subtitle}</Text>
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
            value={mobile}
            setValue={setmobile}
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
              onPress={() => navigation.navigate("Login", { type: type })}
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
    width: windowWidth * 0.9,
    top: windowHeight * 0.35,
    marginBottom: windowHeight * 0.01,
  },
  loginNavText: {
    fontFamily: "NunitoRegular",
    fontSize: windowWidth * 0.035, // 18
    textAlign: "center",
    marginTop: windowHeight * 0.001,
  },
  loginNav: {
    color: "#ffa500",
  },
});
