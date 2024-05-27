import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, BackHandler, TouchableOpacity } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import MenuTabNavigator from '@/navigations/provider/providerMenuNavigator';
import { windowWidth, windowHeight } from '@/utils/dimensions'
import { AuthContext } from "@/context/authContext";
import AddMenuModal from './addMenuModal';
import { addTiffin } from '../../utils/provider/tiffinAPI';
import { getProfile } from '../../utils/APIs/providerAPI';


const MenuScreen = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const[loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [authState] = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    shortDescription: ''

})

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddMenu = async (menuData) => {
    console.log('Adding menu:', menuData);
    const response = await addTiffin(authState.authToken, menuData)
    console.log(response)
    toggleModal();
    setRefresh(!refresh)
  };

  const fetchProfile = async() =>{
    try {
      const response = await getProfile(authState.authToken)
     // console.log(response);
      setProfile({
        name: response.name,
        shortDescription: response.shortDescription
      })
      setLoading(false)
      
    } catch (error) {
      console.log("Error in fetching profile ", error)

      
    }
  }

  const backAction = () => {
    Alert.alert(
      "Exit!",
      "Are You Sure You Want To Exit?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() =>{
    setLoading(true)
    fetchProfile()
  }, [])


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      <View style={styles.providerInfo}>
        <Text styles = {{color: 'black', fontSize: windowHeight * 0.02}}> Hello {profile.name}</Text>
       {/* <View style={styles.rating}>
          <Text>Stars</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.delivery}>
          <Text>Delivery Charges</Text>
          <Text>Edit</Text>
  </View> */}
      </View>
      <View style={styles.menuTabs}>
        <MenuTabNavigator/>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress = {toggleModal}>
          <Text style={styles.addMenuText}>Add Menu</Text>
        </TouchableOpacity>
      </View>

      <AddMenuModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onAddMenu={handleAddMenu}
      />

    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  providerInfo: {
    alignItems: "center",
    height: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02
  },

  rating: {
    flexDirection: 'row',
    justifyContent: "space-around",
  },

  delivery: {
    flexDirection: 'row',
    justifyContent: "space-around",
  },

  menuTabs: {
    height: windowHeight * 0.70,
    flexDirection: "row",
  },

  btnView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowHeight * 0.017,
    marginBottom: windowHeight * 0.025,
  },

  btn: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight * 0.055,
    borderRadius: 15
  },

  addMenuText: {
    padding: 7,
    color: "#FFFFFF",
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoBold",
  }

})