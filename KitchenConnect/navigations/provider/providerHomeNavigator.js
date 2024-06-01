import React, { useContext } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserTypeContext } from "../../context/userTypeContext";
import MenuScreen from "@/screens/provider/menuScreen";
import OrdersScreen from "@/screens/provider/ordersScreen";
import SubscriptionsScreen from "@/screens/provider/subscriptionsScreen";
import ProfileScreen from "@/screens/provider/profileScreen";
import icons from "@/utils/customerIconpaths";
import { RefreshProvider } from '@/context/refreshContext';
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const ProviderHomeNavigator = () => {
  const [userType] = useContext(UserTypeContext);

  return (
    <RefreshProvider>
      <Tab.Navigator
        initialRouteName="Menu"
        screenOptions={({ route }) => ({
          headerShown: false,
          gestureEnabled: true,
          lazy: true,
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            let iconSource;
            switch (route.name) {
              case 'Menu':
                iconSource = focused ? icons.Kitchen.active : icons.Kitchen.inactive;
                break;
              case 'Subscriptions':
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
          tabBarActiveTintColor: '#ffa500',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Menu" component={MenuScreen} />
        <Tab.Screen name="Subscriptions" component={SubscriptionsScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Wallet" component={ProfileScreen} />
      </Tab.Navigator>
    </RefreshProvider>
  );
};

export default ProviderHomeNavigator;
