import React from "react";
import { StyleSheet, Dimensions, Text, View, TextInput } from "react-native";


const screenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const InputBox = ({
  input,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  value,
  setValue,
  label,
  inputBoxStyle,
}) => {
  // console.log(Dimensions.get("window"));
  return (
    <View style={styles.box}>
      {label && <Text style={styles.fieldLabel}>{input}</Text>}
      <TextInput
        style={[styles.inputBox, inputBoxStyle]}
        placeholder={label ? "" : input}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(newValue) => setValue(newValue)}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  box: {
    marginTop: ScreenHeight * 0.01, //10
    marginBottom: ScreenHeight * 0.01,
  },
  inputBox: {
    height: ScreenHeight * 0.05,
    borderRadius: screenWidth * 0.04,
    borderWidth: 1,
    paddingLeft: screenWidth * 0.05,
    fontSize: screenWidth * 0.045, // 16
    justifyContent: "center",
    fontFamily: "NunitoRegular",
  },
  fieldLabel: {
    fontSize: screenWidth * 0.05,
    fontFamily: "NunitoSemiBold",
    marginBottom: ScreenHeight * 0.005,
    marginLeft: screenWidth * 0.01,
  },
});
