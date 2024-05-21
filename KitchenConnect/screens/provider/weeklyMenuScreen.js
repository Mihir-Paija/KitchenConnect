import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import menuStyle from '@/styles/provider/menuScreen';

const WeeklyMenuScreen = () => {
  return (
    <SafeAreaView style = {menuStyle.screen}>
      <View>
        <Text>Weekly Menu</Text>
      </View>
    </SafeAreaView>
  );
};

export default WeeklyMenuScreen;