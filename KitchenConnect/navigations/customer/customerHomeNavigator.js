import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import ProfileCustomerScreen from "../../screens/customer/profileCustomerScreen";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import TiffinCustomerScreen from "../../screens/customer/tiffinCustomerScreen";
import MenuCustomerScreen from "../../screens/customer/menuCustomerScreen";
import ProfileDetailsCustomerScreen from "../../screens/customer/profileDetailsCustomerScreen";
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
        name="ProfileDetailsCustomer"
        component={ProfileDetailsCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="TiffinCustomer"
        component={TiffinCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="MenuCustomer"
        component={MenuCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeCustomerNavigator;
