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
  FlatList,
} from "react-native";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/Ionicons";

const FilterSubModal = ({
  visible,
  onClose,
  onFilterChange,
  filterCriteria,
  tiffins,
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
            <Text style={styles.subTitle}>Subscription</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("subscription", "all")}
            >
              <Text
                style={
                  filterCriteria.subscription === "all"
                    ? styles.selectedOption
                    : styles.optionText
                }
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("subscription", "Weekly")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.subscription === "Weekly" && styles.selectedOption,
                ]}
              >
               Weekly 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("subscription", "Fortnightly")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.subscription === "Fortnightly" && styles.selectedOption,
                ]}
              >
                Fortnightly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onFilterChange("subscription", "Monthly")}
            >
              <Text
                style={[
                  styles.optionText,
                  filterCriteria.subscription === "Monthly" && styles.selectedOption,
                ]}
              >
                Monthly
              </Text>
              </TouchableOpacity>
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
                  filterCriteria.tiffinType === "Lunch" && styles.selectedOption,
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
                  filterCriteria.tiffinType === "Dinner" && styles.selectedOption,
                ]}
              >
               Dinner
              </Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Tiffin</Text>
            <FlatList
             data={tiffins}
             renderItem={({ item }) => (
                <TouchableOpacity
                style={styles.option}
                onPress={() => onFilterChange("tiffin", item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    filterCriteria.tiffin === item && styles.selectedOption,
                  ]}
                >
                 {item}
                </Text>
              </TouchableOpacity>
        
             )}/>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterSubModal;

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
    fontSize: windowWidth * 0.055,
    fontFamily: "NunitoBold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
    marginTop: windowHeight * 0.01,
  },
  option: {
    paddingVertical: windowHeight * 0.007,
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
    marginBottom: windowHeight * 0.005,
    fontSize: windowWidth * 0.1,
    color: "#ffa500",
    fontFamily: "NunitoLight",
  },
});
