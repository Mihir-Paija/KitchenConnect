import React, { useEffect, useRef } from "react";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";
import Video from "react-native-video";

const SuccessScreen = ({ navigation, route }) => {
  const { msg, navigationScreen } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigationScreen) {
        console.log("Animation finished!");
        navigation.replace(navigationScreen);
      } else {
        navigation.replace("HomeCustomerNavigator");
      }
    }, 1000); // Adjust the timeout to match the length of your animation

    return () => clearTimeout(timer);
  }, [navigation, navigationScreen]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{msg}</Text>
      {/* <Image
        source={require("../../assets/annimations/Animation - 1721768493689.gif")}
        style={styles.gif}
      /> */}
      <LottieView
        source={require("../../assets/annimations/Animation - 1721767927400.json")}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          if (route.params && route.params.navigationScreen) {
            navigation.navigate(navigationScreen);
          }
        }}
        style={styles.animation}
        resizeMode="cover" // Ensures the animation covers the view without distortion
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  gif: {
    width: 300,
    height: 300,
  },
});

export default SuccessScreen;
