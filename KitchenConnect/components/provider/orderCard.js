import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import OrderComponent from './orderComponent';
import {windowWidth, windowHeight} from '@/utils/dimensions'
import DownButton from '../shared/DownButton';
import UpButton from '../shared/UpButton';

const OrderCard = ({tiffinName, number, orders, onPress}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const generateOTP = (item) =>{
    onPress(item)
  }
  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <View style={styles.header}>  
        <Text style={styles.title}>{tiffinName} ({number})</Text>
        <View style={styles.downButton}>
         { isOpen ?
          <UpButton  
          onPress = {toggleDropdown} 
          />
          :
        <DownButton 
        onPress = {toggleDropdown} 
        />
         }
        </View>
        </View>
      </View>
      {isOpen && (
        <View style={styles.listContainer}>
          <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <OrderComponent {...item}
              onPress={() => generateOTP(item)}/>
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
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    backgroundColor: '#FAFAFA',
    paddingLeft: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  header:{
    flexDirection: 'row'
  },
  downButton:{
    position: 'absolute',
    
    top: windowHeight * 0.005,
    right: windowWidth * 0.05,
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
