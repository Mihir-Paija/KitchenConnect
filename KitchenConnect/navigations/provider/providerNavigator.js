import React, { useContext } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserTypeContext } from "../../context/userTypeContext";
import ProviderHomeNavigator from "./providerHomeNavigator";
import TiffinScreen from "@/screens/provider/tiffinScreen";
import OrderTabNavigator from "./orderNavigator";
import SubscriberNavigator from "./subscriberNavigator";
import WalletScreen from "@/screens/provider/walletScreen";
import icons from "@/utils/customerIconpaths";
import { RefreshProvider } from '@/context/refreshContext';
import { NavigationContainer } from "@react-navigation/native";
import HistoryScreen from "../../screens/provider/historyScreen";

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
                iconSource = focused ? icons.Orders.active : icons.Orders.inactive;
                break;
              case 'History':
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
        <Tab.Screen name="Subscribers" component={SubscriberNavigator} />
        <Tab.Screen name="Orders" component={OrderTabNavigator} />
        <Tab.Screen name='History' component={HistoryScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
      </Tab.Navigator>
    </RefreshProvider>
  );
};

export default ProviderNavigator;
