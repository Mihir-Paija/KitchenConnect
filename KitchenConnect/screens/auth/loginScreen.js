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
import InputBox from "../../components/forms/inputBox";
import SubmitButton from "../../components/forms/submitButton";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Join KitchenConnect</Text>
        <Text style={styles.subtitle}>Tasty Meals Just A Click Away</Text>
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
    </View>
  );
};

export default LoginScreen;

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
  signupNavText: {
    fontSize: 18,
    textAlign: "center",
  },
  signupNav: {
    color: "#ffa500",
  },
});
