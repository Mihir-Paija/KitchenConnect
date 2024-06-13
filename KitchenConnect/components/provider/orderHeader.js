import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OrderHeader = ({type}) =>{
  const [type, setType] = useState(type);

  return (
    <View style={styles.container}>
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
        style={[
          styles.button,
          type === 'Dinner' && styles.buttonPressed
        ]}
        onPress={onPressDinner}
      >
        <Text style={styles.buttonText}>Dinner</Text>
      </TouchableOpacity>
    </View>
  );
}

export default OrderHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonPressed: {
    backgroundColor: 'lightgrey',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
