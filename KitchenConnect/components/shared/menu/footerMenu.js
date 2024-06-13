import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  View,
} from "react-native";
import React, { useContext } from "react";
import customerIconPaths from "../../../utils/customerIconpaths";
import MenuItem from "../menu/meuItem";

import { useRoute } from "@react-navigation/native";

const FooterMenu = ({ navigation }) => {
  const route = useRoute();

  //functions
  const handleFooterMenu = (key) => {
    const navigatorName = customerIconPaths[key]?.navigator;
    const screenName = customerIconPaths[key]?.screen;
    if (navigatorName) {
      navigation.navigate(navigatorName);
    } else if (screenName) {
      navigation.navigate(screenName);
    }
  };

  return (
    <SafeAreaView style={styles.footerContainer}>
      {Object.keys(customerIconPaths).map((key) => (
        <MenuItem
          key={key}
          label={key}
          icon={customerIconPaths[key]}
          isActive={route.name === customerIconPaths[key].screen}
          onPress={() => handleFooterMenu(key)}
        />
      ))}
    </SafeAreaView>
  );
};

export default FooterMenu;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingTop: "1%",
    paddingBottom: "1%",
    // borderTopWidth: 1,
    // borderColor: "#ffa500",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow (elevation)
    elevation: 20,
  },
});
