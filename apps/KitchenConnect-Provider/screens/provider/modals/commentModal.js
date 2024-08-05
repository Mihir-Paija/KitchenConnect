import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';

const CommentModal = ({ isVisible, data, onClose, onReject}) => {
    const [comment, setComment] = useState("")

    const handleReject = () =>{
        console.log(data)
        onReject(data.id, data.status, comment)
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
                   <Text style={styles.detailText}>Please Enter a Reason for Rejection</Text>
                   <TextInput
                   style={styles.reason}
                   placeholder='Enter Reason'
                   value={comment}
                   onChangeText={(text) => setComment(text)}/>
                    <TouchableOpacity style={styles.closeButton} onPress={handleReject}>
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CommentModal;

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
    reason:{
        height: windowHeight *0.08,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15
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
