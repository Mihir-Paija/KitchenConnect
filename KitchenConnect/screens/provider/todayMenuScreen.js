import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import menuStyle from '@/styles/provider/menuScreen';

const TodayMenuScreen = () => {
  return (
    <SafeAreaView style = {menuStyle.screen}>
     <View style={styles.filters}>
        <Text>Filters</Text>
      </View>
      <View>
        <Text>Today's Menu</Text>
      </View>
    </SafeAreaView>
  );
};

export default TodayMenuScreen;

const styles = StyleSheet.create({
filters:{

},
})