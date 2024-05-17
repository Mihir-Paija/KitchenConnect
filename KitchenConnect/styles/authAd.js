import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const authAdStyles = StyleSheet.create({
  header: {
    position: "absolute",
    // backgroundColor: "#ffaa",
    top: ScreenHeight * 0.2,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: screenWidth * 0.08,
    fontWeight: "bold",
  },
  subtitle: {
    alignItems: "center",
    textAlign: "center",
    marginTop: "3%",
    fontSize: screenWidth * 0.035,
  },
});

export default authAdStyles;
