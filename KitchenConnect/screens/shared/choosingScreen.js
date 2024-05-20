import { useState, useContext } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { windowWidth, windowHeight } from "@utils/dimensions";
import { UserTypeContext } from "../../context/userTypeContext";
import SubmitButton from "@components/shared/forms/submitButton";
import activeScreenStyles from "@styles/shared/activeScreen";

const Choose = ({ navigation }) => {
  //global states
  const [userType, setUserType] = useContext(UserTypeContext);

  //states
  const [loading, setLoading] = useState(false);

  const handleCustomer = () => {
    setUserType("customer");
    navigation.navigate("CustomerAuthNavigator");
  };

  const handleProvider = () => {
    setUserType("provider");
    navigation.navigate("ProviderAuthNavigator");
  };

  return (
    <SafeAreaView
      style={[activeScreenStyles.screen, { justifyContent: "flex-start" }]}
    >
      <View style={styles.heading}>
        <Text style={styles.title}>Who Are You?</Text>
      </View>
      <View style={styles.btnWrapper}>
        <View style={styles.btns}>
          <SubmitButton
            btnTitle={"Customer"}
            handleSubmitBtn={handleCustomer}
            loading={loading}
            style={{
              width: windowWidth * 0.4,
              height: windowHeight * 0.15,
              marginRight: windowWidth * 0.02,
              borderRadius: 20,
            }}
          />
          <SubmitButton
            btnTitle={"Tiffin Provider"}
            handleSubmitBtn={handleProvider}
            loading={loading}
            style={{
              width: windowWidth * 0.4,
              height: windowHeight * 0.15,
              marginLeft: windowWidth * 0.02,
              borderRadius: 20,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowHeight * 0.1, // Adjust this to move the heading down if needed
  },
  title: {
    fontSize: 24,
    fontFamily: "NunitoRegular",
    color: "black",
  },
  btnWrapper: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btns: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    flexDirection: "row",
    paddingTop: 20,
  },
  btn: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    margin: 10,
  },
});

export default Choose;
