import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';

const AddMenuModal = ({ isVisible, onClose, onAddMenu }) => {
  const [menuData, setMenuData] = useState({
    name: '',
    price: '',
    foodType: '',
    description: '',
  });

  const handleAddMenu = () => {
    onAddMenu(menuData);
    // Clear menuData after adding menu (optional)
    setMenuData({
      name: '',
      price: '',
      foodType: '',
      description: '',
    });
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
          <Text style={styles.modalTitle}>Add New Menu Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={menuData.name}
            onChangeText={(text) => setMenuData({ ...menuData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={menuData.price}
            onChangeText={(text) => setMenuData({ ...menuData, price: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Food Type"
            value={menuData.foodType}
            onChangeText={(text) => setMenuData({ ...menuData, foodType: text })}
          />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            value={menuData.description}
            onChangeText={(text) => setMenuData({ ...menuData, description: text })}
            multiline
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleAddMenu}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddMenuModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  submitButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    marginTop: 10,
  },

  closeButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
