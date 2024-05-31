import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';

const EditTiffinModal = ({ isVisible, item, onClose, onEditTiffin, onDeleteTiffin }) => {
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
                                    <Text style={styles.modalTitle}>Edit Tiffin - {item.name}</Text>
                                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTiffin}>
                                        <Text style={styles.buttonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={tiffinData.name}
                                    onChangeText={(text) => setTiffinData({ ...tiffinData, name: text })}
                                />
                                <TextInput
                                    style={[styles.input, { height: 80 }]}
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
                                    <View style={styles.pickerContainerHalf}>
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
                                            <View style={styles.pickerContainerHalf}>
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

                            <TouchableOpacity style={styles.submitButton} onPress={handleEditTiffin}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        width: '100%',
        flex: 1,
    },
    scrollViewContainer: {
        paddingBottom: 100,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    pickerContainer: {
        marginBottom: 10,
    },
    pickerContainerHalf: {
        flex: 1,
        marginRight: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        padding: 0,
        margin: 0,
    },
    labels: {
        fontSize: 16,
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 5,
        marginTop: 10,
    },
    closeButton: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },
});
