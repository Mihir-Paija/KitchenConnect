import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {AuthContext} from '@/context/authContext'
import { RefreshContext } from '@/context/refreshContext';
import AddMenuModal from './addMenuModal';
import { addMenu } from '@/utils/provider/menuAPI';
import DaysScrollView from '@/components/shared/menu/dayScrollView';
import ItemComponent from '../../components/provider/itemComponent';
import { windowWidth, windowHeight } from '@/utils/dimensions';
import { getMenu } from '@/utils/provider/menuAPI';
import LoadingScreen from '../shared/loadingScreen';

const MenuScreen = ({navigation, route}) => {
  const { tiffin } = route.params
  const [authState] = useContext(AuthContext)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useContext(RefreshContext);
  const [menu, setMenu] = useState([])
  const [selectedDay, setSelectedDay] = useState("Mon");

  //Fetch Menu
  const fetchMenu = async() =>{
    setLoading(true);
    try {
      const response = await getMenu(authState.authToken, tiffin.id);
      setMenu(response);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() =>{
    fetchMenu()
  }, [, refresh])

  //View Menu
  const onDayChange = (day) => {
    setSelectedDay(day);
  };
 

  //Add Menu
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

  const selectedMenu = menu.find((menuItem) => menuItem.day === selectedDay) || { items: [] }; 

  return (
    <SafeAreaView style={styles.screen}>
      {authState.authToken ? (
        <>
          <View style={styles.daysScrollViewContainer}>
            <DaysScrollView selectedDay={selectedDay} onDayChange={onDayChange} />
          </View>
          <View style={styles.flatListContainer}>
            {selectedMenu.items.length !== 0 ?
            <FlatList
              data={selectedMenu.items}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <ItemComponent
                  name={item.itemName}
                  quantity={item.quantity}
                  unit={item.unit}
                /> 
              )}
            /> :
            <View style = {{alignItems: 'center', paddingTop: windowHeight * 0.15}}>
             <Text style = {{fontSize: windowWidth * 0.05}}>No Menu Has Been Added</Text>
             <Text style = {{fontSize: windowWidth * 0.05}}>For This Day</Text>
             </View> }
          </View>
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
      </>
      ) : 
        <Text>You are not authorized to access this screen.</Text>
      } 
    </SafeAreaView>
  );
};


export default MenuScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  daysScrollViewContainer: {
    marginVertical: windowHeight *0.01,
    marginHorizontal: windowWidth *0.01
  },
  flatListContainer: {
    flex: 1,
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