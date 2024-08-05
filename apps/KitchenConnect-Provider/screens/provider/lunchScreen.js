import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, Alert } from 'react-native';
import menuStyle from '@/styles/provider/menuScreen';
import TiffinItem from '@/components/provider/tiffinComponent';
import { getLunchTiffins } from "@/utils/provider/providerAPI";
import { AuthContext } from "@/context/authContext";
import LoadingScreen from '../shared/loadingScreen';
import { RefreshContext } from '@/context/refreshContext';
import SortTiffinModal from '@/components/provider/sortTiffinModal';
import FilterTiffinModal from '@/components/provider/filterTiffinModal';
import { windowHeight, windowWidth } from '@/utils/dimensions'

const LunchScreen = ({ navigation }) => {
  const [authState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [globalRefresh, setGlobalRefresh] = useContext(RefreshContext)

  const [tiffins, setTiffins] = useState([]);
  const [originalTiffins, setOriginalTiffins] = useState([]);

  const [sortCriteria, setSortCriteria] = useState("rating");
  const [filterCriteria, setFilterCriteria] = useState({
    foodType: "all",
    deactivated: "all",
  });

  const [sortModal, setSortModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    fetchTiffins();
  }, [globalRefresh]);

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

  const handleTiffinPress = (tiffin) => {
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
                    {...item}
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
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
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
  tiffins: {
    alignItems: 'center'
  },
  flatList: {
  },
});
