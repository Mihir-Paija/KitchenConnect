import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, BackHandler, TouchableOpacity } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import TiffinTabNavigator from '@/navigations/provider/providerTiffinNavigator';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import { AuthContext } from "@/context/authContext";
import { addTiffin } from '@/utils/provider/tiffinAPI';
import { getProfile } from '@/utils/provider/providerAPI';
import LoadingScreen from '../shared/loadingScreen';
import { RefreshContext } from '@/context/refreshContext';
import AddTiffinModal1 from './addTiffinModal1';
import AddTiffinModal2 from './addTiffinModal2';

const TiffinScreen = ({navigation}) => {
  const [isModal1Visible, setIsModal1Visible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useContext(RefreshContext);
  const [authState] = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    shortDescription: '',
  });

  const [tiffinData, setTiffinData] = useState({
    name: "",
    shortDescription: "",
    price: "",
    
  })
 
  const toggleModal1 = () => {
    setIsModal1Visible(!isModal1Visible);
  };

  const toggleModal2 = () => {
    setIsModal2Visible(!isModal2Visible);
    
  };

  const handleModal2 = async (tiffin) =>{
    try {
      setTiffinData({
        name: tiffin.name,
        shortDescription: tiffin.shortDescription,
        price: tiffin.price,
      })
    } catch (error) {
      console.log(error)
    }
    finally{
      toggleModal2()
    }
  
  }

  const closeModals = () =>{
    toggleModal1()
    toggleModal2()
    setTiffinData({
      name: "",
      shortDescription: "",
      price: "",
      
    })
    
  }

  const handleAddTiffin = async (tiffinData) => {
    console.log('Adding tiffin:', tiffinData);
    const response = await addTiffin(authState.authToken, tiffinData);
    console.log(response);
    toggleModal1();
    toggleModal2();
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
      'Do You Want To Exit The App?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
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
                <TouchableOpacity style={styles.btn} onPress={toggleModal1}>
                  <Text style={styles.addTiffinText}>Add Tiffin</Text>
                </TouchableOpacity>
              </View>
              {isModal1Visible ?
              <AddTiffinModal1
                isVisible={isModal1Visible}
                onClose={toggleModal1}
                onNext={handleModal2}
              /> : null}
              {isModal2Visible ? 
              <AddTiffinModal2
                isVisible={isModal2Visible}
                tiffin={tiffinData}
                onBack={toggleModal2}
                onClose={closeModals}
                onAddTiffin={handleAddTiffin}
              /> : null}
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