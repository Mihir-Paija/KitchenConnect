import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const SubmitButton = ({ btnTitle, handleSubmitBtn, loading }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitBtn}>
      <Text style={styles.submitText}>
        {loading ? "Please Wait..." : btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#ffa500",
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
