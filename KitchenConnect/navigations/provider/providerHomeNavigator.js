import React, { useContext } from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { AuthContext } from "@/context/authContext";
import TiffinTabNavigator from "./providerTiffinNavigator";
import MenuTabNavigator from "./providerMenuNavigator";
import TiffinScreen from "@/screens/provider/tiffinScreen";
import InsideTiffinScreen from "@/screens/provider/insideTiffinScreen";

const HomeStack = createStackNavigator()

const ProviderHomeNavigator = () =>{
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


        </HomeStack.Navigator>
    )
}

export default ProviderHomeNavigator