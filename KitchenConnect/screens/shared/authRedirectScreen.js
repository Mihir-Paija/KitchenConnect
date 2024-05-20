import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '@/context/authContext';

const AuthRedirect = ({ navigation }) => {
  const [authState] = useContext(AuthContext);

  useEffect(() => {
    if (authState.authToken) {
        if(authState.authType === 'customer')
            navigation.replace('CustomerAuthNavigator');
    else if(authState.authType === 'provider')
       navigation.replace('ProviderAuthNavigator');
    } else {
      navigation.replace('Choose');
    }
  }, [authState, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthRedirect;
