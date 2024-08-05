import React from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import SubscriberScreen from "@/screens/provider/subscriberScreen";
import SubscriptionDetailsScreen from "@/screens/provider/subDetailScreen";

const SubscriberStack = createStackNavigator()

const SubscriberNavigator = () =>{

    return (
        <SubscriberStack.Navigator
        initialRouteName="Subscriber"
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

        <SubscriberStack.Screen
            name="Subscriber"
            component={SubscriberScreen}
            options={{ presentation: "transparentModal" }}
        />

        <SubscriberStack.Screen
            name="Subscription Details"
            component={SubscriptionDetailsScreen}
            options={{ presentation: "transparentModal" }}
        />


        </SubscriberStack.Navigator>
    )
}

export default SubscriberNavigator