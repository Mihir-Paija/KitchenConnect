import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>KitechnConnect</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA500",
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffff",
    fontStyle: "italic",
  },
});

export default WelcomeScreen;
