import React, { useContext } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserTypeContext } from "../../context/userTypeContext";
import MenuScreen from "@/screens/provider/menuScreen";
import OrdersScreen from "@/screens/provider/ordersScreen";
import SubscriptionsScreen from "@/screens/provider/subscriptionsScreen";
import ProfileScreen from "@/screens/provider/profileScreen";
import icons from "@/utils/customerIconpaths"

const Tab = createBottomTabNavigator();

const ProviderHomeNavigator = () => {
  //global states
  const [userType] = useContext(UserTypeContext);

  return (
    <Tab.Navigator
    initialRouteName="Provider Menu"
    screenOptions={ ({ route }) => ({
      headerShown: false,
      gestureEnabled: true,
      tabBarIcon: ({ focused }) => {
        let iconSource;
        switch (route.name) {
          case 'Provider Menu':
            iconSource = focused ? icons.Tiffin.active : icons.Tiffin.inactive;
            break;
          case 'Orders':
            iconSource = focused ? icons.History.active : icons.History.inactive;
            break;
          case 'Subscriptions':
            iconSource = focused ? icons.Wallet.active : icons.Wallet.inactive;
            break;
          case 'Profile':
            iconSource = focused ? icons.Profile.active : icons.Profile.inactive;
            break;
        }
        return <Image source={iconSource} style={{ width: 25, height: 25 }} />;
      },
      tabBarActiveTintColor: '#ffa500',
      tabBarInactiveTintColor: 'gray',
      
    })}
  >
    <Tab.Screen name="Menu" component={MenuScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Subscriptions" component={SubscriptionsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
  );
};

export default ProviderHomeNavigator;
