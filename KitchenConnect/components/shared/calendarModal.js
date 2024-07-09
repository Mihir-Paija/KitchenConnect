import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
  SafeAreaView,
  Text,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { windowHeight, windowWidth } from "@/utils/dimensions";

const CalendarModal = ({
  visible,
  onClose,
  startDate,
  endDate,
  completed,
  customerOut,
  providerOut,
}) => {
  const [initialMonth, setInitialMonth] = useState(new Date());
  const [minCalendarDate, setMinCalendarDate] = useState(new Date());
  const [maxCalendarDate, setMaxCalendarDate] = useState(new Date());

  useEffect(() => {
    const parsedStartDate = startDate ? new Date(startDate) : null;

    if (parsedStartDate) {
      const month = parsedStartDate.getMonth();
      const year = parsedStartDate.getFullYear();
      setInitialMonth(new Date(year, month, 1));
    }

    const minDate = new Date(startDate);
    setMinCalendarDate(minDate);

    const maxDate = new Date(endDate);
    setMaxCalendarDate(maxDate);
  }, [startDate]);

  const createMarkedDates = (datesArray, color) => {
    return datesArray.reduce((acc, date) => {
      const formattedDate = date.substring(0, 10);
      acc[formattedDate] = {
        customStyles: {
          container: { backgroundColor: color },
          text: { color: "white" },
        },
      };
      return acc;
    }, {});
  };

  const markedCompleted =
    completed.length !== 0 ? createMarkedDates(completed, "green") : {};
  const markedCustomerOut =
    customerOut.length !== 0 ? createMarkedDates(customerOut, "red") : {};
  const markedProviderOut =
    providerOut.length !== 0 ? createMarkedDates(providerOut, "blue") : {};

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <SafeAreaView style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
              <Calendar
                current={initialMonth.toISOString().split("T")[0]}
                minDate={minCalendarDate.toISOString().split("T")[0]}
                maxDate={maxCalendarDate.toISOString().split("T")[0]}
                onDayPress={(day) => {
                  console.log("selected day", day);
                }}
                monthFormat={"MM/yyyy"}
                onMonthChange={(month) => {
                  //console.log('month changed', month);
                }}
                hideArrows={false}
                hideExtraDays={true}
                disableMonthChange={true}
                enableSwipeMonths={true}
                markingType={"custom"}
                markedDates={{
                  ...markedCompleted,
                  ...markedCustomerOut,
                  ...markedProviderOut,
                }}
                theme={{
                  backgroundColor: "#ffffff",
                  calendarBackground: "#ffffff",
                  textSectionTitleColor: "#b6c1cd",
                  selectedDayBackgroundColor: "#00adf5",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#00adf5",
                  dayTextColor: "#2d4150",
                  textDisabledColor: "#d9e1e8",
                  arrowColor: "orange",
                  monthTextColor: "black",
                  indicatorColor: "black",
                  textDayFontFamily: "monospace",
                  textMonthFontFamily: "monospace",
                  textDayHeaderFontFamily: "monospace",
                  textDayFontWeight: "300",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "300",
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                }}
              />
            </View>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "green" }]}
                />
                <Text style={styles.legendText}>Completed</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "red" }]}
                />
                <Text style={styles.legendText}>You Opted Out</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "blue" }]}
                />
                <Text style={styles.legendText}>Provider Opted Out</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: windowWidth * 0.95,
    alignSelf: "center",
    backgroundColor: "white",
    // backgroundColor: "transparent",
    padding: 20,
    borderRadius: windowWidth * 0.02,
  },
  calendarContainer: {
    // flex: 1,
    marginBottom: 20,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: "black",
  },
});
