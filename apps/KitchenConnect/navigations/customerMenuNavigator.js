import React, { useContext } from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import WalletCustomerScreen from "../screens/walletCustomerScreen";
import HistoryCustomerScreen from "../screens/historyCustomerScreen";
import HomeCustomerNavigator from "./customerHomeNavigator";
import SubscriptionCustomerNavigator from "./subscriptionNavigator";
import OrderDetailsScreen from "../screens/orderDetailsScreen";
import SuccessScreen from "../screens/SuceessScreen";
import { AuthContext } from "@/context/authContext";

const menuStack = createStackNavigator();

const CustomerMenuNavigator = ({ route }) => {
  //global states
  const [authState] = useContext(AuthContext);

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
      <menuStack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ presentation: "transparentModal" }}
      />
    </menuStack.Navigator>
  );
};

export default CustomerMenuNavigator;
