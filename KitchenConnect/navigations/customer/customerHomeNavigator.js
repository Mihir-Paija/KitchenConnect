import React, { useContext } from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import { UserTypeContext } from "../../context/userTypeContext";

const homeStack = createStackNavigator();

const CustomerHomeCustomerNavigator = ({ route }) => {
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
    </homeStack.Navigator>
  );
};

export default CustomerHomeCustomerNavigator;
