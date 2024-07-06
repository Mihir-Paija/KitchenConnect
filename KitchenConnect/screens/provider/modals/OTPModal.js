import React, { useState } from 'react';
import { View, Modal, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { windowWidth, windowHeight } from '@/utils/dimensions'

const OTPModal = ({ isVisible, onClose, onVerify, order }) => {
  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [digit3, setDigit3] = useState('');
  const [digit4, setDigit4] = useState('');

  const handleInputChange = (text, inputIndex) => {
    switch (inputIndex) {
      case 1:
        setDigit1(text);
        if (text.length === 1) {
          this.digit2.focus();
        }
        break;
      case 2:
        setDigit2(text);
        if (text.length === 1) {
          this.digit3.focus();
        }
        break;
      case 3:
        setDigit3(text);
        if (text.length === 1) {
          this.digit4.focus();
        }
        break;
      case 4:
        setDigit4(text);
        break;
      default:
        break;
    }
  };

  const handleVerify = () => {
    if(!digit1 || !digit2 || !digit3 || !digit4){
        Alert.alert('Please Fill All 4 Digits')
        return
    }

    const otp = digit1 + digit2 + digit3 + digit4;
    onVerify(otp, order);
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
            <Text style={styles.modalTitle}>Enter OTP</Text>
            <View style={styles.closeButtonHeader}>
              <Icon
                name="close"
                type="ionicon"
                style={styles.closeButton}
                onPress={onClose}
              />
            </View>
          </View>
          <View style={styles.otpContainer}>
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleInputChange(text, 1)}
              value={digit1}
              maxLength={1}
              keyboardType="numeric"
              ref={ref => { this.digit1 = ref; }}
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleInputChange(text, 2)}
              value={digit2}
              maxLength={1}
              keyboardType="numeric"
              ref={ref => { this.digit2 = ref; }}
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleInputChange(text, 3)}
              value={digit3}
              maxLength={1}
              keyboardType="numeric"
              ref={ref => { this.digit3 = ref; }}
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleInputChange(text, 4)}
              value={digit4}
              maxLength={1}
              keyboardType="numeric"
              ref={ref => { this.digit4 = ref; }}
            />
          </View>
          <View style={styles.info}>
          <Text style={styles.customer}>Customer: {order.subscriberFirstName + ' ' + order.subscriberLastName}</Text>
         
          <TouchableOpacity onPress={handleVerify} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Verify</Text>
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
        marginBottom: windowHeight * 0.015,
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
  modalText: {
    fontSize: 18,
    marginBottom: 15
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  otpInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: windowWidth * 0.12,
    height: windowHeight * 0.06,
    fontSize: 24,
    marginHorizontal: windowWidth * 0.02,
    textAlign: 'center'
  },
  info:{
    alignItems: 'center'
  },
  customer:{
    fontSize: windowHeight * 0.03
  },
  submitButton: {
    marginTop: windowHeight*0.012,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center'
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16
  }
});

export default OTPModal;
