import React, {useContext} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MenuScreen from '@/screens/provider/menuScreen';
import SubScreen from '@/screens/provider/subScreen';

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
      <MenuTab.Screen name="Subscriptions" component={SubScreen} />
    </MenuTab.Navigator>
  );
};

export default MenuTabNavigator;