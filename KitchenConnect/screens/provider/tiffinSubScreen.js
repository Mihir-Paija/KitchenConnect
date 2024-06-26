import React, {useContext, useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import TiffinSubscription from '../../components/provider/tiffinSubscriptionComponent';
import {AuthContext} from '@/context/authContext'
import {RefreshContext} from '@/context/refreshContext'
import { windowWidth, windowHeight } from '@/utils/dimensions';
import LoadingScreen from '../shared/loadingScreen';
import { getSubscriptions, addSubscription } from '@/utils/provider/subscriptionAPI';
import CreateSubModal from './createSubModal';
import EditSubModal from './editSubModal';
import { deleteSubscription, editSub } from '../../utils/provider/subscriptionAPI';

const TiffinSubscriptionScreen = ({ route, navigation}) => {
  const {tiffin} = route.params
  const [subscriptions, setSubscriptions] = useState([])

  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [authState] = useContext(AuthContext)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editSubscription, setEditSubscription] = useState(false)

  const fetchSubscriptions = async() =>{
    try {
      const response = await getSubscriptions(authState.authToken, tiffin.id)
      setSubscriptions(response)

    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
    
  }



  useEffect(() =>{
    setLoading(true)
    fetchSubscriptions()

  }, [, refresh])

  const toggleCreateModal = () =>{
    setCreateModal(!createModal)
  }

  const handleCreate = async(newSubscription) =>{
    try {
      setLoading(true)
      toggleCreateModal()
      if(subscriptions.find(item => item.title === newSubscription.title)){
        Alert.alert("Subscription Already Exists!");
        return;
        //stop going from finally
      }
      console.log(newSubscription)
      const response = await addSubscription(authState.authToken, tiffin.id, newSubscription)

    } catch (error) {
      console.log('Error in Creating Subscription ', error)
      Alert.alert(error.message || 'An error occured! Please Try Again')
      
    } finally{
      setLoading(false)
      setRefresh(!refresh);
    }
  }

  const toggleEditModal = () =>{
    setEditModal(!editModal)
  }

  const openEditModal = (item) =>{
    toggleEditModal();
    setEditSubscription(item);
  }

  const handleEdit = async(sub)=>{
    try {
      toggleEditModal()
      setLoading(true);
      const tiffinID = tiffin.id;
      const response = await editSub(authState.authToken, tiffinID, sub);
      
    } catch (error) {
      console.log('Error in Editing Subscription ', error)
      Alert.alert(error.message || 'An error occured! Please Try Again')
    }
    finally{
      setLoading(false);
      setRefresh(!refresh);
    }
  }

  const alertDelete = (title) => {
    Alert.alert(
      'Delete!',
      `Are You Sure You Want To Delete`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Delete', onPress: () =>  handleDelete(title)},
      ],
      { cancelable: false }
    );
    return true;
  };

  const handleDelete = async(title)=>{
    try {
      setLoading(true)
      const bodyData = {
        title: title
      }
      toggleEditModal()
      const tiffinID = tiffin.id;
      const response = await deleteSubscription(authState.authToken, tiffinID, bodyData)
    } catch (error) {
      console.log('Error in Deleting Subscription ', error)
      Alert.alert(error.message || 'An error occured! Please Try Again')
    }finally{
      setLoading(false)
      setRefresh(!refresh);
    }
  }

  return (
    <SafeAreaView style={activeScreenStyles.screen}>
      {authState.authToken ?<>
      {loading ? 
      <LoadingScreen /> 
      :
      <>
      <View style = {styles.subView}>
      {subscriptions.length !== 0 ?
      <FlatList
        data={subscriptions}
        renderItem={({item}) =>(
          <TiffinSubscription
          title= {item.title}
          price={item.price}
          days={item.days}
          deliveryCharge={item.deliveryCharge}
          discount={item.discount}
          description={item.description}
          onEdit={() =>openEditModal(item)}/>
        )}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.flatList}
      /> : <Text>No Subscriptions Created</Text>}

        {createModal ? 
      <CreateSubModal
       isVisible={createModal}
       onClose={toggleCreateModal}
       onCreate={handleCreate} 
       tiffin={tiffin}
      />
      : null}

    {editModal ? 
      <EditSubModal
       isVisible={editModal}
       onClose={toggleEditModal}
       item = {editSubscription}
       onEdit={handleEdit} 
       onDelete = {alertDelete}
      />
      : null} 
      </View>

        <View style={styles.btnView}>
            <TouchableOpacity style={styles.btn} onPress={toggleCreateModal}>
              <Text style={styles.createText}>Create A Subscription</Text>
            </TouchableOpacity>
          </View>
    
      </> 
      }
      </> 
      : 
      <Text>Please Login!</Text>
      }
    </SafeAreaView>
  );
};


export default TiffinSubscriptionScreen;

const styles = StyleSheet.create({
  flatList: {
  },
  subView: {
    flex:5,
  },
  btnView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.055,
    borderRadius: 15,
    width: windowWidth * 0.7,
  },
  createText: {
    color: '#FFFFFF',
    fontSize: windowWidth * 0.04,
    fontFamily: 'NunitoBold',
  },
})