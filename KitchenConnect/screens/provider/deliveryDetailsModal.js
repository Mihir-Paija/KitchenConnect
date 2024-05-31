import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';

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
        borderRadius: 10,
        padding: 20,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    scrollContainer: {
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    detailText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
