import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";

const AddMoneyModal = ({ isVisible, onClose, onAddMoney }) => {
  const [amount, setAmount] = useState("");
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const handleInputChange = (text, setPin, nextRef) => {
    setPin(text);
    if (text.length === 1 && nextRef) {
      nextRef.current.focus();
    }
  };

  const handleAddMoney = () => {
    if (!amount || !pin1 || !pin2 || !pin3 || !pin4) {
      Alert.alert("Please fill all fields");
      return;
    }

    const pin = pin1 + pin2 + pin3 + pin4;
    onAddMoney(parseFloat(amount), pin);
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
            <Text style={styles.modalTitle}>Add Money</Text>
            <Icon
              name="close"
              type="ionicon"
              style={styles.closeButton}
              onPress={onClose}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.pinHeader}>Enter PIN</Text>
          <View style={styles.otpContainer}>
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry={true}
              value={pin1}
              onChangeText={(text) => handleInputChange(text, setPin1, pin2Ref)}
            />
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry={true}
              value={pin2}
              onChangeText={(text) => handleInputChange(text, setPin2, pin3Ref)}
              ref={pin2Ref}
            />
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry={true}
              value={pin3}
              onChangeText={(text) => handleInputChange(text, setPin3, pin4Ref)}
              ref={pin3Ref}
            />
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry={true}
              value={pin4}
              onChangeText={(text) => handleInputChange(text, setPin4, null)}
              ref={pin4Ref}
            />
          </View>
          <View style={styles.info}>
            <TouchableOpacity
              onPress={handleAddMoney}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddMoneyModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 40,
  },
  pinHeader: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  pinInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: 40,
    height: 40,
    fontSize: 24,
    marginHorizontal: 5,
    textAlign: "center",
  },
  info: {
    alignItems: "center",
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
