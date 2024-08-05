import React, { useContext } from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { AuthContext } from "@/context/authContext";
import TiffinScreen from "@/screens/provider/tiffinScreen";
import InsideTiffinScreen from "@/screens/provider/insideTiffinScreen";
import ProfileScreen from "@/screens/provider/profileScreen";
import PersonalProfileScreen from "@/screens/provider/personalProfileScreen";
import KitchenProfileScreen from "@/screens/provider/kitchenProfileScreen";
import SettingsScreen from "@/screens/provider/settingScreen";
import AboutScreen from "@/screens/shared/aboutScreen";

const HomeStack = createStackNavigator()

const ProviderHomeNavigator = () => {
  const [authState] = useContext(AuthContext)

  return (
    <HomeStack.Navigator
      initialRouteName="Tiffin"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}
    >

      <HomeStack.Screen
        name="Tiffin"
        component={TiffinScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="Inside Tiffin"
        component={InsideTiffinScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="Personal Profile"
        component={PersonalProfileScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="Kitchen Profile"
        component={KitchenProfileScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ presentation: "transparentModal" }}
      />
      <HomeStack.Screen
        name="About"
        component={AboutScreen}
        options={{ presentation: "transparentModal" }}
      />
    </HomeStack.Navigator>
  )
}

export default ProviderHomeNavigator