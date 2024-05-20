import React, { useContext } from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import HomeScreen from "@/screens/provider/homeCustomerScreen";
import { UserTypeContext } from "../../context/userTypeContext";

const homeStack = createStackNavigator();

const ProviderHomeNavigator = ({ route }) => {
  //global states
  const [userType] = useContext(UserTypeContext);

  return (
    <homeStack.Navigator
      initialRouteName="Provider Home"
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
      <homeStack.Screen
        name="Provider Home"
        component={HomeScreen}
        options={{ presentation: "transparentModal" }}
      />
    </homeStack.Navigator>
  );
};

export default ProviderHomeNavigator;
