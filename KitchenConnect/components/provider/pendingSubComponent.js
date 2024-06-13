import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const PendingSubComponent = ({ _id, title, customerName, tiffinName, tiffinType, noOfTiffins, price, startDate, endDate, onAccept, onReject, }) => {

    const dayCount = {
        'Weekly': 7,
        'Fortnightly': 15,
        'Monthly': 30,
    };

    const subID = _id;

    const handleAccept = () =>{
        onAccept(subID, true, null)
    }

    const handleReject = () =>{
        onReject(subID, false, null)
    }

    return (
        <View
            style={[styles.container, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
        >
            <Text style={styles.title}>{title} Subscription - {dayCount[title]} days</Text>
            <Text style={styles.detail}>
                {tiffinName} - {tiffinType} x {noOfTiffins} {noOfTiffins > 1 ? 'tiffins' :  'tiffin'}
            </Text>
            <Text style={styles.detail}>Customer: {customerName}</Text>
            <Text style={styles.detail}>Price: ₹{price}</Text>
            <Text style={styles.dateDetail}>
                {startDate} - {endDate}
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PendingSubComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
    },
    dateDetail: {
        fontSize: 16,
        marginBottom: 10,
        fontStyle: 'italic',
    },

    androidShadow: {
        elevation: 5,
    },

    iosShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },

    acceptButton: {
        flex: 1,
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 5,
    },

    rejectButton: {
        flex: 1,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginLeft: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


