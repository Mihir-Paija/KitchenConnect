import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TodayMenuScreen from '@/screens/provider/todayMenuScreen'; 
import WeeklyMenuScreen from '@/screens/provider/weeklyMenuScreen'; 

const MenuTab = createMaterialTopTabNavigator();

const MenuTabNavigator = () => {
  return (
    <MenuTab.Navigator
    initialRouteName='Today'
    screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: { fontSize: 12 },
      tabBarIndicatorStyle: {
        backgroundColor: '#ffa500', 
      },
    }}>
      <MenuTab.Screen name="Today" component={TodayMenuScreen} />
      <MenuTab.Screen name="Weekly" component={WeeklyMenuScreen} />
    </MenuTab.Navigator>
  );
};

export default MenuTabNavigator;