import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import OrderComponent from './orderComponent';
import {windowWidth, windowHeight} from '@/utils/dimensions'

const OrderCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const orders = [
    {
      id: '1',
      tiffinName: 'Full Tiffin',
      noOfTiffins: 2,
      customerName: 'John Doe',
      price: 200,
      delivery: true,
      address: 'SkyView Apartment, Bopal'
    },
    {
      id: '2',
      tiffinName: 'Full Tiffin',
      noOfTiffins: 1,
      price: 80,
      customerName: 'Jane Smith',
      delivery: false,
      address: ''
    },
  ];


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdown}>
        <Text style={styles.title}>Full Tiffin(3)</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.listContainer}>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderComponent {...item}/>
            )}
            contentContainerStyle={styles.flatList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.95,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 70
  },
  dropdown: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  listContainer: {
    width: '100%',
    height: '100%',
    marginBottom: 30,
  },
  flatList: {
    
    paddingBottom: 30,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});

export default OrderCard;
