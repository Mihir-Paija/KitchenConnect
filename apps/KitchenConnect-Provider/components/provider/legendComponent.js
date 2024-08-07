import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LegendComponent = ({ colorMap }) => {
  return (
    <View style={styles.legendContainer}>
      {Array.from(colorMap.entries()).map(([key, color]) => (
        <View key={key} style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: color }]} />
          <Text style={styles.legendText}>{key}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 2,
    marginLeft: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    marginHorizontal: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
});

export default LegendComponent;
