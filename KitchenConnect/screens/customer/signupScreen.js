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
import React, { useState, useContext, useEffect } from "react";
import InputBox from "@components/shared/forms/inputBox";
import SubmitButton from "@components/shared/forms/submitButton";
import authAdStyles from "@/styles/shared/authAd";
import activeScreenStyles from "@/styles/shared/activeScreen";
import { windowWidth, windowHeight } from "@utils/dimensions";
import { signupCustomer } from "@utils/APIs/customerApi";
import { UserTypeContext } from "@context/userTypeContext";

const SignupScreen = ({ navigation }) => {
  //global states
  const [userType] = useContext(UserTypeContext);

  //states

  // console.log(type);
  var subtitle;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setmobile] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyboard, setKeyboard] = useState(false);

  //functions
  const handleSignup = async () => {
    try {
      setLoading(true);
      if (!name || !email || !mobile || !password || !city) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      } else {
        setLoading(false);
        const bodyData = { name, email, mobile, password, city };
        if (userType === "customer") {
          const responseData = await signupCustomer(bodyData);
          // alert(responseData && responseData.message);
          navigation.navigate("NotificationPermission");
          // navigation.navigate("LocationSelection");
          // navigation.navigate("Login");
          console.log("Customer register data => " + JSON.stringify(bodyData));
        }
      }
    } catch (error) {
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboard(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboard(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={activeScreenStyles.screen}>
        <View style={keyboard ? styles.header : authAdStyles.header}>
          <Text style={authAdStyles.title}>Join KitchenConnect</Text>
          <Text style={authAdStyles.subtitle}>
            Tasty Meals Just A Click Away
          </Text>
        </View>
        <View
          style={keyboard ? styles.keyboardFormContainer : styles.formContainer}
        >
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
          <InputBox input="City" value={city} setValue={setCity} />

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
    width: windowWidth * 0.9,
    top: windowHeight * 0.35,
    marginBottom: windowHeight * 0.01,
  },
  header: {
    position: "absolute",
    // backgroundColor: "#ffaa",
    top: windowHeight * 0.1,
    justifyContent: "center",
    alignContent: "center",
  },
  keyboardFormContainer: {
    flex: 1,
    width: windowWidth * 0.9,
    top: windowHeight * 0.2,
    marginBottom: windowHeight * 0.02,
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
