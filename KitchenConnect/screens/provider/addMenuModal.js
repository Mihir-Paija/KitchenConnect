import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const AddMenuModal = ({ isVisible, onClose, onAddMenu }) => {
    const [menuData, setMenuData] = useState({
        day: '',
        itemType: '',
        itemName: '',
        quantity: '',
        unit: ''
    });

    const handleAddMenu = () => {
        onAddMenu(menuData);

        setMenuData({
            day: '',
            itemType: '',
            itemName: '',
            quantity: '',
            unit: ''
        });
    };

    const dayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(value => ({ label: value, value: value }));
    const itemTypeOptions = ['Main Course', 'Side Dish', 'Dessert', 'Beverage'].map(value => ({ label: value, value: value }));
    const unitOptions = ['kg', 'g', 'L', 'ml', 'pcs'].map(value => ({ label: value, value: value }));

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
                        <View style={styles.pickerContainer}>
                            <Text style={styles.label}>Day</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Select Day', value: null }}
                                value={menuData.day}
                                onValueChange={(value) => setMenuData({ ...menuData, day: value })}
                                items={dayOptions}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Item Type"
                            value={menuData.itemType}
                            onChangeText={(text) => setMenuData({ ...menuData, itemType: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Item Name"
                            value={menuData.itemName}
                            onChangeText={(text) => setMenuData({ ...menuData, itemName: text })}
                        />
                        <View style={styles.row}>
                            <TextInput
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                                placeholder="Quantity"
                                value={menuData.quantity}
                                onChangeText={(text) => setMenuData({ ...menuData, quantity: text })}
                                keyboardType="numeric"
                            />
                            <RNPickerSelect
                                placeholder={{ label: 'Unit', value: null }}
                                value={menuData.unit}
                                onValueChange={(value) => setMenuData({ ...menuData, unit: value })}
                                items={unitOptions}
                                style={[pickerSelectStyles, { inputIOS: { flex: 1, marginLeft: 5 } }]}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
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

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    label: {
        marginBottom: 5,
        fontSize: 16,
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

