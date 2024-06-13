import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "@/utils/dimensions";

const CurrentSubCustomerScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>CurrentSubCustomerScreen</Text>
    </View>
  );
};

export default CurrentSubCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: windowHeight * 0.15,
    // backgroundColor: "#565656",
  },
});
