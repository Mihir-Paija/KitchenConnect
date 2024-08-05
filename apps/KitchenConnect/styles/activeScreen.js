import { StyleSheet, Platform, StatusBar } from "react-native";

const activeScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },
});

export default activeScreenStyles;
