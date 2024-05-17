import { StyleSheet, Dimensions, View, TextInput } from "react-native";
import React from "react";

const screenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const InputBox = ({
  input,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  // console.log(Dimensions.get("window"));
  return (
    <View>
      {/* <Text style={styles.fieldLabel}>Name</Text> */}
      <TextInput
        style={styles.inputBox}
        placeholder={input}
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
  inputBox: {
    height: ScreenHeight * 0.05,
    marginTop: ScreenHeight * 0.01, //10
    marginBottom: ScreenHeight * 0.01,
    borderRadius: screenWidth * 0.04,
    borderWidth: 1,
    paddingLeft: screenWidth * 0.05,
    fontSize: screenWidth * 0.045, // 16
    justifyContent: "center",
    fontFamily: "NunitoRegular",
  },
});
