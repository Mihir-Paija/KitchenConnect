import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import activeScreenStyles from "@styles/shared/activeScreen";

const HomeScreen = () => {
  //const [authState] = useContext(AuthContext);

  return (
    <View style={activeScreenStyles.screen}>
      <Text>Add Your Menu</Text>
      {/* {authState.authToken ? ( // Check for authToken in authState
        <>
          <Text>Add Your Menu</Text>
          <Text>{JSON.stringify(authState)}</Text>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )} */}
    </View>
  );
};

export default HomeScreen;
