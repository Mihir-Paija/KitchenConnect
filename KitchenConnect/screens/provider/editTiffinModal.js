import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';
import Icon from "react-native-vector-icons/Ionicons";

const EditTiffinModal = ({ isVisible, item, onClose, onEditTiffin, onDeleteTiffin, onDeactivateTiffin }) => {
    const [tiffinData, setTiffinData] = useState({
        id: '',
        name: '',
        shortDescription: '',
        price: '',
        foodType: 'Veg',
        tiffinType: 'Lunch',
        hours: '',
        mins: '',
        availability: false,
        deliveryCharge: '0',
        deliveryTimeHrs: '',
        deliveryTimeMins: ''
    });

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

    const handleEditTiffin = () => {
        onEditTiffin(tiffinData);
        onClose();
    };

    const handleDeleteTiffin = () => {
        onDeleteTiffin(tiffinData.id);
        onClose();
    };

    const handleDeactivateTiffin = () => {
        onDeactivateTiffin(tiffinData.id);
        onClose();
    };

    const foodTypeOptions = ['Veg', 'Non-Veg'].map(value => ({ label: value, value: value }));
    const tiffinTypeOptions = ['Lunch', 'Dinner'].map(value => ({ label: value, value: value }));
    const hourOptions = Array.from({ length: 24 }, (_, i) => ({ label: i.toString().padStart(2, '0'), value: i.toString().padStart(2, '0') }));
    const minuteOptions = ['00', '15', '30', '45'].map(value => ({ label: value, value: value }));

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            {item ? (
                <View style={styles.modalContainer}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardAvoidingView}
                    >
                        <View style={styles.modalContent}>
                            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
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

                                <View style={styles.pickerContainer}>
                                    <Text style={styles.label}>Food Type</Text>
                                    <RNPickerSelect
                                        value={tiffinData.foodType}
                                        onValueChange={(value) => setTiffinData({ ...tiffinData, foodType: value })}
                                        items={foodTypeOptions}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                    />
                                </View>

                                <View style={styles.pickerContainer}>
                                    <Text style={styles.label}>Tiffin Type</Text>
                                    <RNPickerSelect
                                        value={tiffinData.tiffinType}
                                        onValueChange={(value) => setTiffinData({ ...tiffinData, tiffinType: value })}
                                        items={tiffinTypeOptions}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                    />
                                </View>
                                <Text style={styles.label}>At What Time Would Tiffin Be Ready</Text>
                                <View style={styles.row}>
                                    <View style={styles.pickerContainerHalf}>
                                        <RNPickerSelect
                                            value={tiffinData.hours}
                                            onValueChange={(value) => setTiffinData({ ...tiffinData, hours: value })}
                                            items={hourOptions}
                                            style={pickerSelectStyles}
                                            useNativeAndroidPickerStyle={false}
                                        />
                                    </View>
                                    <View style={styles.pickerContainerHalfLast}>
                                        <RNPickerSelect
                                            value={tiffinData.mins}
                                            onValueChange={(value) => setTiffinData({ ...tiffinData, mins: value })}
                                            items={minuteOptions}
                                            style={pickerSelectStyles}
                                            useNativeAndroidPickerStyle={false}
                                        />
                                    </View>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        isChecked={tiffinData.availability}
                                        onClick={() => setTiffinData({ ...tiffinData, availability: !tiffinData.availability })}
                                        checkBoxColor="orange"
                                    />
                                    <Text style={styles.labels}>Would you provide delivery?</Text>
                                </View>
                                {tiffinData.availability && (
                                    <>
                                        <TextInput
                                            style={styles.input}
                                            value={tiffinData.deliveryCharge}
                                            onChangeText={(text) => setTiffinData({ ...tiffinData, deliveryCharge: text })}
                                            keyboardType="numeric"
                                        />
                                        <Text style={styles.label}>At What Time Would You Deliver Tiffins</Text>
                                        <View style={styles.row}>
                                            <View style={styles.pickerContainerHalf}>
                                                <RNPickerSelect
                                                    value={tiffinData.deliveryTimeHrs}
                                                    onValueChange={(value) => setTiffinData({ ...tiffinData, deliveryTimeHrs: value })}
                                                    items={hourOptions}
                                                    style={pickerSelectStyles}
                                                    useNativeAndroidPickerStyle={false}
                                                />
                                            </View>
                                            <View style={styles.pickerContainerHalfLast}>
                                                <RNPickerSelect
                                                    value={tiffinData.deliveryTimeMins}
                                                    onValueChange={(value) => setTiffinData({ ...tiffinData, deliveryTimeMins: value })}
                                                    items={minuteOptions}
                                                    style={pickerSelectStyles}
                                                    useNativeAndroidPickerStyle={false}
                                                />
                                            </View>
                                        </View>
                                    </>
                                )}
                            </ScrollView>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={styles.submitButton} onPress={handleEditTiffin}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                                <View style={styles.row}>
                                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTiffin}>
                                        <Text style={styles.buttonText}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deactivateButton} onPress={handleDeactivateTiffin}>
                                        <Text style={styles.buttonText}>Deactivate</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            ) : (
                <Text>No Tiffin To Edit</Text>
            )}
        </Modal>
    );
};

export default EditTiffinModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: windowWidth * 0.05,
        borderTopRightRadius: windowWidth * 0.05,
        padding: windowWidth * 0.03,
        width: '100%',
        flex: 1,
    },
    scrollViewContainer: {
        paddingBottom: windowHeight * 0.1,
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