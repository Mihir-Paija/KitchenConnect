import React, {useContext} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MenuScreen from '@/screens/provider/menuScreen';
import TiffinSubscriptionScreen from '@/screens/provider/tiffinSubScreen';

const MenuTab = createMaterialTopTabNavigator();

const MenuTabNavigator = ({tiffin}) => {

  return (
    
    <MenuTab.Navigator
    initialRouteName='Menu'
    screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: { fontSize: 12 },
      tabBarIndicatorStyle: {
        backgroundColor: '#ffa500', 
      },
    }}>
      <MenuTab.Screen name="Menu" component={MenuScreen} initialParams={{tiffin: tiffin}}/>
      <MenuTab.Screen name="Subscriptions" component={TiffinSubscriptionScreen} initialParams={{tiffin: tiffin}}/>
    </MenuTab.Navigator>
  );
};

export default MenuTabNavigator;