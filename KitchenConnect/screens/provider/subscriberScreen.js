import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList, Alert, TouchableOpacity, Image } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import { AuthContext } from "@/context/authContext";
import { RefreshContext } from '@/context/refreshContext'
import SubStatusComponent from '@/components/provider/subStatusComponent';
import AcceptedSubComponent from '../../components/provider/acceptedSubComponent';
import PendingSubComponent from '../../components/provider/pendingSubComponent';
import CompletedSubComponent from '../../components/provider/completedSubComponent';
import { getSubscribers, decideStatus } from '@/utils/provider/subscriberAPI';
import LoadingScreen from '../shared/loadingScreen';
import {windowHeight, windowWidth} from '@/utils/dimensions'
import SortSubModal from '../../components/provider/sortSubModal';
import FilterSubModal from '../../components/provider/filterSubModal';



const SubscriberScreen = ({ navigation }) => {

  const [authState] = useContext(AuthContext);
  const [refresh, setRefresh] = useContext(RefreshContext);
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(true);
  const [pending, setPending] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activeSubscribers, setActiveSubscribers] = useState([]);
  const [originalActiveSubscribers, setOriginalActiveSubscribers] = useState([])
  const [pendingSubscribers, setPendingSubscribers] = useState([]);
  const [completedSubscribers, setCompletedSubscribers] = useState([]);

  const [sortModal, setSortModal] = useState(false)
  const [sortCriteria, setSortCriteria] = useState("noSort")
  const [filterModal, setFilterModal] = useState(false)
  const [filterCriteria, setFilterCriteria] = useState({
    subscription: 'all',
    tiffin: 'All',
    tiffinType: 'all',
  })
  const [tiffins, setTiffins] = useState([])


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const response = await getSubscribers(authState.authToken)
      //console.log(response)
      const active = [];
      const pending = [];
      const completed = [];
      const currentDate = new Date();
      const tiffins = new Set();
      tiffins.add('All')

      for (const subscriber of response) {

        const formattedSubscriber = {
          ...subscriber,
          formattedStartDate: formatDate(new Date(subscriber.startDate)),
          formattedEndDate: formatDate(new Date(subscriber.endDate)),
        };

        if (new Date(subscriber.endDate) < currentDate && subscriber.accepted) {
          completed.push(formattedSubscriber);
        }
        else if (subscriber.accepted) {
          tiffins.add(subscriber.tiffinName)
          active.push(formattedSubscriber);
        } else if (subscriber.pending) {
          pending.push(formattedSubscriber);
        }
      }
      //console.log(tiffins)


      setActiveSubscribers(active);
      setOriginalActiveSubscribers(active);
      setPendingSubscribers(pending);
      setCompletedSubscribers(completed);
      setTiffins(tiffins);

    } catch (error) {
      console.log('Error in Fetching Subscribers ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [, refresh])

  const handleActive = () => {
    setPending(false)
    setCompleted(false)
    setActive(true)
  }

  const handlePending = () => {
    setActive(false)
    setCompleted(false)
    setPending(true)
  }

  const handleCompleted = () => {
    setActive(false)
    setPending(false)
    setCompleted(true)
  }

  const handleStatus = async (id, status, comments) => {
    try {
      setLoading(true)
      bodyData = {
        accepted: status,
        comments
      }
      const response = await decideStatus(authState.authToken, id, bodyData)
    } catch (error) {
      console.log('Error in Deciding Status ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false)
      setRefresh(!refresh)
    }

  }

  const toggleSortModal= () =>{
    setSortModal(!sortModal)
  }

  const toggleFilterModal= () =>{
    setFilterModal(!filterModal)
  }

  const handleSort = (criteria) =>{
    setSortCriteria(criteria);
    toggleSortModal(true);
  }

  const handleFilter = (type, value) =>{
    console.log(type, " ", value)
    setFilterCriteria((prev) => ({ ...prev, [type]: value }))
    toggleFilterModal()
  }


  useEffect(() => {
    let sortedSubscribers = [...originalActiveSubscribers];

    if (sortCriteria === "sda") {
      sortedSubscribers.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (sortCriteria === "sdd") {
      sortedSubscribers.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (sortCriteria === "eda") {
      sortedSubscribers.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    } else if (sortCriteria === "edd") {
      sortedSubscribers.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    } else if (sortCriteria === "priceLTH") {
      sortedSubscribers.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortCriteria === "priceHTL") {
      sortedSubscribers.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortCriteria === "tiffinLTH") {
      sortedSubscribers.sort((a, b) => parseFloat(a.noOfTiffins) - parseFloat(b.noOfTiffins));
    }else if (sortCriteria === "tiffinHTL") {
      sortedSubscribers.sort((a, b) => parseFloat(b.noOfTiffins) - parseFloat(a.noOfTiffins));
    }

    
    let filteredSubscribers = [...sortedSubscribers];
    console.log(filterCriteria)

    if (filterCriteria.subscription !== "all") {
      filteredSubscribers = filteredSubscribers.filter(
        (subscriber) => subscriber.title === filterCriteria.subscription
      );
    }

    if (filterCriteria.tiffin !== "All") {
      filteredSubscribers = filteredSubscribers.filter(
        (subscriber) => subscriber.tiffinName === filterCriteria.tiffin
      );
    }

    if (filterCriteria.tiffinType !== "all") {
      filteredSubscribers = filteredSubscribers.filter(
        (subscriber) => subscriber.tiffinType === filterCriteria.tiffinType
      );
    }
    console.log(filteredSubscribers)

   setActiveSubscribers(filteredSubscribers)

  }, [sortCriteria, filterCriteria, , originalActiveSubscribers]);


  useEffect(() => {

    const backAction = () => {
      navigation.navigate("My Tiffins")

      return true
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      {loading ?
        <LoadingScreen />
        :
        (<>
          <SubStatusComponent
            active={active}
            onPressActive={handleActive}
            pending={pending}
            onPressPending={handlePending}
            completed={completed}
            onPressCompleted={handleCompleted}
          />
          {active ? 
                        (<>
                          <View style={styles.filterSortContainer}>
                            <TouchableOpacity
                              style={[
                                styles.sortContainer,
                                sortCriteria !== "noSort" && {
                                  borderColor: "#ffa500",
                                  backgroundColor: "#FFECEC",
                                },
                              ]}
                              onPress={() => setSortModal(true)}
                            >
                              <Text style={styles.filterSortText}>Sort</Text>
                              <Image
                                source={
                                  sortCriteria === "noSort"
                                    ? require("../../assets/sort_filter/icons8-tune-ios-17-outlined/icons8-tune-100.png")
                                    : require("../../assets/sort_filter/icons8-tune-ios-17-filled/icons8-tune-100.png")
                                }
                                style={styles.icon}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                styles.sortContainer,
                                filterCriteria.subscription !== "all" && {
                                  backgroundColor: "#FFECEC",
                                  borderColor: "#ffa500",
                                },
                                filterCriteria.tiffin !== "All" && {
                                  backgroundColor: "#FFECEC",
                                  borderColor: "#ffa500",
                                },
                                filterCriteria.tiffinType !== "all" && {
                                  backgroundColor: "#FFECEC",
                                  borderColor: "#ffa500",
                                },
                              ]}
                              onPress={() => setFilterModal(true)}
                            >
                              <Text style={styles.filterSortText}>Filter</Text>
                              <Image
                                source={
                                  filterCriteria.subscription === "all"
                                    ? require("../../assets/sort_filter/icons8-filter-ios-17-outlined/icons8-filter-100.png")
                                    : require("../../assets/sort_filter/icons8-filter-ios-17-filled/icons8-filter-100.png")
                                }
                                style={styles.icon}
                              />
                            </TouchableOpacity>
                          </View>
                          <SortSubModal
                          visible={sortModal}
                          onClose={toggleSortModal}
                          onSortChange={handleSort}
                          sortCriteria={sortCriteria}
                          />
                          <FilterSubModal
                          visible={filterModal}
                          onClose={toggleFilterModal}
                          onFilterChange={handleFilter}
                          filterCriteria={filterCriteria}
                          tiffins={Array.from(tiffins)}
                          />
            {activeSubscribers.length !== 0 ?

                <FlatList
                  data={activeSubscribers}
                  renderItem={({ item }) => (
                    <AcceptedSubComponent {...item} />
                  )}
                  keyExtractor={(item) => item._id.toString()}
                  contentContainerStyle={styles.flatList}
                />
              :
              <View style={styles.emptyView}>
                <Text>No Active Subscriptions</Text>
              </View>

            }
          </>)
            : null
          }

          {pending ?
            <View style={styles.view}>
              {pendingSubscribers.length !== 0 ?
                <FlatList
                  data={pendingSubscribers}
                  renderItem={({ item }) => (
                    <PendingSubComponent {...item}
                      onAccept={handleStatus}
                      onReject={handleStatus} />
                  )}
                  keyExtractor={(item) => item._id.toString()}
                  contentContainerStyle={styles.flatList}
                />
                :
                <View style={styles.emptyView}>
                  <Text>No Pending Subscriptions</Text>
                </View>
              }
            </View>
            : null
          }

          {completed ?
            <>
              {completedSubscribers.length !== 0 ?
                <FlatList
                  data={completedSubscribers}
                  renderItem={({ item }) => (
                    <CompletedSubComponent {...item} />
                  )}
                  keyExtractor={(item) => item._id.toString()}
                  contentContainerStyle={styles.flatList}
                />
                :
                <View style={styles.emptyView}>
                  <Text>No Completed Subscriptions</Text>
                </View>
              }
            </>
            : null
          }

        </>)}
    </SafeAreaView>
  );
};


export default SubscriberScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: StatusBar.currentHeight * 1

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
  subscribers: {
    justifyContent: 'center',
    alignContent: 'center',
  },

  flatList: {
    paddingBottom: 70,
    alignItems: 'center'
  },

  view: {
    marginTop: 20,
  },

  emptyView: {
    marginTop: 20,
    alignItems: 'center'
  }
})