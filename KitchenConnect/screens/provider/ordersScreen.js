import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';

const OrdersScreen = () => {
  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      <Text>Orders Screen</Text>
    </SafeAreaView>
  );
};

export default OrdersScreen;