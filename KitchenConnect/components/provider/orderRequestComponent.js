import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {windowWidth, windowHeight} from '@/utils/dimensions'

const OrderRequestComponent = ({ _id, title, customerName, tiffinName, tiffinType, noOfTiffins, price, onAccept, onReject, }) => {
    
    const handleAccept = () =>{
        console.log('Accepted')
        onAccept(_id, 'Accepted')
    }

    const handleReject = () =>{
        onReject(_id, 'Rejected')
    }

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() =>{
        const grandTotal = ((price.tiffinPrice - price.discount) * noOfTiffins + price.deliveryCharge) 
        setTotalPrice(grandTotal)
    }, [])


    return (
        <View
            style={[styles.container, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
        >
            <Text style={styles.title}>Order</Text>
            <Text style={styles.detail}>
                {tiffinName} - {tiffinType} x {noOfTiffins} {noOfTiffins > 1 ? 'tiffins' :  'tiffin'}
            </Text>
            <Text style={styles.detail}>Customer: {customerName}</Text>
            <Text style={styles.detail}>Price: ₹{totalPrice}</Text>

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

export default OrderRequestComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: windowWidth *0.95,
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


