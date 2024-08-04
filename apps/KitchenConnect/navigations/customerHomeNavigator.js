import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import ProfileCustomerScreen from "../screens/profileCustomerScreen";
import HomeCustomerScreen from "../screens/homeCustomerScreen";
import TiffinCustomerScreen from "../screens/tiffinCustomerScreen";
import MenuCustomerScreen from "../screens/menuCustomerScreen";
import ProfileDetailsCustomerScreen from "../screens/profileDetailsCustomerScreen";
import SettingCustomerScreen from "../screens/settingCustomerScreen";
import AboutScreen from "../screens/aboutScreen";
import SubscribeCustomerScreen from "../screens/subscribeCustomerScreen";
import LocationSelectionScreen from "../screens/LocationSelectionScreen";
import ManualLoactionScreen from "../screens/ManualLoactionScreen";
import NotificationPermissionScreen from "../screens/notificationPermissionScreen";
import SuccessScreen from "../screens/SuceessScreen";

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
        name="NotificationPermission"
        component={NotificationPermissionScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="LocationSelection"
        component={LocationSelectionScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="ManualLoaction"
        component={ManualLoactionScreen}
        options={{ presentation: "transparentModal" }}
      />
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
        name="SettingCustomer"
        component={SettingCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="AboutScreen"
        component={AboutScreen}
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
      <HomeStack.Screen
        name="SubscribeCustomer"
        component={SubscribeCustomerScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ presentation: "transparentModal" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeCustomerNavigator;
