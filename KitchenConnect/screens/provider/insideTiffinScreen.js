import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, BackHandler, TouchableOpacity } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import MenuTabNavigator from '@/navigations/provider/providerMenuNavigator';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import { AuthContext } from "@/context/authContext";
import AddMenuModal from './addMenuModal';
import { addMenu } from '@/utils/provider/menuAPI';
import { getProfile } from '@/utils/provider/providerAPI';
import LoadingScreen from '../shared/loadingScreen';
import { RefreshContext } from '@/context/refreshContext';

const InsideTiffinScreen = ({route}) => {
  const {tiffinID} = route.params
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

  const handleAddMenu = async (menuData) => {
    console.log('Adding tiffin:', menuData);
    const response = await addMenu(authState.authToken, tiffinID, menuData);
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


  useEffect(() => {
    setLoading(true);
    fetchProfile();
  }, []);


  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <View style={styles.providerInfo}>
                <Text>Hello</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.menuTabs}>
                <MenuTabNavigator />
              </View>
              <View style={styles.divider} />
              <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn} onPress={toggleModal}>
                  <Text style={styles.addMenuText}>Add Menu</Text>
                </TouchableOpacity>
              </View>
              <AddMenuModal
                isVisible={isModalVisible}
                onClose={toggleModal}
                onAddMenu={handleAddMenu}
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

export default InsideTiffinScreen;

const styles = StyleSheet.create({
  providerInfo: {
    alignItems: 'center',
    marginBottom: windowHeight * 0.015,
  },
  providerName: {
    color: 'black',
    fontSize: windowHeight * 0.03,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%',
    alignSelf: 'center',
    marginVertical: windowHeight * 0.015,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: windowWidth * 0.01,
  },
  menuTabs: {
    height: windowHeight * 0.70,
    flexDirection: 'row',
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.01,
  },
  btn: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.055,
    borderRadius: 15,
  },
  addMenuText: {
    padding: 7,
    color: '#FFFFFF',
    fontSize: windowWidth * 0.04,
    fontFamily: 'NunitoBold',
  },
});
