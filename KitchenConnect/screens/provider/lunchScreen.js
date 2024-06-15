import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, Alert } from 'react-native';
import menuStyle from '@/styles/provider/menuScreen';
import TiffinItem from '@/components/provider/tiffinComponent';
import { getLunchTiffins } from "@/utils/provider/providerAPI";
import { AuthContext } from "@/context/authContext";
import LoadingScreen from '../shared/loadingScreen';
import { RefreshContext } from '@/context/refreshContext';
import EditTiffinModal1 from './editTiffinModal1'
import EditTiffinModal2 from './editTiffinModal2';
import DeliveryDetailsModal from './deliveryDetailsModal';
import { editTiffins, deleteTiffin, deactivateTiffin } from '../../utils/provider/tiffinAPI';
import SortTiffinModal from '@/components/provider/sortTiffinModal';
import FilterTiffinModal from '@/components/provider/filterTiffinModal';
import {windowHeight, windowWidth} from '@/utils/dimensions'
import { useNavigation } from "@react-navigation/native"

const LunchScreen = ({navigation}) => {
  const [authState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useContext(RefreshContext);

  const [tiffins, setTiffins] = useState([]);
  const [originalTiffins, setOriginalTiffins] = useState([]);

  const [sortCriteria, setSortCriteria] = useState("rating");
  const [filterCriteria, setFilterCriteria] = useState({
    foodType: "all",
    deactivated: "all",
  });
  const [sortModal, setSortModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  

  const [editModal1, setEditModal1] = useState(false);
  const [editModal2, setEditModal2] = useState(false);
  const [editTiffin, setEditTiffin] = useState(null);

  const [deliveryModal, setDeliveryModal] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    details: {},
  });

  const fetchTiffins = async () => {
    try {
      const response = await getLunchTiffins(authState.authToken);
      setTiffins(response);
      setOriginalTiffins(response)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tiffins:', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    }
  };

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

  const handleNext = async(newDetails) =>{
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
    finally{
      toggleEditModal2()
    }
  }

  const handleEditTiffin = async (tiffin) => {
    try {
      setLoading(true)
      const response = await editTiffins(authState.authToken, tiffin.id, tiffin) 
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      console.log('Error in editing Tiffin ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    }

  };

  const closeModals = () =>{
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
        { text: 'Delete', onPress: () =>  handleDeleteTiffin(tiffinID)},
      ],
      { cancelable: false }
    );
    return true;
  };

  const handleDeleteTiffin = async(tiffinID) =>{
    try {
      toggleEditModal1()
      setLoading(true)
      const response = await deleteTiffin(authState.authToken, tiffinID) 
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      console.log('Error in Deleting Tiffin ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    }

  }

   

  const handleDeactivateTiffin = async(tiffinID) => {
    try {
      toggleEditModal1()
      setLoading(true)
      const response = await deactivateTiffin(authState.authToken, tiffinID) 
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      console.log('Error in Deactivating Tiffin ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
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

  useEffect(() => {
    setLoading(true);
    fetchTiffins();
  }, [refresh]);

  useEffect(() => {
    let sortedTiffins = [...originalTiffins];

    if (sortCriteria === "priceHighToLow") {
      sortedTiffins.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortCriteria === "priceLowToHigh") {
      sortedTiffins.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortCriteria === "rating") {
      sortedTiffins.sort((a, b) => b.rating - a.rating);
    }

    let filteredTiffins = [...sortedTiffins];

    if (filterCriteria.foodType !== "all") {
      filteredTiffins = filteredTiffins.filter(
        (tiffin) => tiffin.foodType === filterCriteria.foodType
      );
    }

    if (filterCriteria.deactivated !== "all") {
      filteredTiffins = filteredTiffins.filter(
        (tiffin) => tiffin.deactivated === filterCriteria.deactivated
      );
    }

    setTiffins(filteredTiffins);
  }, [sortCriteria, filterCriteria, , originalTiffins]);

  const onSortChange = (criteria) => {
    setSortCriteria(criteria);
    setSortModal(false);
  };

  const onFilterChange = (type, value) => {
    setFilterCriteria((prev) => ({ ...prev, [type]: value }));
    setFilterModal(false);
  };

  const handleTiffinPress = (tiffin) =>{
      navigation.getParent().navigate("Inside Tiffin", {
        tiffin: tiffin
      })

  }

  return (
    <SafeAreaView style={menuStyle.screen}>
      {authState.authToken ? (
        loading ? (
          <LoadingScreen />
        ) : (
          <>
            <View style={styles.filterSortContainer}>
              <TouchableOpacity
                style={[
                  styles.sortContainer,
                  sortCriteria !== "rating" && {
                    borderColor: "#ffa500",
                    backgroundColor: "#FFECEC",
                  },
                ]}
                onPress={() => setSortModal(true)}
              >
                <Text style={styles.filterSortText}>Sort</Text>
                <Image
                  source={
                    sortCriteria === "rating"
                      ? require("../../assets/sort_filter/icons8-tune-ios-17-outlined/icons8-tune-100.png")
                      : require("../../assets/sort_filter/icons8-tune-ios-17-filled/icons8-tune-100.png")
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortContainer,
                  filterCriteria.foodType !== "all" && {
                    backgroundColor: "#FFECEC",
                    borderColor: "#ffa500",
                  },
                  filterCriteria.deactivated !== "all" && {
                    backgroundColor: "#FFECEC",
                    borderColor: "#ffa500",
                  },
                ]}
                onPress={() => setFilterModal(true)}
              >
                <Text style={styles.filterSortText}>Filter</Text>
                <Image
                  source={
                    filterCriteria.foodType === "all"
                      ? require("../../assets/sort_filter/icons8-filter-ios-17-outlined/icons8-filter-100.png")
                      : require("../../assets/sort_filter/icons8-filter-ios-17-filled/icons8-filter-100.png")
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <SortTiffinModal
              visible={sortModal}
              onClose={() => setSortModal(false)}
              onSortChange={onSortChange}
              sortCriteria={sortCriteria}
            />

            <FilterTiffinModal
              visible={filterModal}
              onClose={() => setFilterModal(false)}
              onFilterChange={onFilterChange}
              filterCriteria={filterCriteria}
            />

            {tiffins.length !== 0 ? (
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
                    deactivated={item.deactivated}
                    edit={() => handleEditModal(item)}
                    showDelivery={() => handleDeliveryModal(item.name, item.deliveryDetails)}
                    onPress={() => handleTiffinPress(item)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={menuStyle.flatList}
              />
            ) : (
              <Text style={menuStyle.noTiffinsText}>No Lunch Tiffins Found</Text>
            )}

            {editModal1 ? (
              <EditTiffinModal1
                isVisible={editModal1}
                item={editTiffin}
                onClose={toggleEditModal1}
                onNext={handleNext}
                onDeleteTiffin={alertDelete}
                onDeactivateTiffin={handleDeactivateTiffin}
              />
            ): null}
            {editModal2 ? (
              <EditTiffinModal2
                isVisible={editModal2}
                item={editTiffin}
                onBack={toggleEditModal2}
                onClose={closeModals}
                onEditTiffin={handleEditTiffin}
              />
            ): null}
            {deliveryDetails && (
              <DeliveryDetailsModal
                isVisible={deliveryModal}
                info={deliveryDetails}
                onClose={toggleDeliveryModal}
              />
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
  },
  filterSortContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    marginTop: windowHeight * 0.007,
    alignItems: "flex-start",
    alignContent: "center",
    paddingHorizontal: windowWidth * 0.005,
    // backgroundColor: "#ffaa",
    marginBottom: windowHeight * 0.008,
  },
  filterSortText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    marginRight: windowWidth * 0.02,
  },
  sortContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: windowWidth * 0.05,
    padding: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.03,
    marginLeft: windowWidth * 0.02,
  },
  icon: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },
  tiffins:{
    alignItems: 'center'
  },
  flatList: {
  },
});
