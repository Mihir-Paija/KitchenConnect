import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CompletedSubCustomerScreen from "../../screens/customer/CompletedSubCustomerScreen";
import CurrentSubCustomerScreen from "../../screens/customer/CurrentSubCustomerScreen";
import PendingSubCustomerScreen from "../../screens/customer/PendingSubCustomerScreen";
import { windowHeight, windowWidth } from "@/utils/dimensions";

const SubscriptionTab = createMaterialTopTabNavigator();

const SubscriptionTabNavigator = () => {
  return (
    <SubscriptionTab.Navigator
      initialRouteName="Current"
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#808080",
        tabBarLabelStyle: {
          fontSize: windowWidth * 0.035,
          fontFamily: "NunitoBold",
          textTransform: "none",
          textAlign: "center",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#ffa500",
          height: windowWidth * 0.005,
          width: windowWidth * 0.2,
          marginHorizontal: windowWidth * 0.02,
        },
        tabBarItemStyle: {
          //   backgroundColor: "#ffaa",
          width: windowWidth * 0.25,
          paddingHorizontal: windowWidth * 0.02,
          paddingVertical: windowWidth * 0.005,
        },
        tabBarStyle: {
          //   marginLeft: windowWidth * 0.15,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 5,
        },
        tabBarScrollEnabled: true,
      }}
    >
      <SubscriptionTab.Screen
        name="Current"
        component={CurrentSubCustomerScreen}
        options={{ tabBarLabel: "Current" }}
      />
      <SubscriptionTab.Screen
        name="Completed"
        component={CompletedSubCustomerScreen}
        options={{ tabBarLabel: "Completed" }}
      />
      <SubscriptionTab.Screen
        name="Pending"
        component={PendingSubCustomerScreen}
        options={{ tabBarLabel: "Pending" }}
      />
    </SubscriptionTab.Navigator>
  );
};

export default SubscriptionTabNavigator;
