import React, {useContext, useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView , FlatList} from 'react-native';
import menuStyle from '@/styles/provider/menuScreen';
import TiffinItem  from '@/components/provider/tiffinComponent'
import { windowWidth, windowHeight } from '@/utils/dimensions'
import {getTiffins} from '@/utils/providerAPI' 
import { AuthContext } from "@/context/authContext";
import LoadingScreen from '../shared/loadingScreen';

const LunchScreen = () => {
  const [tiffins, setTiffins] = useState([]);
  const [authState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false)

  const fetchTiffins = async () => {
    try {  
      const response = await getTiffins(authState.authToken)
      console.log(response)
      setTiffins(response);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching tiffins:', error);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit Tiffin ${id}`);
  };

  const handleDeliveryDetails = (details) => {
    console.log(`Delivery details for Tiffin ${details.deliveryCharge}`);
  };


  useEffect(() => {
    setLoading(true)
    fetchTiffins();
  }, []);

  

  return (
    <SafeAreaView style={menuStyle.screen}>
    {authState.authToken ? (
      <>
    {loading ? ( <LoadingScreen/>): (
    <>
    { tiffins.length !== 0?
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
          edit={() => handleEdit(item.id)}
          showDelivery={() => handleDeliveryDetails(item.deliveryDetails)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />: <Text style = {{color: 'black'}}>No Lunch Tiffins Found</Text>} 
    </>)}
    </>): (<Text>Please Login!</Text>)}
    </SafeAreaView>
  );
};

export default LunchScreen;