import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LineGraph = ({ data, scroll, value }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '1',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'none',
    },
    showYAxisLine: true,
    axisLineColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    contentInset: { left: 20, right: 20 },
  };

  const handleDataPointClick = (data) => {
    setSelectedPoint(data.value);
  };

  return (
    <SafeAreaView>
      {selectedPoint !== null && (
        <Text style={styles.tooltip}>{value}: {selectedPoint}</Text>
      )}
       <View style={styles.container}>
            <LineChart
              data={data}
              width={windowWidth} 
              height={windowHeight * 0.3}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              onDataPointClick={handleDataPointClick}
              yAxisInterval={1}
              withOuterLines={true}
              withInnerLines={true}
              withVerticalLabels={true}
            />
          </View>
  
    </SafeAreaView>
  );
};

export default LineGraph;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tooltip: {
    color: 'black',
    padding: 5,
    borderRadius: 5,
  },
});
