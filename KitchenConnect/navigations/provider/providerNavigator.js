import React, { useContext } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserTypeContext } from "../../context/userTypeContext";
import ProviderHomeNavigator from "./providerHomeNavigator";
import TiffinScreen from "@/screens/provider/tiffinScreen";
import OrdersScreen from "@/screens/provider/ordersScreen";
import SubscriptionsScreen from "@/screens/provider/subscriptionsScreen";
import ProfileScreen from "@/screens/provider/profileScreen";
import icons from "@/utils/customerIconpaths";
import { RefreshProvider } from '@/context/refreshContext';
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const ProviderNavigator = () => {
  const [userType] = useContext(UserTypeContext);

  return (
    <RefreshProvider>
      <Tab.Navigator
        initialRouteName="My Tiffins"
        screenOptions={({ route }) => ({
          headerShown: false,
          gestureEnabled: true,
          lazy: true,
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            let iconSource;
            switch (route.name) {
              case 'My Tiffins':
                iconSource = focused ? icons.Kitchen.active : icons.Kitchen.inactive;
                break;
              case 'Subscribers':
                iconSource = focused ? icons.Subscription.active : icons.Subscription.inactive;
                break;
              case 'Orders':
                iconSource = focused ? icons.History.active : icons.History.inactive;
                break;
              case 'Wallet':
                iconSource = focused ? icons.Wallet.active : icons.Wallet.inactive;
                break;
            }
            return <Image source={iconSource} style={{ width: 25, height: 25 }} />;
          },
          tabBarActiveTintColor: '#FFA500',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="My Tiffins" component={ProviderHomeNavigator} />
        <Tab.Screen name="Subscribers" component={SubscriptionsScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Wallet" component={ProfileScreen} />
      </Tab.Navigator>
    </RefreshProvider>
  );
};

export default ProviderNavigator;
