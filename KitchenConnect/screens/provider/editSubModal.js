import React from 'react';
import { useState } from 'react'
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Modal, Text } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/AntDesign";
import PriceInfoModal from './priceInfoModal';

const EditSubModal = ({ isVisible, onClose, onEdit, onDelete, item, }) => {
    const [subscription, setSubscription] = useState({
        days: item.days,
        title: item.title,
        price: item.price,
        discount: item.discount,
        deliveryCharge: item.deliveryCharge,
        description: item.description,
    });

    const [perTiffin, setPerTiffin] = useState(item.price - item.discount)

    const handleEdit = async () => {
        const { title, price, description } = subscription;
        if (!title || !price || !description) {
            Alert.alert("Please Fill All Fields");
            return;
        }

        const discountedPrice = ((tiffin.price - perTiffin)/tiffin.price) * 100

        const updatedSubscription = {
            ...subscription,
            discount: discountedPrice.toFixed(2),
        };

        onEdit(updatedSubscription);
    };


    const [infoModal, setInfoModal] = useState(false)

    const toggleInfoModal = () => {
        setInfoModal(!infoModal)
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
                        <Text style={styles.modalTitle}>Edit {item.title} Subscription</Text>
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
                        style={[styles.input, { height: windowHeight * 0.09 }]}
                        value={subscription.description}
                        onChangeText={(text) =>
                            setSubscription({ ...subscription, description: text })
                        }
                    />
                   <View style={styles.subscriptionRow}>
                        <View style={styles.pickerContainer}>
                            <View style = {styles.priceContainer}>
                            <Text style={[styles.daysText, {fontSize: windowHeight *0.016}]}>Enter Per Tiffin Price</Text>
                            <Icon2
                                name='infocirlceo'
                                style={styles.infoIcon}
                                onPress={toggleInfoModal}
                            />
                            </View>
                            
                        </View>
                        <View style={[styles.textContainer, {marginRight: windowWidth * 0.025}]}>
                            <Text style={styles.daysText}>Total</Text>
                        </View>
                    </View>
                    <View style={styles.subscriptionRow}>
                        <View style={[styles.pickerContainer, {flex: 2.5}]}>
                        <TextInput
                        style={[styles.input, {height: windowHeight *0.065 }]}
                        placeholder="Enter Price"
                        value={perTiffin.toString()}
                        onChangeText={(text) =>
                            setPerTiffin(text)
                        }
                        keyboardType="numeric"
                    />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.dayCount}>{perTiffin * subscription.days}</Text>
                        </View>
                    </View>
                    <View style={styles.subscriptionRow}>
                        <View style={styles.pickerContainer}>
                            <View style = {styles.priceContainer}>
                            <Text style={[styles.daysText, {fontSize: windowHeight *0.016}]}>Enter Per Delivery Price</Text>
                            <Icon2
                                name='infocirlceo'
                                style={styles.infoIcon}
                                onPress={toggleInfoModal}
                            />
                            </View>
                            
                        </View>
                        <View style={[styles.textContainer, {marginRight: windowWidth * 0.025}]}>
                            <Text style={styles.daysText}>Total</Text>
                        </View>
                    </View>
                    <View style={styles.subscriptionRow}>
                        <View style={[styles.pickerContainer, {flex: 2.5}]}>
                        <TextInput
                        style={[styles.input, {height: windowHeight *0.065 }]}
                        placeholder="Enter Price"
                        value={subscription.deliveryCharge.toString()}
                        onChangeText={(text) =>
                            setSubscription({ ...subscription, deliveryCharge: text})
                        }
                        keyboardType="numeric"
                    />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.dayCount}>{subscription.deliveryCharge * subscription.days}</Text>
                        </View>
                    </View>
                    <View style={styles.totalPrice}>
                        <Text style={styles.daysText}>Total Subscription Price</Text>
                        <Text style={styles.dayCount}>{subscription.days ? (parseInt(perTiffin, 10) + parseInt(subscription.deliveryCharge, 10)) * parseInt(subscription.days, 10): 0}</Text>
                    </View>
                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.submitButton} onPress={handleEdit}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.title)}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    {infoModal ?
                        <PriceInfoModal
                            isVisible={infoModal}
                            onClose={toggleInfoModal}
                        /> : null}
                </View>
            </View>
        </Modal>
    );
}

export default EditSubModal;

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
        fontSize: windowWidth * 0.055,
        fontWeight: 'bold',
    },
    totalPrice:{
        alignItems: 'center',
    },
    closeButtonHeader: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.04,
        paddingHorizontal: windowWidth * 0.04,
        fontSize: windowWidth * 0.07,
    },
    closeButton: {
        fontSize: windowWidth * 0.08,
    },
    subscriptionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: windowHeight * 0.01,
    },

    pickerContainer: {
        flex: 3,
    },

    priceContainer: {
        flexDirection: 'row',
    },

    infoIcon: {
        fontSize: windowHeight * 0.014,
        marginTop: windowHeight * 0.006,
        marginLeft: windowWidth * 0.017,
    },

    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: windowWidth * 0.02,
    },

    daysText: {
        fontSize: windowWidth * 0.04,
    },

    dayCount: {
        fontSize: windowWidth * 0.06,
        paddingBottom: windowHeight * 0.02,
    },


    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: windowWidth * 0.02,
        paddingVertical: windowHeight * 0.01,
        paddingHorizontal: windowWidth * 0.03,
        marginBottom: windowHeight * 0.01,
    },

    label: {
        marginBottom: windowHeight * 0.005,
        fontSize: windowWidth * 0.04,
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
        width: windowWidth * 0.95,
        borderRadius: windowWidth * 0.02,
        marginTop: windowHeight * 0.01,
        marginRight: windowHeight * 0.005,
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