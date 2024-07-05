import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {windowHeight, windowWidth} from '@utils/dimensions'

const WalletHeader = ({name, onPressWallet, onPressInsights}) =>{
  const [type, setType] = useState(name);

  useEffect(()=>{
    setType(name)
  }, [name])

  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
       style={[
        styles.button,
        type === 'Wallet' && styles.buttonPressed
      ]}
        onPress={onPressWallet}
      >
        <Text style={styles.buttonText}>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, type === 'Insights' && styles.buttonPressed]}
        onPress={onPressInsights}
      >
        <Text style={styles.buttonText}>Insights</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalletHeader

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    //marginTop: windowHeight * 0.01,
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
    borderBottomWidth: 4,
    borderColor: '#FFA500'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});


