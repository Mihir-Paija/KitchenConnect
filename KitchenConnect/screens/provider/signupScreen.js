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
import React, { useContext, useState } from "react";
import InputBox from "@/components/shared/forms/inputBox";
import SubmitButton from "@/components/shared/forms/submitButton";
import authAdStyles from "@/styles/shared/authAd";
import activeScreenStyles from "@/styles/shared/activeScreen";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { signupProvider } from "@/utils/providerAPI";
import { UserTypeContext } from "@/context/userTypeContext";

const SignupScreen = ({ navigation }) => {
  //states
  const [userType] = useContext(UserTypeContext)
  // console.log(type);
  var subtitles;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [businessName, setBusinessName] = useState("")
  const [loading, setLoading] = useState(false);


  //functions
  const handleSignup = async () => {
    try {
      setLoading(true);
      if (!name || !email || !mobile || !password || !businessName || !city) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        const bodyData = { name, email, mobile, password, businessName, city };
        if (userType === "provider") {
          const responseData = await signupProvider(bodyData);
          Alert.alert("SignUp Successful! Please Login");
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
          <Text style={authAdStyles.subtitle}>Expand Your Business</Text>
        </View>
        <View style={styles.formContainer}>
          <InputBox
            input="Name"
            value={name}
            setValue={setName}
          />
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
          <InputBox
            input="Business Name"
            value={businessName}
            setValue={setBusinessName}
          />
          <InputBox
            input="Mobile No."
            keyboardType="phone-pad"
            value={mobile}
            setValue={setMobile}
          />
          <InputBox
            input="City"
            value={city}
            setValue={setCity}
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
