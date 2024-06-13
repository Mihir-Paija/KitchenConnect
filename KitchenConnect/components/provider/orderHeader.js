import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {windowHeight, windowWidth} from '@utils/dimensions'

const OrderHeader = ({name, onPressLunch, onPressDinner}) =>{
  const [type, setType] = useState(name);

  useEffect(()=>{
    setType(name)
  }, [name])

  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
       style={[
        styles.button,
        type === 'Lunch' && styles.buttonPressed
      ]}
        onPress={onPressLunch}
      >
        <Text style={styles.buttonText}>Lunch</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, type === 'Dinner' && styles.buttonPressed]}
        onPress={onPressDinner}
      >
        <Text style={styles.buttonText}>Dinner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderHeader

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    height: windowHeight * 0.06
  },
  buttonPressed: {
    backgroundColor: 'lightgrey',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});


