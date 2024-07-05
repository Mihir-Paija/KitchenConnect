import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Picker,
  ScrollView,
  Alert
} from "react-native";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/Ionicons";

const AddTiffinModal1 = ({ isVisible, onClose, onNext }) => {
  const [tiffinData, setTiffinData] = useState({
    name: "",
    shortDescription: "",
    price: "",
    providePacking: false,
    packingCharge: 0

  });

  const handleNext = () => {
    console.log(tiffinData)
    if (!tiffinData.name || !tiffinData.shortDescription || !tiffinData.price || tiffinData.providePacking === undefined ) {
      Alert.alert("Please Fill All Fields");
      return
    }
    onNext(tiffinData);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalTitle}>Add New Tiffin</Text>
            <View style={styles.closeButtonHeader}>
              <Icon
                name="close"
                type="ionicon"
                style={styles.closeButton}
                onPress={onClose}
              />
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder={tiffinData.name ? tiffinData.name : "Name"}
            value={tiffinData.name}
            onChangeText={(text) =>
              setTiffinData({ ...tiffinData, name: text })
            }
          />
          <TextInput
            style={[styles.input, { height: windowHeight *0.09 }]}
            placeholder="Write A Short Description"
            value={tiffinData.shortDescription}
            onChangeText={(text) =>
              setTiffinData({ ...tiffinData, shortDescription: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Tiffin Price"
            value={tiffinData.price}
            onChangeText={(text) =>
              setTiffinData({ ...tiffinData, price: text })
            }
            keyboardType="numeric"
          />
          <View style={styles.checkboxContainer}>
          <CheckBox
                            isChecked={tiffinData.providePacking}
                            onClick={() => setTiffinData({ ...tiffinData, providePacking: !tiffinData.providePacking })}
                            checkBoxColor="orange"
                        />
                        <Text style={styles.labels}>Would you provide Brown Bag?</Text>
                        </View>   
                    {tiffinData.providePacking ? (
                        <>
                            <Text style={styles.label}>Brown Bag Charge</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Brown Bag Charge"
                                value={tiffinData.packingCharge.toString()}
                                onChangeText={(text) => setTiffinData({ ...tiffinData, packingCharge: text })}
                                keyboardType="numeric"
                            />
                            </> ): null}
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal >
  );
};

export default AddTiffinModal1;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: windowWidth * 0.05,
    borderTopRightRadius: windowWidth * 0.05,
    padding: windowWidth * 0.03,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: windowHeight * 0.01,
  },
  modalTitle: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
  },
  closeButtonHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.04,
    paddingHorizontal: windowWidth * 0.03,
    fontSize: windowWidth * 0.07,
  },
  closeButton: {
    fontSize: windowWidth * 0.08,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: windowWidth * 0.02,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    marginBottom: windowHeight * 0.01,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight * 0.02,
},
checkbox: {
    padding: 0,
    margin: 0,
},

  pickerContainer: {
    marginBottom: windowHeight * 0.01,
  },

  pickerContainerHalf: {
    flex: 1,
    marginRight: windowWidth * 0.01,
  },

  pickerContainerHalfLast: {
    flex: 1,
    marginRight: 0,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight * 0.011,
  },

  label: {
    marginBottom: windowHeight * 0.005,
    fontSize: windowWidth * 0.04,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight * 0.02,
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  labels: {
    fontSize: windowWidth * 0.04,
    marginLeft: windowWidth * 0.025,
  },

  btnContainer: {
    alignItems: 'center'
  },

  submitButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.05,
    width: windowWidth * 0.95,
    borderRadius: windowWidth * 0.02,
    marginTop: windowHeight * 0.01,
  },



  buttonText: {
    color: '#fff',
    fontSize: windowHeight * 0.02,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: windowWidth * 0.04,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: windowWidth * 0.02,
    color: 'black',
    paddingRight: windowWidth * 0.1,
    marginBottom: windowHeight * 0.01,
  },
  inputAndroid: {
    fontSize: windowWidth * 0.035,
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.01,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: windowWidth * 0.02,
    color: 'black',
    paddingRight: windowWidth * 0.1,
    marginBottom: windowHeight * 0.01,
  },
});