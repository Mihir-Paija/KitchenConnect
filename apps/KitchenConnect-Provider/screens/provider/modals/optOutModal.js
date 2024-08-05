import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Alert
} from "react-native";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/Ionicons";

const OptOutModal = ({ isVisible, onClose, optLunch, optDinner }) => {

    const handleLunch = () => {
        Alert.alert(
            "Opt Out for Lunch",
            "Are you sure you want to opt out for lunch?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Opt Out Cancelled Cancelled"),
                    style: "cancel",
                },
                {
                    text: "Opt Out",
                    onPress: optLunch,
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
    };

    const handleDinner = () => {
        Alert.alert(
            "Opt Out for Dinner",
            "Are you sure you want to opt out for dinner?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Opt Out Cancelled Cancelled"),
                    style: "cancel",
                },
                {
                    text: "Opt Out",
                    onPress: optDinner,
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
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
                        <Text style={styles.modalTitle}>Opt Out</Text>
                        <View style={styles.closeButtonHeader}>
                            <Icon
                                name="close"
                                type="ionicon"
                                style={styles.closeButton}
                                onPress={onClose}
                            />
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.optButton} onPress={handleLunch}>
                            <Text style={styles.buttonText}>Opt Out For Lunch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optButton} onPress={handleDinner}>
                            <Text style={styles.buttonText}>Opt Out For Dinner</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default OptOutModal;

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

    optButton: {
        backgroundColor: 'red',
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