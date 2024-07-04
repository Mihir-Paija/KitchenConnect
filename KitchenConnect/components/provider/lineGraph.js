import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions';

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
      r: '6',
      strokeWidth: '2',
      //stroke: '#ffa726',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'none',
    },
    showYAxisLine: true,
    axisLineColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    contentInset: { left: 100, right: 100 },
  };

  const handleDataPointClick = (data) => {
    console.log('clicked');
    console.log(data);
    setSelectedPoint(data.value);
  };

  return (
    <SafeAreaView>
      {selectedPoint !== null && (
            <Text style={styles.tooltip}>{value}: {selectedPoint}</Text>
          )}
      {scroll ? (
        <ScrollView horizontal style={styles.scrollView}>
          <View style={styles.container}>
            <LineChart
              data={data}
              width={windowWidth * 2}
              height={windowHeight * 0.2} 
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              onDataPointClick={handleDataPointClick}
              yAxisInterval={1}
              withOuterLines={true}
              withInnerLines={true} 
              withVerticalLabels={true} 
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          
          <LineChart
            data={data}
            width={windowWidth}
            height={windowHeight * 0.2} 
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            onDataPointClick={handleDataPointClick}
            yAxisInterval={1}
            withOuterLines={true}
            withInnerLines={true} 
            withVerticalLabels={true} 
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LineGraph;

const styles = StyleSheet.create({
  container: {
    //flex:1,
    //padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    height: windowHeight * 0.2, 
  },
  tooltip: {
    color: 'black',
    padding: 5,
    borderRadius: 5,
  },
});
