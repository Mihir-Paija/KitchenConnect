import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import Icon from "react-native-vector-icons/Ionicons";

const WithdrawModal = ({ isVisible, onClose, onWithdraw }) => {

    const [amount, setAmount] = useState('')
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


    const handleWithdraw = () =>{
        if(!digit1 || !digit2 || !digit3 || !digit4){
            Alert.alert(`Please Enter PIN`)
            return;
        }

        if(!amount){
            Alert.alert(`Please Enter Amount`)
            return;
        }

        const PIN = digit1 + digit2 + digit3 + digit4;

        onWithdraw(amount, PIN);
    }

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
            <Text style={styles.modalTitle}>Withdraw Money</Text>
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
            placeholder="Enter Amount"
            value={amount}
            onChangeText={(text) =>
              setAmount(text)
            }
            keyboardType="numeric"
          />
          <Text style={styles.subtitle}>Enter PIN</Text>
          <View style={styles.otpContainer}>
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleInputChange(text, 1)}
              value={digit1}
              maxLength={1}
              secureTextEntry={true}
              keyboardType="numeric"
              ref={ref => { this.digit1 = ref; }}
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleInputChange(text, 2)}
              value={digit2}
              maxLength={1}
              secureTextEntry={true}
              keyboardType="numeric"
              ref={ref => { this.digit2 = ref; }}
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleInputChange(text, 3)}
              value={digit3}
              maxLength={1}
              secureTextEntry={true}
              keyboardType="numeric"
              ref={ref => { this.digit3 = ref; }}
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleInputChange(text, 4)}
              value={digit4}
              maxLength={1}
              secureTextEntry={true}
              keyboardType="numeric"
              ref={ref => { this.digit4 = ref; }}
            />
          </View>

                    <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
                        <Text style={styles.buttonText}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default WithdrawModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: windowWidth * 0.025,
        padding: windowWidth * 0.05,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: windowHeight * 0.002 },
        shadowOpacity: 0.25,
        shadowRadius: windowWidth * 0.01,
        elevation: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: windowHeight * 0.01,
      },
      modalTitle: {
        fontSize: windowWidth * 0.05,
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
      subtitle:{
        textAlign: 'center',
        fontSize: windowHeight * 0.02,
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
    scrollContainer: {
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.015,
        textAlign: 'center',
    },
    detailText: {
        fontSize: windowWidth * 0.04,
        marginBottom: windowHeight * 0.01,
        textAlign: 'center',
    },
    withdrawButton: {
        backgroundColor: '#FFA500',
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.05,
        borderRadius: windowWidth * 0.0125,
        marginTop: windowHeight * 0.02,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: windowWidth * 0.04,
        fontWeight: 'bold',
    },
});
