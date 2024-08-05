import React, {useContext} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LunchScreen from '@/screens/provider/lunchScreen'; 
import DinnerScreen from '@/screens/provider/dinnerScreen'; 



const TiffinTab = createMaterialTopTabNavigator();

const TiffinTabNavigator = () => {

  return (
    
    <TiffinTab.Navigator
    initialRouteName='Lunch'
    screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: { fontSize: 12 },
      tabBarIndicatorStyle: {
        backgroundColor: '#ffa500', 
      },
    }}>
      <TiffinTab.Screen name="Lunch" component={LunchScreen} />
      <TiffinTab.Screen name="Dinner" component={DinnerScreen}/>
    </TiffinTab.Navigator>
  );
};

export default TiffinTabNavigator;