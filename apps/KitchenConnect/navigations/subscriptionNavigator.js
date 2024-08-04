import React from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import SubscriptionCustomerScreen from "../screens/subscriptionCustomerScreen";
import SubscriptionDetailsScreen from "../screens/subscriptionDetailsScreen";
import SubscriptionOrderCustomerScreen from "../screens/subscriptionOrderCustomerScreen";
const SubscriptionStack = createStackNavigator();

const SubscriptionCustomerNavigator = () => {
  return (
    <SubscriptionStack.Navigator
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
      <SubscriptionStack.Screen
        name="SubscriptionCustomer"
        component={SubscriptionCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <SubscriptionStack.Screen
        name="SubscriptionDetailsCustomer"
        component={SubscriptionDetailsScreen}
        options={{ presentation: "transparentModal" }}
      />
      <SubscriptionStack.Screen
        name="SubscriptionOrderCustomer"
        component={SubscriptionOrderCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
    </SubscriptionStack.Navigator>
  );
};

export default SubscriptionCustomerNavigator;
