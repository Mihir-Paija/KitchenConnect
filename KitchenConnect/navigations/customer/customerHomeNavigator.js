import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import ProfileCustomerScreen from "../../screens/customer/profileCustomerScreen";
import HomeCustomerScreen from "../../screens/customer/homeCustomerScreen";
import TiffinCustomerScreen from "../../screens/customer/tiffinCustomerScreen";
import MenuCustomerScreen from "../../screens/customer/menuCustomerScreen";
import ProfileDetailsCustomerScreen from "../../screens/customer/profileDetailsCustomerScreen";
import SettingCustomerScreen from "../../screens/customer/settingCustomerScreen";
import AboutScreen from "../../screens/shared/aboutScreen";
import SubscribeCustomerScreen from "../../screens/customer/subscribeCustomerScreen";
import LocationSelectionScreen from "../../screens/shared/LocationSelectionScreen";
import ManualLoactionScreen from "../../screens/shared/ManualLoactionScreen";
import NotificationPermissionScreen from "../../screens/customer/notificationPermissionScreen";
import SuccessScreen from "../../screens/shared/SuceessScreen";

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
