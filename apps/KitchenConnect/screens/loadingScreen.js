import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import {windowWidth, windowHeight} from '@/utils/dimensions'
//import {AuthContext} from '@/context/authContext'

const facts = [
  "Experience the Goodness of Home Cooked Food",
  "Deliciously Made at Home",
  "Wholesome, Hearty, Homemade",
  "Home-Cooked Happiness on Every Plate",
  "Crafted With Care, Cooked With Love",
];

const LoadingScreen = () => {
  const [fact, setFact] = useState(null)
  //const [authState] = useContext(AuthContext)

  useEffect(() =>{
    const randomIndex = Math.floor(Math.random() * facts.length);
    setFact(facts[randomIndex]) 
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffa500" />
      <Text style = {styles.fact}>{fact}</Text> 
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  fact: {
    marginTop: windowHeight * 0.05,
    color: "#505050",
  },
});
