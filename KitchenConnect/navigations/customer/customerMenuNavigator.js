import React, { useContext } from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import { UserTypeContext } from "../../context/userTypeContext";
import ProfileCustomerScreen from "../../screens/customer/profileCustomerScreen";
import WalletCustomerScreen from "../../screens/customer/walletCustomerScreen";
import HistoryCustomerScreen from "../../screens/customer/historyCustomerScreen";
import SubscriptionCustomerScreen from "../../screens/customer/subscriptionCustomerScreen";
import HomeCustomerNavigator from "./customerHomeNavigator";
import SubscriptionCustomerNavigator from "./subscriptionNavigator";
import OrderDetailsScreen from "../../screens/customer/orderDetailsScreen";
const menuStack = createStackNavigator();

const CustomerMenuNavigator = ({ route }) => {
  //global states
  const [userType] = useContext(UserTypeContext);

  return (
    <menuStack.Navigator
      initialRouteName="HomeCustomerNavigator"
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
      <menuStack.Screen
        name="HomeCustomerNavigator"
        component={HomeCustomerNavigator}
        options={{ presentation: "transparentModal" }}
      />
      <menuStack.Screen
        name="SubscriptionCustomerNavigator"
        component={SubscriptionCustomerNavigator}
        options={{ presentation: "transparentModal" }}
      />
      <menuStack.Screen
        name="HistoryCustomer"
        component={HistoryCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <menuStack.Screen
        name="OrderDetailsCustomer"
        component={OrderDetailsScreen}
        options={{ presentation: "transparentModal" }}
      />
      <menuStack.Screen
        name="WalletCustomer"
        component={WalletCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
    </menuStack.Navigator>
  );
};

export default CustomerMenuNavigator;
