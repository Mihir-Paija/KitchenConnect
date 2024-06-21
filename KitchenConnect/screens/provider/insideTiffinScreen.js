import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, BackHandler, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
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
import EditTiffinModal1 from './editTiffinModal1'
import EditTiffinModal2 from './editTiffinModal2';
import DeliveryDetailsModal from './deliveryDetailsModal';
import { editTiffins, deleteTiffin, deactivateTiffin } from '../../utils/provider/tiffinAPI';


const InsideTiffinScreen = ({ route, navigation }) => {
  const { tiffin } = route.params
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalRefresh, setGlobalRefresh] = useContext(RefreshContext)
  const [authState] = useContext(AuthContext);

  const [editModal1, setEditModal1] = useState(false);
  const [editModal2, setEditModal2] = useState(false);
  const [editTiffin, setEditTiffin] = useState(null);

  const [deliveryModal, setDeliveryModal] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    details: {},
  });

  // Edit Tiffins
  const toggleEditModal1 = () => {
    setEditModal1(!editModal1);
  };

  const toggleEditModal2 = () => {
    setEditModal2(!editModal2);
  };

  const handleEditModal = (item) => {
    setEditTiffin(item);
    setEditModal1(true);
  };

  const handleNext = async (newDetails) => {
    try {
      setEditTiffin({
        ...editTiffin,
        id: newDetails.id,
        name: newDetails.name,
        shortDescription: newDetails.shortDescription,
        price: newDetails.price,
      })


    } catch (error) {
      console.log(error)
    }
    finally {
      toggleEditModal2()
    }
  }

  const handleEditTiffin = async (tiffin) => {
    try {
      setLoading(true)
      const response = await editTiffins(authState.authToken, tiffin.id, tiffin)
      setLoading(false);
      setGlobalRefresh(!globalRefresh);
    } catch (error) {
      console.log('Error in editing Tiffin ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    }finally{
      navigation.navigate("Tiffin")
    }

  };

  const closeModals = () => {
    toggleEditModal1()
    toggleEditModal2()
    setEditTiffin(null)

  }

  const alertDelete = (name, tiffinID) => {
    Alert.alert(
      'Delete!',
      `Are You Sure You Want To Delete ${name}`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => handleDeleteTiffin(tiffinID) },
      ],
      { cancelable: false }
    );
    return true;
  };

  const handleDeleteTiffin = async (tiffinID) => {
    try {
      toggleEditModal1()
      setLoading(true)
      const response = await deleteTiffin(authState.authToken, tiffinID)
      setLoading(false);
      setGlobalRefresh(!globalRefresh);
    } catch (error) {
      console.log('Error in Deleting Tiffin ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    }finally{
      navigation.navigate("Tiffin")
    }

  }

  const handleDeactivateTiffin = async (tiffinID) => {
    try {
      toggleEditModal1()
      setLoading(true)
      const response = await deactivateTiffin(authState.authToken, tiffinID)
      setLoading(false);
      setGlobalRefresh(!globalRefresh);
    } catch (error) {
      console.log('Error in Deactivating Tiffin ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    }finally{
      navigation.navigate("Tiffin")
    }


  }

  // See Delivery Details
  const toggleDeliveryModal = () => {
    setDeliveryModal(!deliveryModal);
  };

  const handleDeliveryModal = async (name, details) => {
    setDeliveryDetails({
      name: name,
      details: details || {},
    });
    setDeliveryModal(!deliveryModal);
  };

  const handleBack = async () => {
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
                  onEdit={()=>handleEditModal(tiffin)}
                  showDelivery={() => handleDeliveryModal(tiffin.name, tiffin.deliveryDetails)}
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.bottomView}>
                <MenuTabNavigator tiffin={tiffin} />
              </View>
            </View>

            {editModal1 ? (
              <EditTiffinModal1
                isVisible={editModal1}
                item={editTiffin}
                onClose={toggleEditModal1}
                onNext={handleNext}
                onDeleteTiffin={alertDelete}
                onDeactivateTiffin={handleDeactivateTiffin}
              />
            ) : null}

            {editModal2 ? (
              <EditTiffinModal2
                isVisible={editModal2}
                item={editTiffin}
                onBack={toggleEditModal2}
                onClose={closeModals}
                onEditTiffin={handleEditTiffin}
              />
            ) : null}

            {deliveryDetails && (
              <DeliveryDetailsModal
                isVisible={deliveryModal}
                info={deliveryDetails}
                onClose={toggleDeliveryModal}
              />)}

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
    paddingTop: StatusBar.currentHeight * 1.2,
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
  price: {
    fontSize: windowHeight * 0.02,
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