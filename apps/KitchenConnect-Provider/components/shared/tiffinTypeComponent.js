import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { windowWidth, windowHeight } from "@/utils/dimensions";

const TiffinTypeComponent = ({ tiffinType }) => {
  return (
    <View style={styles.tiffinTypeBox}>
      <Text style={styles.tiffinTypeTxt}>{tiffinType} Tiffin</Text>
    </View>
  );
};

export default TiffinTypeComponent;

const styles = StyleSheet.create({
  tiffinTypeTxt: {
    color: "#000",
    textAlign: "center",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoRegular",
  },
  tiffinTypeBox: {
    backgroundColor: "#FFECEC",
    paddingVertical: windowWidth * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    borderRadius: windowWidth * 0.02,
    borderWidth: 0.5,
    borderColor: "#FFECEC",
    marginVertical: windowHeight * 0.005,
    alignSelf: "center",
  },
});
