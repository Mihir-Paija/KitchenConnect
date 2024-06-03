import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';

const DeliveryDetailsModal = ({ isVisible, info, onClose }) => {
    const [deliveryDetails, setDeliveryDetails] = useState({
        name: '',
        availability: false,
        deliveryCharge: 0,
        deliveryTimeHrs: '',
        deliveryTimeMins: '',
    });

    useEffect(() => {
        if (isVisible && info) {
            setDeliveryDetails({
                name: info.name || '',
                availability: info.details?.availability || false,
                deliveryCharge: info.details?.availability ? info.details.deliveryCharge : null,
                deliveryTimeHrs: info.details?.availability ? info.details.deliveryTimeHrs : null,
                deliveryTimeMins: info.details?.availability ? info.details.deliveryTimeMins : null,
            });
        }
    }, [isVisible, info]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.modalTitle}>Delivery Details for {deliveryDetails.name}</Text>
                        {deliveryDetails.availability ? (
                            <>
                                <Text style={styles.detailText}>Delivery Charge: {deliveryDetails.deliveryCharge}</Text>
                                <Text style={styles.detailText}>Delivery Time: {deliveryDetails.deliveryTimeHrs}:{deliveryDetails.deliveryTimeMins}</Text>
                            </>
                        ) : (
                            <Text style={styles.detailText}>You Don't Provide Delivery for {deliveryDetails.name}</Text>
                        )}
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default DeliveryDetailsModal;

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
    closeButton: {
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
