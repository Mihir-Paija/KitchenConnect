import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import { RefreshContext } from '@/context/refreshContext';
import AddMenuModal from './addMenuModal';
import { addMenu } from '@/utils/provider/menuAPI';

const MenuScreen = ({navigation, route}) => {
  const { tiffin } = route.params
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useContext(RefreshContext);
 
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
  return (
    <SafeAreaView style={styles.screen}>
      <Text>Menu Screen</Text>
      <AddMenuModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onAddMenu={handleAddMenu}
      />
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={toggleModal}>
          <Text style={styles.addMenuText}>Add Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  btnView: {
    position: 'absolute',
    bottom: windowHeight * 0.02, 
    left: windowWidth * 0.3, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.055,
    borderRadius: 15,
    width: windowWidth * 0.4,
  },
  addMenuText: {
    padding: 7,
    color: '#FFFFFF',
    fontSize: windowWidth * 0.04,
    fontFamily: 'NunitoBold',
  },
});