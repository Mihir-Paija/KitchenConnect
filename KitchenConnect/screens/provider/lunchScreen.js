import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import menuStyle from '@/styles/provider/menuScreen';
import TiffinItem from '@/components/provider/tiffinComponent';
import { getTiffins } from "@/utils/provider/providerAPI";
import { AuthContext } from "@/context/authContext";
import LoadingScreen from '../shared/loadingScreen';
import { RefreshContext } from '@/context/refreshContext';
import EditTiffinModal from './editTiffinModal';
import DeliveryDetailsModal from './deliveryDetailsModal';
import { editTiffin, deleteTiffin } from '../../utils/provider/tiffinAPI';

const LunchScreen = () => {
  const [authState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useContext(RefreshContext);

  const [tiffins, setTiffins] = useState([]);

  const [editModal, setEditModal] = useState(false);
  const [editTiffin, setEditTiffin] = useState(null);

  const [deliveryModal, setDeliveryModal] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    details: {},
  });

  const fetchTiffins = async () => {
    try {
      const response = await getTiffins(authState.authToken);
      setTiffins(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tiffins:', error);
    }
  };

  // Edit Tiffins
  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const handleEditModal = (item) => {
    setEditTiffin(item);
    setEditModal(true);
  };

  const handleEditTiffin = async (tiffin) => {
    setLoading(true)
    const response = await editTiffin(authState.authToken, tiffin.id, tiffin) 
    setLoading(false);
    setRefresh(!refresh);
  };

  const handleDeleteTiffin = async(tiffinID) =>{
    setLoading(true)
    const response = await deleteTiffin(authState.authToken, tiffinID) 
    setLoading(false);
    setRefresh(!refresh);
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

  useEffect(() => {
    setLoading(true);
    fetchTiffins();
  }, [refresh]);

  return (
    <SafeAreaView style={menuStyle.screen}>
      {authState.authToken ? (
        loading ? (
          <LoadingScreen />
        ) : (
          <>
            {tiffins.length !== 0 ? (
              <>
                <FlatList
                  data={tiffins}
                  renderItem={({ item }) => (
                    <TiffinItem
                      name={item.name}
                      description={item.shortDescription}
                      foodType={item.foodType}
                      hours={item.hours}
                      mins={item.mins}
                      price={item.price}
                      edit={() => handleEditModal(item)}
                      showDelivery={() => handleDeliveryModal(item.name, item.deliveryDetails)}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={menuStyle.flatList}
                />
                {editTiffin && (
                  <EditTiffinModal
                    isVisible={editModal}
                    item={editTiffin}
                    onClose={toggleEditModal}
                    onEditTiffin={handleEditTiffin}
                    onDeleteTiffin={handleDeleteTiffin}
                  />
                )}
                {deliveryDetails && (
                  <DeliveryDetailsModal
                    isVisible={deliveryModal}
                    info={deliveryDetails}
                    onClose={toggleDeliveryModal}
                  />
                )}
              </>
            ) : (
              <Text style={menuStyle.noTiffinsText}>No Lunch Tiffins Found</Text>
            )}
          </>
        )
      ) : (
        <Text style={menuStyle.loginText}>Please Login!</Text>
      )}
    </SafeAreaView>
  );
};

export default LunchScreen;
