import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import ProfileCustomerScreen from "../../screens/customer/profileCustomerScreen";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import TiffinCustomerScreen from "../../screens/customer/tiffinCustomerScreen";

const HomeStack = createStackNavigator();

const HomeCustomerNavigator = () => {
  return (
    <HomeStack.Navigator
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
      <HomeStack.Screen
        name="HomeCustomer"
        component={HomeCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="ProfileCustomer"
        component={ProfileCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="TiffinCustomer"
        component={TiffinCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeCustomerNavigator;
