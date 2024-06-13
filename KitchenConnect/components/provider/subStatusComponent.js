import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import {windowHeight, windowWidth} from '@/utils/dimensions'

const SubStatusComponent = ({active, onPressActive, pending, onPressPending, completed, onPressCompleted}) => {

  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        style={[styles.button, active && styles.buttonPressed]}
        onPress={onPressActive}
      >
        <Text style={styles.buttonText}>Active</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, pending && styles.buttonPressed]}
        onPress={onPressPending}
      >
        <Text style={styles.buttonText}>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, completed && styles.buttonPressed]}
        onPress={onPressCompleted}
      >
        <Text style={styles.buttonText}>Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubStatusComponent

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


