import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';
import Icon from "react-native-vector-icons/Ionicons";

const EditTiffinModal1 = ({ isVisible, item, onClose, onNext, onDeleteTiffin, onDeactivateTiffin }) => {

    const [tiffinData, setTiffinData] = useState({
        id: item.id,
        name: item.name || '',
        shortDescription: item.shortDescription || '',
        price: item.price ? item.price.toString() : '',

    });
    const [redZone, setRedZone] = useState(false)

    /*
  useEffect(() => {
      if (isVisible && item) {
          setTiffinData({
              id: item.id,
              name: item.name || '',
              shortDescription: item.shortDescription || '',
              price: item.price ? item.price.toString() : '',
              foodType: item.foodType || 'Veg',
              tiffinType: item.tiffinType || 'Lunch',
              hours: item.hours || '',
              mins: item.mins || '',
              availability: item.deliveryDetails.availability || false,
              deliveryCharge: item.deliveryDetails.availability ? item.deliveryDetails.deliveryCharge ? item.deliveryDetails.deliveryCharge.toString() : '0' : '0',
              deliveryTimeHrs: item.deliveryDetails.availability ? item.deliveryDetails.deliveryTimeHrs : '',
              deliveryTimeMins: item.deliveryDetails.availability ? item.deliveryDetails.deliveryTimeMins : ''
          });
      }
  }, [isVisible, item]);
*/

    const handleNext = async () => {
        if (!tiffinData.name || !tiffinData.shortDescription || !tiffinData.price) {
            Alert.alert("Please Fill All Fields");
            return
        }
        onNext(tiffinData)
    }


    const handleDeleteTiffin = () => {
        onDeleteTiffin(tiffinData.name,tiffinData.id);
    };

    const handleDeactivateTiffin = () => {
        onDeactivateTiffin(tiffinData.id);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            {item ? (
                <View style={styles.modalContainer}>

                    <View style={styles.modalContent}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.modalTitle}>Edit {item.name}</Text>
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
                            value={tiffinData.name}
                            onChangeText={(text) => setTiffinData({ ...tiffinData, name: text })}
                        />
                        <TextInput
                            style={[styles.input, { height: windowHeight * 0.1 }]}
                            value={tiffinData.shortDescription}
                            onChangeText={(text) => setTiffinData({ ...tiffinData, shortDescription: text })}
                        />
                        <TextInput
                            style={styles.input}
                            value={tiffinData.price}
                            onChangeText={(text) => setTiffinData({ ...tiffinData, price: text })}
                            keyboardType="numeric"
                        />
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                            <View style={styles.checkboxContainer}>
                            <CheckBox
                                isChecked={redZone}
                                onClick={() => setRedZone(!redZone)}
                                checkBoxColor="orange"
                            />
                            {!item.deactivated ?
                            <Text style={styles.labels}>Want To Deactivate or Delete Tiffin</Text>
                            :
                            <Text style={styles.labels}>Want To Activate or Delete Tiffin</Text>
                            }
                        </View>
                        {redZone ?
                            <View style={styles.row}>
                                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTiffin}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                                { item.deactivated ?
                                <TouchableOpacity style={styles.deactivateButton} onPress={handleDeactivateTiffin}>
                                    <Text style={styles.buttonText}>Activate</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.deactivateButton} onPress={handleDeactivateTiffin}>
                                <Text style={styles.buttonText}>Deactivate</Text>
                            </TouchableOpacity>}
                            </View>
                            : null}
                        </View>
                    </View>

                </View>
            ) : (
                <Text>No Tiffin To Edit</Text>
            )}
        </Modal>
    );
};

export default EditTiffinModal1;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    pickerContainer: {
        marginBottom: windowHeight * 0.01,
    },
    pickerContainerHalf: {
        flex: 1,
        marginRight: windowWidth * 0.02,
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
        //alignItems: 'center',
        marginBottom: windowHeight * 0.01,
        marginTop: windowHeight * 0.02,
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
    deleteButton: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.05,
        borderRadius: windowWidth * 0.02,
        marginTop: windowHeight * 0.01,
        flex: 1,
        marginRight: windowHeight * 0.005,
    },
    deactivateButton: {
        backgroundColor: '#FF8C00',
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.05,
        borderRadius: windowWidth * 0.02,
        marginTop: windowHeight * 0.01,
        flex: 1,
        marginLeft: windowHeight * 0.005,
    },
    buttonText: {
        color: '#fff',
        fontSize: windowWidth * 0.04,
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