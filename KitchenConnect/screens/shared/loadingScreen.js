import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffa500" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
