import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import OrderComponent from './orderComponent';
import {windowWidth, windowHeight} from '@/utils/dimensions'

const OrderCard = ({tiffinName, number, subscribers}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdown}>
        <Text style={styles.title}>{tiffinName} ({number})</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.listContainer}>
          <FlatList
            data={subscribers}
            keyExtractor={(item) => item._id}
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
    width: windowWidth,
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  dropdown: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FAFAFA',
    paddingLeft: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  listContainer: {
    width: '100%',
  },
  flatList: {
    
    paddingBottom: 20,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});

export default OrderCard;
