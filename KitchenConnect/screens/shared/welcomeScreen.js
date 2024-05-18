import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  const [scale] = useState(new Animated.Value(0)); // Animate scale

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1.2, // Scale up to 120% (adjust as desired)
      duration: 1000, // Animation duration (milliseconds)
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scale, {
        toValue: 1, // Scale back down to normal size
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // After animation, navigate to the main app screen
        navigation.replace("Choose");
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.appName, { transform: [{ scale }] }]}>
        KitchenConnect
      </Animated.Text>
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
    fontFamily: "NunitoExtraBoldItalic",
    color: "#ffff",
  },
});

export default WelcomeScreen;
