import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, BackHandler, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import activeScreenStyles from '@/styles/shared/activeScreen';
import MenuTabNavigator from '@/navigations/provider/providerMenuNavigator';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import { AuthContext } from "@/context/authContext";
import AddMenuModal from './addMenuModal';
import { addMenu } from '@/utils/provider/menuAPI';
import { getProfile } from '@/utils/provider/providerAPI';
import LoadingScreen from '../shared/loadingScreen';
import { RefreshContext } from '@/context/refreshContext';

const InsideTiffinScreen = ({ route, navigation }) => {
  const { tiffin } = route.params
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
    console.log('Adding Menu:', menuData);
    const response = await addMenu(authState.authToken, tiffin.id, menuData);
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

  const handleBack = async() =>{
    navigation.navigate("Tiffin")
  }


  useEffect(() => {
    setLoading(true);
    fetchProfile();
  }, []);



  return (
    <SafeAreaView style={styles.screen}>
      {authState.authToken ? (
        loading ? (
          <LoadingScreen />
        ) : (
          <>
            <View style={styles.backButtonContainer}>
              <Icon
                name="arrow-back"
                type="ionicon"
                style={styles.backButton}
                onPress={handleBack}
              />
            </View>
            <View style={styles.container}>
              <View style={styles.topView}>
                <Text style={styles.providerName} numberOfLines={1} adjustsFontSizeToFit>
                  {tiffin.name}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.bottomView}>
                <MenuTabNavigator tiffin={tiffin} />
              </View>
            </View>
          </>
        )
      ) : (
        <Text>Please Login!</Text>
      )}
    </SafeAreaView>
  );
};

export default InsideTiffinScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButtonContainer: {
    position: 'absolute',
    top: windowHeight * 0.04, 
    left: windowWidth * 0.02, 
  },
  backButton: {
    color: 'black',
    fontSize: windowWidth * 0.08,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.05,
    maxHeight: '25%', // Ensure it doesn't exceed 25% of the screen height
  },
  bottomView: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
  },
  providerName: {
    color: 'black',
    fontSize: windowHeight * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%',
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: windowWidth * 0.01,
  },
});