// components/ProfileInputBox.js

import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { windowWidth, windowHeight } from "@/utils/dimensions";

const ProfileInputBox = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  showChange,
  onChangePress,
}) => {
  return (
    <View style={styles.inputWithChange}>
      <TextInput
        style={[styles.inputBox, showChange && { flex: 1 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"#C7C7CD"}
        keyboardType={keyboardType}
      />
      {showChange && (
        <TouchableOpacity onPress={onChangePress}>
          <Text style={styles.changeText}>CHANGE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    marginVertical: windowHeight * 0.01,
    borderRadius: windowWidth * 0.04,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    paddingLeft: windowWidth * 0.05,
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoRegular",
  },
  inputWithChange: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth * 0.9,
    marginVertical: windowHeight * 0.01,
  },
  changeText: {
    color: "red",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoBold",
    marginLeft: windowWidth * 0.02,
  },
});

export default ProfileInputBox;
