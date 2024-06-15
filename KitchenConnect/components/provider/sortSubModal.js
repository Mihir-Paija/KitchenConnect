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

const SortSubModal = ({
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
              onPress={() => onSortChange("noSort")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "noSort" && styles.selectedOption,
                ]}
              >
                No Sort
              </Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Dates</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("sda")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "sda" && styles.selectedOption,
                ]}
              >
                Start Date: Earliest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("sdd")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "sdd" && styles.selectedOption,
                ]}
              >
                Start Date: Latest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("eda")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "eda" && styles.selectedOption,
                ]}
              >
                End Date: Earliest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("edd")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "edd" && styles.selectedOption,
                ]}
              >
                End Date: Latest 
              </Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Price</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("priceLTH")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "priceLTH" && styles.selectedOption,
                ]}
              >
                Low to High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("priceHTL")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "priceHTL" && styles.selectedOption,
                ]}
              >
                High To Low
              </Text>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Number of Tiffins</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("tiffinsLTH")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "tiffinsLTH" && styles.selectedOption,
                ]}
              >
                Less To More
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => onSortChange("tiffinsHTL")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortCriteria === "tiffinsHTL" && styles.selectedOption,
                ]}
              >
                More To Less
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


export default SortSubModal;

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
    marginBottom: windowHeight * 0.02,  
  },
  subTitle: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoSemiBold",
    marginTop: windowHeight * 0.01,
  },
  option: {
    paddingVertical: windowHeight * 0.01,  
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