import React, { useContext } from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import { UserTypeContext } from "../../context/userTypeContext";
import ProfileCustomerScreen from "../../screens/customer/profileCustomerScreen";
import WalletCustomerScreen from "../../screens/customer/walletCustomerScreen";
import HistoryCustomerScreen from "../../screens/customer/historyCustomerScreen";

const homeStack = createStackNavigator();

const CustomerHomeNavigator = ({ route }) => {
  //global states
  const [userType] = useContext(UserTypeContext);

  return (
    <homeStack.Navigator
      initialRouteName="HomeCustomer"
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
      <homeStack.Screen
        name="HomeCustomer"
        component={HomeCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <homeStack.Screen
        name="HistoryCustomer"
        component={HistoryCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <homeStack.Screen
        name="WalletCustomer"
        component={WalletCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <homeStack.Screen
        name="ProfileCustomer"
        component={ProfileCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
    </homeStack.Navigator>
  );
};

export default CustomerHomeNavigator;
