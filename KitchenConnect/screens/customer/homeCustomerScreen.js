import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { CustomerAuthContext } from "../../context/authContext";
import activeScreenStyles from "@/styles/shared/activeScreen";
import FooterMenu from "../../components/shared/menu/footerMenu";

const HomeCustomerScreen = () => {
  const [authCustomerState] = useContext(CustomerAuthContext);

  return (
    <View style={activeScreenStyles.screen}>
      {authCustomerState.authCustomerToken ? ( // Check for authCustomerToken in authCustomerState
        <>
          <Text>HomeCustomerScreen</Text>
          <Text>{JSON.stringify(authCustomerState)}</Text>
          <FooterMenu />
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </View>
  );
};

export default HomeCustomerScreen;
