import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    StyleSheet,
    Picker,
    ScrollView,
    Alert
} from "react-native";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/Ionicons";

const AddTiffinModal2 = ({ isVisible, tiffin, onBack, onClose, onAddTiffin }) => {

    const [tiffinData, setTiffinData] = useState({
        name: tiffin.name,
        shortDescription: tiffin.shortDescription,
        price: tiffin.price,
        foodType: "Veg", // Default value
        tiffinType: "Lunch",
        hours: "",
        mins: "",
        availability: false,
        deliveryCharge: 0,
        deliveryTimeHrs: "",
        deliveryTimeMins: "",
    });

    const handleAddTiffin = () => {
        if (!tiffinData.name || !tiffinData.shortDescription || !tiffinData.price || !tiffinData.foodType || !tiffinData.tiffinType || !tiffinData.hours || !tiffinData.mins) {
            Alert.alert("Please Fill All Fields");
            return
        }

        if (tiffinData.availability) {
            if (!tiffinData.deliveryCharge.toString().length || !tiffinData.deliveryTimeHrs || !tiffinData.deliveryTimeMins) {
                Alert.alert("Please Fill All Delivery Details");
                return
            }
        }
        onAddTiffin(tiffinData);

        setTiffinData({
            name: "",
            shortDescription: "",
            price: "",
            foodType: "Veg",
            tiffinType: "Lunch",
            hours: "",
            mins: "",
            availability: false,
            deliveryCharge: 0,
            deliveryTimeHrs: "",
            deliveryTimeMins: "",
        });
    };

    const foodTypeOptions = [
        "Veg",
        "Non-Veg",
        "Swaminarayan",
        "Jain",
        "Vegan",
    ].map((value) => ({ label: value, value: value }));
    const tiffinTypeOptions = ["Lunch", "Dinner"].map((value) => ({
        label: value,
        value: value,
    }));
    const hourOptions = Array.from({ length: 24 }, (_, i) => ({
        label: i.toString().padStart(2, "0"),
        value: i.toString().padStart(2, "0"),
    }));
    const minuteOptions = ["00", "15", "30", "45"].map((value) => ({
        label: value,
        value: value,
    }));

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
                        <Text style={styles.modalTitle}>Adding {tiffinData.name}</Text>
                        <View style={styles.closeButtonHeader}>
                            <Icon
                                name="close"
                                type="ionicon"
                                style={styles.closeButton}
                                onPress={onClose}
                            />
                        </View>
                    </View>


                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>Food Type</Text>
                        <RNPickerSelect
                            placeholder={{ label: "Select Food Type", value: null }}
                            value={tiffinData.foodType}
                            onValueChange={(value) =>
                                setTiffinData({ ...tiffinData, foodType: value })
                            }
                            items={foodTypeOptions}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>Tiffin Type</Text>
                        <RNPickerSelect
                            placeholder={{ label: 'Select Tiffin Type', value: null }}
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
                                placeholder={{ label: 'Select Hours', value: null }}
                                value={tiffinData.hours}
                                onValueChange={(value) => setTiffinData({ ...tiffinData, hours: value })}
                                items={hourOptions}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <View style={styles.pickerContainerHalf}>
                            <RNPickerSelect
                                placeholder={{ label: 'Select Minutes', value: null }}
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
                    {tiffinData.availability ? (
                        <>
                            <Text style={styles.label}>Delivery Charge</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Delivery Charge"
                                value={tiffinData.deliveryCharge.toString()}
                                onChangeText={(text) => setTiffinData({ ...tiffinData, deliveryCharge: text })}
                                keyboardType="numeric"
                            />
                            <Text style={styles.label}>At What Time Would You Deliver Tiffins</Text>
                            <View style={styles.row}>
                                <View style={styles.pickerContainerHalf}>
                                    <RNPickerSelect
                                        placeholder={{ label: 'Select Hours', value: null }}
                                        value={tiffinData.deliveryTimeHrs}
                                        onValueChange={(value) => setTiffinData({ ...tiffinData, deliveryTimeHrs: value })}
                                        items={hourOptions}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                    />
                                </View>
                                <View style={styles.pickerContainerHalf}>
                                    <RNPickerSelect
                                        placeholder={{ label: 'Select Minutes', value: null }}
                                        value={tiffinData.deliveryTimeMins}
                                        onValueChange={(value) => setTiffinData({ ...tiffinData, deliveryTimeMins: value })}
                                        items={minuteOptions}
                                        style={pickerSelectStyles}
                                        useNativeAndroidPickerStyle={false}
                                    />
                                </View>
                            </View>
                        </>
                    ) : null}

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.submitButton} onPress={handleAddTiffin}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backButton} onPress={onBack}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddTiffinModal2;

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
        marginRight: windowWidth * 0.01,
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

    backButton: {
        backgroundColor: '#FF8C00',
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