import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { windowHeight, windowWidth } from "@/utils/dimensions";

const DaysScrollView = ({ selectedDay, onDayChange }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View style={styles.daysContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
            ]}
            onPress={() => onDayChange(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === day && styles.selectedDayText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  daysContainer: {
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.005,
    marginBottom: windowHeight * 0.015,
  },
  dayButton: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.05,
    backgroundColor: '#747c7c14',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#747c7c',
    borderRadius: windowWidth * 0.05,
    marginHorizontal: windowWidth * 0.01,
  },
  selectedDayButton: {
    backgroundColor: '#ffa50014',
    borderColor: '#ffa500',
  },
  dayText: {
    fontSize: windowWidth * 0.04,
    fontFamily: 'NunitoRegular',
    color: '#747c7c',
  },
  selectedDayText: {
    color: '#ffa500',
  },
});

export default DaysScrollView;
