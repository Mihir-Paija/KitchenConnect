import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { windowWidth, windowHeight } from '@/utils/dimensions'

const LineGraph = ({ data, scroll }) => {

  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //       strokeWidth: 2, // optional 
  //       color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, 
  //     //fillShadowGradient: '#FFD580', 
  //     //fillShadowGradientOpacity: 1, 
  //     },
  //     {
  //         data: [30, 50, 20, 70, 75, 30],
  //         strokeWidth: 2, // optional 
  //         color: (opacity = 1) => `rgba(100, 100, 0, ${opacity})`, 
  //       //fillShadowGradient: 'green', 
  //       //fillShadowGradientOpacity: 1, 
  //       },
  //   ],
  // };

  console.log(data)

  const [selectedPoint, setSelectedPoint] = useState(null);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})q`,
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
      strokeDasharray: "",
      stroke: "none",
    },
    showYAxisLine: true,
    axisLineColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  };

  const handleDataPointClick = (data) => {
    console.log('clicked')
    console.log(data)
    setSelectedPoint(data.value);
  };

  return (
    <SafeAreaView>
      {scroll ?
        <ScrollView horizontal>
          <View style={styles.container}>
            {selectedPoint !== null && (
              <Text style={styles.tooltip}>Y-coordinate: {selectedPoint}</Text>
            )}
            <LineChart
              data={data}
              width={windowWidth * 2.9}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              onDataPointClick={handleDataPointClick}
              yAxisInterval={1}
              withOuterLines={true}
            />
          </View>
        </ScrollView>
        :
        <View style={styles.container}>
          {selectedPoint !== null && (
            <Text style={styles.tooltip}>Y-coordinate: {selectedPoint}</Text>
          )}
          <LineChart
            data={data}
            width={windowWidth}
            height={windowHeight * 0.25}
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
      }
    </SafeAreaView>
  );
};

export default LineGraph;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    //position: 'absolute',
    //top: 10,
    //left: 10,
    //backgroundColor: 'black',
    color: 'black',
    padding: 5,
    borderRadius: 5,
  },
});
