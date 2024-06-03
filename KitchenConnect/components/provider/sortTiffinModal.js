import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { windowHeight, windowWidth } from "@/utils/dimensions";

const SortTiffinModal = ({
  visible,
  onClose,
  onSortChange,
  sortCriteria,
}) => {
  useEffect(() => {
    if (visible) {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)");
    } else {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#ffffff"); 
    }
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          {/* <StatusBar barStyle="dark-content" backgroundColor={"#4A4B4D"} /> */}
          <Icon
            name="close-circle-outline"
            type="ionicon"
            style={styles.closeButton}
            onPress={onClose}
          />
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Sort by:</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("rating")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "rating" && styles.selectedOption,
                ]}
              >
                Rating: High to Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("priceHighToLow")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "priceHighToLow" && styles.selectedOption,
                ]}
              >
                Price: High to Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("priceLowToHigh")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "priceLowToHigh" && styles.selectedOption,
                ]}
              >
                Price: Low to High
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


export default SortTiffinModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoBold",
    marginBottom: windowHeight * 0.02,  // Example adjustment
  },
  option: {
    paddingVertical: windowHeight * 0.01,  // Example adjustment
  },
  optionText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
  },
  selectedOption: {
    color: "#ffa500",
    fontFamily: "NunitoBold",
    fontSize: windowWidth * 0.045,
  },
  closeButton: {
    alignSelf: "center",
    marginBottom: windowHeight * 0.01,
    fontSize: windowWidth * 0.1,
    color: "#ffa500",
    fontFamily: "NunitoLight",
  },
});