import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Picker, ScrollView } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';

const AddMenuModal = ({ isVisible, onClose, onAddMenu }) => {
    const [menuData, setMenuData] = useState({
        name: '',
        shortDescription: '',
        price: '',
        foodType: 'Veg', // Default value
        tiffinType: 'Lunch',
        hours: '',
        mins: '',
        availability: false,
        deliveryCharge: 0,
        deliveryTimeHrs: '',
        deliveryTimeMins: ''

    });

    const handleAddMenu = () => {
        onAddMenu(menuData);

        setMenuData({
            name: '',
            shortDescription: '',
            price: '',
            foodType: 'Veg',
            tiffinType: 'Lunch',
            hours: '',
            mins: '',
            availability: false,
            deliveryCharge: 0,
            deliveryTimeHrs: '',
            deliveryTimeMins: ''
        });
    };

    const foodTypeOptions = ['Veg', 'Non-Veg'].map(value => ({ label: value, value: value }));
    const tiffinTypeOptions = ['Lunch', 'Dinner'].map(value => ({ label: value, value: value }));
    const hourOptions = Array.from({ length: 24 }, (_, i) => ({ label: i.toString(), value: i.toString() }));
    const minuteOptions = ['00', '15', '30', '45'].map(value => ({ label: value, value: value }));

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>

                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>Add New Menu Item</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={menuData.name}
                            onChangeText={(text) => setMenuData({ ...menuData, name: text })}
                        />
                        <TextInput
                            style={[styles.input, { height: 80 }]}
                            placeholder="Write A Short Description"
                            value={menuData.shortDescription}
                            onChangeText={(text) => setMenuData({ ...menuData, shortDescription: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Tiffin Price"
                            value={menuData.price}
                            onChangeText={(text) => setMenuData({ ...menuData, price: text })}
                            keyboardType="numeric"
                        />

                        <View style={styles.pickerContainer}>
                            <Text style={styles.label}>Food Type</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Select Food Type', value: null }}
                                value={menuData.foodType}
                                onValueChange={(value) => setMenuData({ ...menuData, foodType: value })}
                                items={foodTypeOptions}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text style={styles.label}>Tiffin Type</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Select Tiffin Type', value: null }}
                                value={menuData.tiffinType}
                                onValueChange={(value) => setMenuData({ ...menuData, tiffinType: value })}
                                items={tiffinTypeOptions}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <Text style={styles.label}>At What Time Would Tiffin Be Ready</Text>
                        <View style={styles.row}>
                            <View style={styles.pickerContainerHalf}>
                                <RNPickerSelect
                                    placeholder={{ label: 'Select Hours', value: null }}
                                    value={menuData.hours}
                                    onValueChange={(value) => setMenuData({ ...menuData, hours: value })}
                                    items={hourOptions}
                                    style={pickerSelectStyles}
                                    useNativeAndroidPickerStyle={false}
                                />
                            </View>
                            <View style={styles.pickerContainerHalf}>
                                <RNPickerSelect
                                    placeholder={{ label: 'Select Minutes', value: null }}
                                    value={menuData.min}
                                    onValueChange={(value) => setMenuData({ ...menuData, min: value })}
                                    items={minuteOptions}
                                    style={pickerSelectStyles}
                                    useNativeAndroidPickerStyle={false}
                                />
                            </View>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                isChecked={menuData.availability}
                                onClick={() => setMenuData({ ...menuData, availability: !menuData.availability })}
                                checkBoxColor="orange"
                            />
                            <Text style={styles.labels}>Would you provide delivery?</Text>
                        </View>
                        {menuData.availability ? (<>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Delivery Charge (if applicable)"
                                value={menuData.deliveryCharge}
                                onChangeText={(text) => setMenuData({ ...menuData, deliveryCharge: text })}
                                keyboardType="numeric"
                            />
                            <Text style={styles.label}>At What Would You Deliver Tiffins</Text>
                            <View style={styles.row}>
                                <View style={styles.pickerContainerHalf}>
                                    <RNPickerSelect
                                        placeholder={{ label: 'Select Hours', value: null }}
                                        value={menuData.deliveryTimeHrs}
                                        onValueChange={(value) => setMenuData({ ...menuData, deliveryTimeHrs: value })}
                                        items={hourOptions}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                    />
                                </View>
                                <View style={styles.pickerContainerHalf}>
                                    <RNPickerSelect
                                        placeholder={{ label: 'Select Minutes', value: null }}
                                        value={menuData.deliveryTimeMins}
                                        onValueChange={(value) => setMenuData({ ...menuData, deliveryTimeMins: value })}
                                        items={minuteOptions}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                    />
                                </View>
                            </View>
                        </>) : (<></>)}
                    </ScrollView>

                    <TouchableOpacity style={styles.submitButton} onPress={handleAddMenu}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};

export default AddMenuModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        width: '100%',
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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