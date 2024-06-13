import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const CompletedSubComponent = ({title, customerName, tiffinName, tiffinType, noOfTiffins, price, startDate,endDate,}) => {
    const dayCount = {
        'Weekly': 7,
        'Fortnightly': 15,
        'Monthly': 30,
    };

    return (
        <TouchableOpacity
            style={[styles.container, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
        >
            <Text style={styles.title}>{title} Subscription - {dayCount[title]} days</Text>
            <Text style={styles.detail}>
                {tiffinName} - {tiffinType} x {noOfTiffins} {noOfTiffins > 1 ? 'tiffins' :  'tiffin'}
            </Text>
            <Text style={styles.detail}>Customer: {customerName}</Text>
            <Text style={styles.detail}>Price: ₹{price}</Text>
            <Text style={styles.dateDetail}>Completed on {endDate}</Text>
        </TouchableOpacity>
    );
};

export default CompletedSubComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 10,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
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
});