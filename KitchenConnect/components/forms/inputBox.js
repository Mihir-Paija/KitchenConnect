import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const InputBox = ({
  input,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  value,
  setValue,
}) => {
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
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 20,
    fontSize: 16,
  },
});
