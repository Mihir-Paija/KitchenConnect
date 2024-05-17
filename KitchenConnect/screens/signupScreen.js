import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import InputBox from "../components/forms/inputBox";
import SubmitButton from "../components/forms/submitButton";

const SignupScreen = () => {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Join KitchenConnect</Text>
        <Text style={styles.subtitle}>Tasty Meals Just A Click Away</Text>
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

        {/* <Text>{JSON.stringify({ name, email, password, phone }, null, 4)}</Text> */}
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    backgroundColor: "#fff",
    top: 115,
    alignContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    alignItems: "center",
    // fontFamily: "Nunito-Regular",
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "90%",
    marginTop: 315,
    marginBottom: 10,
  },
});
