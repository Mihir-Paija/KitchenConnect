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
      <ScrollView horizontal>
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
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: windowWidth * 0.02,
    marginBottom: windowHeight * 0.015,
  },
  dayButton: {
    width: windowWidth * 0.2,
    backgroundColor: "#747c7c14",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#747c7c",
    borderRadius: windowWidth * 0.05,
    padding: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.03,
    marginLeft: windowWidth * 0.02,
  },
  selectedDayButton: {
    backgroundColor: "#ffa50014",
    borderColor: "#ffa500",
  },
  dayText: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoRegular",
    color: "#747c7c",
  },
  selectedDayText: {
    color: "#ffa500",
  },
});

export default DaysScrollView;
