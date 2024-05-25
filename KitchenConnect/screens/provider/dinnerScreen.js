import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import menuStyle from '@/styles/provider/menuScreen';

const DinnerScreen = () => {
  return (
    <SafeAreaView style = {menuStyle.screen}>
     <View style={styles.filters}>
        <Text>Filters</Text>
      </View>
      <View>
        <Text>Dinner Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default DinnerScreen;

const styles = StyleSheet.create({
filters:{

},
})