import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  View,
} from "react-native";
import React, { useState } from "react";
import iconPaths from "../../../utils/customerIconpaths";
import MenuItem from "../menu/meuItem";

const FooterMenu = () => {
  const [activeIcon, setActiveIcon] = useState(" ");

  return (
    <SafeAreaView style={styles.footerContainer}>
      {Object.keys(iconPaths).map((key) => (
        <MenuItem
          key={key}
          label={key}
          icon={iconPaths[key]}
          isActive={activeIcon === key}
          onPress={() => setActiveIcon(key)}
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
    borderColor: "#ffa500",
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
