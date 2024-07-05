import React from 'react';
import { useState } from 'react'
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Modal, Text } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/AntDesign";
import PriceInfoModal from './priceInfoModal';

const CreateSubModal = ({ isVisible, onClose, onCreate, tiffin}) => {
    const [subscription, setSubscription] = useState({
        title: "",
        price: tiffin.price,
        days: 0,
        description: "",
        discount: 0,
        deliveryCharge: 0,
    });

    const [perTiffin, setPerTiffin] = useState(0);

    const handleCreate = async () => {
        try {
            const { title, price, deliveryCharge, days, description } = subscription;
        if (!title || !price || !days || !description || !deliveryCharge) {
            console.log(subscription)
            Alert.alert("Please Fill All Fields");
            return;
        }
        const discountedPrice = ((tiffin.price - perTiffin)/tiffin.price) * 100

        const updatedSubscription = {
            ...subscription,
            discount: discountedPrice.toFixed(2),
        };

        onCreate(updatedSubscription);
        } catch (error) {
            console.log(error)
            Alert.alert('An error occurred')
        }
        

        
    };

    const dayCount = {
        'Weekly': 7,
        'Fortnightly': 15,
        'Monthly': 30,
    };

    const subOptions = ['Weekly', 'Fortnightly', 'Monthly'].map((value) => ({ label: value, value: value }));

    const [infoModal, setInfoModal] = useState(false)

    const toggleInfoModal = () =>{
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
                        <Text style={styles.modalTitle}>Create Subscription</Text>
                        <View style={styles.closeButtonHeader}>
                            <Icon
                                name="close"
                                type="ionicon"
                                style={styles.closeButton}
                                onPress={onClose}
                            />
                        </View>
                    </View>
                    <View style={styles.subscriptionRow}>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.daysText}>Select Subscription</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.daysText}>Days</Text>
                        </View>
                    </View>
                    <View style={styles.subscriptionRow}>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                placeholder={{ label: "Select Type", value: null }}
                                value={subscription.title}
                                onValueChange={(value) =>
                                    setSubscription({ ...subscription, title: value, days: dayCount[value] })
                                }
                                items={subOptions}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.dayCount}>{subscription.days}</Text>
                        </View>
                    </View>
                    <TextInput
                        style={[styles.input, { height: windowHeight *0.09 }]}
                        placeholder="Enter Description"
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
                        value={perTiffin}
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
                        value={subscription.deliveryCharge}
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
                        <Text style={styles.dayCount}>{subscription.days ? (parseInt(perTiffin, 10) + parseInt(subscription.deliveryCharge, 10)) * subscription.days: 0}</Text>
                    </View>
                    

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>

                        {infoModal ?
                        <PriceInfoModal
                         isVisible={infoModal}
                         onClose={toggleInfoModal}
                         /> : null}
                    </View>
                </View>
            </View>

        </Modal>
    );
}

export default CreateSubModal;

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
    totalPrice:{
        alignItems: 'center',
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

    priceContainer:{
        flexDirection: 'row',
    },

    infoIcon: {
        fontSize: windowHeight * 0.014,
        marginTop: windowHeight * 0.006,
        marginLeft: windowWidth *0.017,
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