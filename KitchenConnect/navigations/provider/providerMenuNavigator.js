import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LunchScreen from '@/screens/provider/lunchScreen'; 
import DinnerScreen from '@/screens/provider/dinnerScreen'; 

const MenuTab = createMaterialTopTabNavigator();

const MenuTabNavigator = () => {
  return (
    <MenuTab.Navigator
    initialRouteName='Lunch'
    screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: { fontSize: 12 },
      tabBarIndicatorStyle: {
        backgroundColor: '#ffa500', 
      },
    }}>
      <MenuTab.Screen name="Lunch" component={LunchScreen} />
      <MenuTab.Screen name="Dinner" component={DinnerScreen} />
    </MenuTab.Navigator>
  );
};

export default MenuTabNavigator;