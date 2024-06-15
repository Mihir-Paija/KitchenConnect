import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, BackHandler, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import activeScreenStyles from '@/styles/shared/activeScreen';
import MenuTabNavigator from '@/navigations/provider/providerMenuNavigator';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import { AuthContext } from "@/context/authContext";
import AddMenuModal from './addMenuModal';
import MenuScreenHeader from '@/components/provider/menuScreenHeader';
import { addMenu } from '@/utils/provider/menuAPI';
import { getProfile } from '@/utils/provider/providerAPI';
import LoadingScreen from '../shared/loadingScreen';
import { RefreshContext } from '@/context/refreshContext';

const InsideTiffinScreen = ({ route, navigation }) => {
  const { tiffin } = route.params
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const [authState] = useContext(AuthContext);

  const handleBack = async() =>{
    navigation.navigate("Tiffin")
  }

  useEffect(() => {

    const backAction = () => {
      navigation.navigate("Tiffin")

      return true
    }


    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  })





  return (
    <SafeAreaView style={styles.screen}>
      {authState.authToken ? (
        loading ? (
          <LoadingScreen />
        ) : (
          <>
            <View style={styles.container}>
              <View style={styles.topView}>
                <MenuScreenHeader 
                tiffin={tiffin}
                onBack={handleBack}
                />
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
    maxHeight: '25%', 
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
  price:{
    fontSize: windowHeight*0.02,
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