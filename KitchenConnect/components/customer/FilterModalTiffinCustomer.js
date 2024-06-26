import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/Ionicons";

const FilterModalTiffinCustomer = ({
  visible,
  onClose,
  onFilterChange,
  filterCriteria,
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
        <SafeAreaView style={styles.modalBackground}>
          <Icon
            name="close-circle-outline"
            type="ionicon"
            style={styles.closeButton}
            onPress={onClose}
          />
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Filter by:</Text>
            <Text style={styles.subTitle}>Tiffin Type</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("tiffinType", "all")}
            >
              <Text
                style={
                  filterCriteria.tiffinType === "all"
                    ? styles.selectedOption
                    : styles.optionText
                }
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("tiffinType", "Lunch")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.tiffinType === "Lunch" &&
                    styles.selectedOption,
                ]}
              >
                Lunch
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("tiffinType", "Dinner")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.tiffinType === "Dinner" &&
                    styles.selectedOption,
                ]}
              >
                Dinner
              </Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>Food Type</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("foodType", "all")}
            >
              <Text
                style={
                  filterCriteria.foodType === "all"
                    ? styles.selectedOption
                    : styles.optionText
                }
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("foodType", "Veg")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.foodType === "Veg" && styles.selectedOption,
                ]}
              >
                Veg
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("foodType", "Non-Veg")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.foodType === "Non-Veg" &&
                    styles.selectedOption,
                ]}
              >
                Non-Veg
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("foodType", "Vegan")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.foodType === "Vegan" && styles.selectedOption,
                ]}
              >
                Vegan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("foodType", "Swaminarayan")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.foodType === "Swaminarayan" &&
                    styles.selectedOption,
                ]}
              >
                Swaminarayan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("foodType", "Jain")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.foodType === "Jain" && styles.selectedOption,
                ]}
              >
                Jain
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModalTiffinCustomer;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    // backgroundColor: "transparent",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: windowWidth * 0.055,
    fontFamily: "NunitoBold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
    marginTop: 10,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    paddingLeft: windowWidth * 0.02,
  },
  selectedOption: {
    color: "#ffa500",
    fontFamily: "NunitoBold",
    fontSize: windowWidth * 0.045,
    paddingLeft: windowWidth * 0.02,
  },
  closeButton: {
    alignSelf: "center",
    marginBottom: windowWidth * 0.01,
    fontSize: windowWidth * 0.12,
    color: "#ffa500",
    fontFamily: "NunitoLight",
    // backgroundColor: "#ffff",
  },
});
