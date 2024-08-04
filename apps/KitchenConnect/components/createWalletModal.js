import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Modal,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { windowWidth, windowHeight } from "@/utils/dimensions";

const CreateWalletModal = ({ isVisible, onClose, onCreate, type }) => {
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    PIN: "",
    type: type,
  });

  // useEffect(() => {
  //   if (isVisible) {
  //     StatusBar.setBarStyle("dark-content");
  //     StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)");
  //   } else {
  //     StatusBar.setBarStyle("dark-content");
  //     StatusBar.setBackgroundColor("#ffff");
  //   }
  // }, [isVisible]);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  const [rePin1, setRePin1] = useState("");
  const [rePin2, setRePin2] = useState("");
  const [rePin3, setRePin3] = useState("");
  const [rePin4, setRePin4] = useState("");

  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const rePin2Ref = useRef(null);
  const rePin3Ref = useRef(null);
  const rePin4Ref = useRef(null);

  const handleInputChange = (text, inputIndex, setPin, nextRef) => {
    setPin(text);
    if (text.length === 1 && nextRef) {
      nextRef.current.focus();
    }
  };

  const handleCreate = () => {
    if (!details.firstName || !details.lastName) {
      Alert.alert("Please Fill All Digits");
      return;
    }

    if (
      !pin1 ||
      !pin2 ||
      !pin3 ||
      !pin4 ||
      !rePin1 ||
      !rePin2 ||
      !rePin3 ||
      !rePin4
    ) {
      Alert.alert("Please Fill All Digits");
      return;
    }

    const pin = pin1 + pin2 + pin3 + pin4;
    const repin = rePin1 + rePin2 + rePin3 + rePin4;

    if (pin !== repin) {
      Alert.alert(`PINs Don't Match`);
      setPin1("");
      setPin2("");
      setPin3("");
      setPin4("");
      setRePin1("");
      setRePin2("");
      setRePin3("");
      setRePin4("");
      return;
    }

    const updatedDetails = {
      ...details,
      PIN: pin,
    };

    onCreate(updatedDetails);
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
            <Text style={styles.modalTitle}>Enter Details</Text>
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
            placeholder={"First Name"}
            value={details.firstName}
            onChangeText={(text) => setDetails({ ...details, firstName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder={"Last Name"}
            value={details.lastName}
            onChangeText={(text) => setDetails({ ...details, lastName: text })}
          />
          <Text style={styles.pinHeader}>Enter PIN</Text>
          <View style={styles.otpContainer}>
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={pin1}
              secureTextEntry={true}
              onChangeText={(text) =>
                handleInputChange(text, 1, setPin1, pin2Ref)
              }
            />
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={pin2}
              secureTextEntry={true}
              onChangeText={(text) =>
                handleInputChange(text, 2, setPin2, pin3Ref)
              }
              ref={pin2Ref}
            />
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={pin3}
              secureTextEntry={true}
              onChangeText={(text) =>
                handleInputChange(text, 3, setPin3, pin4Ref)
              }
              ref={pin3Ref}
            />
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={pin4}
              secureTextEntry={true}
              onChangeText={(text) => handleInputChange(text, 4, setPin4, null)}
              ref={pin4Ref}
            />
          </View>
          <Text style={styles.pinHeader}>Re Enter PIN</Text>
          <View style={styles.otpContainer}>
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={rePin1}
              secureTextEntry={true}
              onChangeText={(text) =>
                handleInputChange(text, 1, setRePin1, rePin2Ref)
              }
            />
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={rePin2}
              secureTextEntry={true}
              onChangeText={(text) =>
                handleInputChange(text, 2, setRePin2, rePin3Ref)
              }
              ref={rePin2Ref}
            />
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={rePin3}
              secureTextEntry={true}
              onChangeText={(text) =>
                handleInputChange(text, 3, setRePin3, rePin4Ref)
              }
              ref={rePin3Ref}
            />
            <TextInput
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={rePin4}
              secureTextEntry={true}
              onChangeText={(text) =>
                handleInputChange(text, 4, setRePin4, null)
              }
              ref={rePin4Ref}
            />
          </View>
          <View style={styles.info}>
            <TouchableOpacity
              onPress={handleCreate}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: windowWidth * 0.05,
    borderTopRightRadius: windowWidth * 0.05,
    padding: windowWidth * 0.03,

    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: windowHeight * 0.015,
  },
  modalTitle: {
    fontSize: windowWidth * 0.06,
    fontWeight: "bold",
  },
  closeButtonHeader: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight * 0.04,
    paddingHorizontal: windowWidth * 0.03,
    fontSize: windowWidth * 0.07,
  },
  closeButton: {
    fontSize: windowWidth * 0.08,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: windowWidth * 0.02,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    marginBottom: windowHeight * 0.01,
    height: windowHeight * 0.07,
  },
  pinHeader: {
    textAlign: "center",
    fontSize: windowHeight * 0.025,
    marginBottom: windowHeight * 0.01,
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
    width: windowWidth * 0.12,
    height: windowHeight * 0.06,
    fontSize: 24,
    marginHorizontal: windowWidth * 0.02,
    textAlign: "center",
  },
  info: {
    alignItems: "center",
  },
  submitButton: {
    marginTop: windowHeight * 0.012,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CreateWalletModal;
