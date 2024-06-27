import React, {useContext} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PreparationScreen from '../../screens/provider/preparationScreen';
import OrderRequestScreen from '../../screens/provider/orderRequestScreen';
import { StatusBar } from 'react-native';

const OrderTab = createMaterialTopTabNavigator();

const OrderTabNavigator = ({}) => {

  return (
    
    <OrderTab.Navigator
    initialRouteName='Preparations'
    screenOptions={{
        tabBarStyle: {
            paddingTop: StatusBar.currentHeight * 1.1
        },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: { fontSize: 15 },
      tabBarIndicatorStyle: {
        backgroundColor: '#ffa500', 
      },
    }}>
      <OrderTab.Screen name="Preparations" component={PreparationScreen}/>
      <OrderTab.Screen name="Order Requests" component={OrderRequestScreen}/>
    </OrderTab.Navigator>
  );
};

export default OrderTabNavigator;