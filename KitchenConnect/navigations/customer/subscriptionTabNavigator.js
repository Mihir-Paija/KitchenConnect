import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SubscriptionCustomerScreen from "@/screens/customer/SubscriptionCustomerScreen";
import PendingSubScreen from "@/screens/customer/subscriptionCards/PendingSubScreen";
import CurrentSubScreen from "@/screens/customer/subscriptionCards/CurrentSubScreen";
import CompletedSubScreen from "../../screens/customer/subscriptionCards/completedSubScreen";

const subscriptionStack = createStackNavigator();

const subscriptionCustomerNavigator = () => {
  return (
    <subscriptionStack.Navigator
      initialRouteName="SubscriptionCustomer"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}
    >
      <subscriptionStack.Screen
        name="SubscriptionCustomer"
        component={SubscriptionCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <subscriptionStack.Screen
        name="PendingSubScreen"
        component={PendingSubScreen}
        options={{ presentation: "transparentModal" }}
      />
      <subscriptionStack.Screen
        name="CurrentSubScreen"
        component={CurrentSubScreen}
        options={{ presentation: "transparentModal" }}
      />
      <subscriptionStack.Screen
        name="CompletedSubScreen"
        component={CompletedSubScreen}
        options={{ presentation: "transparentModal" }}
      />
    </subscriptionStack.Navigator>
  );
};

export default subscriptionCustomerNavigator;
