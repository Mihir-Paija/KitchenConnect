import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, BackHandler, TouchableOpacity } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import TiffinTabNavigator from '@/navigations/provider/providerTiffinNavigator';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import { AuthContext } from "@/context/authContext";
import AddTiffinModal from './addTiffinModal';
import { addTiffin } from '@/utils/provider/tiffinAPI';
import { getProfile } from '@/utils/provider/providerAPI';
import LoadingScreen from '../shared/loadingScreen';
import { RefreshContext } from '@/context/refreshContext';

const TiffinScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useContext(RefreshContext);
  const [authState] = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    shortDescription: '',
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddTiffin = async (tiffinData) => {
    console.log('Adding tiffin:', tiffinData);
    const response = await addTiffin(authState.authToken, tiffinData);
    console.log(response);
    toggleModal();
    setRefresh(!refresh);
  };

  const fetchProfile = async () => {
    try {
      const response = await getProfile(authState.authToken);
      setProfile({
        name: response.name,
        shortDescription: response.shortDescription,
      });
      setLoading(false);
    } catch (error) {
      console.log('Error in fetching profile ', error);
    }
  };

  const backAction = () => {
    Alert.alert(
      'Exit!',
      'Are You Sure You Want To Exit?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    setLoading(true);
    fetchProfile();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  });

  return (
    <SafeAreaView style={styles.screen}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>
                  Hello {profile.name}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.menuTabs}>
                <TiffinTabNavigator />
              </View>
              <View style={styles.divider} />
              <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn} onPress={toggleModal}>
                  <Text style={styles.addTiffinText}>Add Tiffin</Text>
                </TouchableOpacity>
              </View>
              <AddTiffinModal
                isVisible={isModalVisible}
                onClose={toggleModal}
                onAddTiffin={handleAddTiffin}
              />
            </>
          )}
        </>
      ) : (
        <Text>Please Login!</Text>
      )}
    </SafeAreaView>
  );
};

export default TiffinScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  providerInfo: {
    flex: 2, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.05,
  },
  providerName: {
    color: 'black',
    fontSize: windowHeight * 0.03,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    height: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    elevation: 1,
    width: '100%',
    alignSelf: 'center',
    marginVertical: windowHeight * 0.005,
  },
  menuTabs: {
    flex: 7, 
  },
  btnView: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: windowHeight * 0.01,
  },
  btn: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.055,
    borderRadius: 15,
    width: windowWidth * 0.4,
  },
  addTiffinText: {
    padding: 7,
    color: '#FFFFFF',
    fontSize: windowWidth * 0.04,
    fontFamily: 'NunitoBold',
  },
});