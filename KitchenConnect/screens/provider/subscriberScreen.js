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
import { windowHeight, windowWidth } from '@/utils/dimensions'
import SortSubModal from '../../components/provider/sortSubModal';
import FilterSubModal from '../../components/provider/filterSubModal';
import CommentModal from './modals/commentModal';

const DUMMY_DATA = [
  {
    _id: 1,
    type: "Pending",
    providerName: "Phoenix Kitchen",
    tiffinName: "Veg Thali",
    subscriptionName: "Standard Subscription",
    tiffinType: "Lunch",
    duration: 30,
    deliveryIncluded: true,
    deliveryCharge: 50,
    price: "2000",
    discount: "10",
    priceBreakdown: {
      subscriptionPrice: 1500,
      deliveryCharge: 50,
      totalPrice: 3000,
    },
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 30,
    startDate: "2024-06-14",
    endDate: "2024-07-13",
    pricePerTiffinDelivery: 50,
    status: "pending",
    remainingDays: null,
    daysCompleted: null,
    daysOptedOut: null,
  },
  {
    _id: 2,
    type: "Current",
    providerName: "NutriBowl",
    tiffinName: "Keto Power Bowl",
    subscriptionName: "Weekly Keto Power Bowl",
    tiffinType: "Dinner",
    duration: 7,
    deliveryIncluded: true,
    deliveryCharge: 20,
    price: "2000",
    discount: "10",
    priceBreakdown: {
      subscriptionPrice: 700,
      deliveryCharge: 140,
      totalPrice: 840,
    },
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 7,
    startDate: "2024-06-10",
    endDate: "2024-06-25",
    pricePerTiffinDelivery: 20,
    status: "current",
    remainingDays: 4,
    daysCompleted: 3,
    daysOptedOut: 0,
  },
  {
    _id: 3,
    type: "Completed",
    providerName: "Fresh Delight",
    tiffinName: "Balanced Diet",
    subscriptionName: "Monthly Balanced Diet",
    tiffinType: "Lunch",
    duration: 30,
    deliveryIncluded: false,
    deliveryCharge: 0,
    price: "2000",
    discount: "10",
    priceBreakdown: {
      subscriptionPrice: 1500,
      deliveryCharge: 0,
      totalPrice: 1500,
    },
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 30,
    startDate: "2024-05-01",
    endDate: "2024-05-30",
    pricePerTiffinDelivery: 0,
    status: "current",
    remainingDays: 0,
    daysCompleted: 30,
    daysOptedOut: 0,
  },
  {
    _id: 4,
    type: "Current",
    providerName: "NutriBowl",
    tiffinName: "Keto Power Bowl",
    subscriptionName: "Weekly Keto Power Bowl",
    tiffinType: "Dinner",
    duration: 7,
    deliveryIncluded: true,
    deliveryCharge: 20,
    price: "2000",
    discount: "10",
    priceBreakdown: {
      subscriptionPrice: 700,
      deliveryCharge: 140,
      totalPrice: 840,
    },
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 7,
    startDate: "2024-06-10",
    endDate: "2024-06-25",
    pricePerTiffinDelivery: 20,
    status: "current",
    remainingDays: 4,
    daysCompleted: 3,
    daysOptedOut: 0,
  },
]

const SubscriberScreen = ({ navigation }) => {

  const [authState] = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(true);
  const [pending, setPending] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activeSubscribers, setActiveSubscribers] = useState([]);
  const [originalActiveSubscribers, setOriginalActiveSubscribers] = useState([])
  const [pendingSubscribers, setPendingSubscribers] = useState([]);
  const [completedSubscribers, setCompletedSubscribers] = useState([]);
  const [commentModal, setCommentModal] = useState(false);

  const [sortModal, setSortModal] = useState(false)
  const [sortCriteria, setSortCriteria] = useState("noSort")
  const [filterModal, setFilterModal] = useState(false)
  const [filterCriteria, setFilterCriteria] = useState({
    subscription: 'all',
    tiffin: 'All',
    tiffinType: 'all',
  })
  const [tiffins, setTiffins] = useState([])

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const response = await getSubscribers(authState.authToken)

      setActiveSubscribers(response.active);
      setOriginalActiveSubscribers(response.active);
      setPendingSubscribers(response.pending);
      setCompletedSubscribers(response.completed);
      setTiffins(response.tiffins);

    } catch (error) {
      console.log('Error in Fetching Subscribers ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false)
    }
  }

  const fetchDummySubscribers =() => {
    const active = [];
    const pending = [];
    const completed = [];
    const tiffinSet = new Set();
    tiffinSet.add('All')
    const currentDate = new Date();

    for (const subscriber of DUMMY_DATA) {
      //console.log(subscriber)
      if ((new Date(subscriber.endDate) < currentDate && subscriber.status === 'current') || subscriber.status === 'cancelled') {
        completed.push(subscriber);
      }
      else if (subscriber.status === 'current') {
        tiffinSet.add(subscriber.tiffinName)
        active.push(subscriber);
      } else if (subscriber.status === 'pending') {
        pending.push(subscriber);
      }
    }

    console.log(active)
    setOriginalActiveSubscribers(active);
    setActiveSubscribers(active);
    setPendingSubscribers(pending);
    setCompletedSubscribers(completed);
    const tiffinArray = Array.from(tiffinSet);
    setTiffins(tiffinArray)

  }

  useEffect(() => {
    //fetchSubscribers()
    fetchDummySubscribers()
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

  const handleRejection = () => {
    setCommentModal(true);
  }

  const handleStatus = async (id, status, comments) => {
    try {
      setLoading(true)
      bodyData = {
        accepted: status,
        comments
      }
      const response = await decideStatus(authState.authToken, id, bodyData)
      if (response) {

        let pending = []

        for (const subscriber of pendingSubscribers) {
          if (subscriber._id === id) {
            if (status) {
              const active = [...activeSubscribers]
              active.push(subscriber)
              setActiveSubscribers(active)
            }
            pending = pendingSubscribers.filter(item => item !== subscriber)
            break;

          }
        }


        setPendingSubscribers(pending)
      }
    } catch (error) {
      console.log('Error in Deciding Status ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false)
    }

  }

  const toggleSortModal = () => {
    setSortModal(!sortModal)
  }

  const toggleFilterModal = () => {
    setFilterModal(!filterModal)
  }

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    toggleSortModal(true);
  }

  const handleFilter = (type, value) => {
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
    } else if (sortCriteria === "tiffinsLTH") {
      sortedSubscribers.sort((a, b) => parseFloat(a.noOfTiffins) - parseFloat(b.noOfTiffins));
    } else if (sortCriteria === "tiffinsHTL") {
      sortedSubscribers.sort((a, b) => parseFloat(b.noOfTiffins) - parseFloat(a.noOfTiffins));
    }


    let filteredSubscribers = [...sortedSubscribers];

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

    setActiveSubscribers(filteredSubscribers)

  }, [sortCriteria, filterCriteria, , originalActiveSubscribers]);

  const handlePress = (subscription) => {
    navigation.navigate('Subscription Details', {
      subscription: subscription
    })
  }


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
                tiffins={tiffins}
              />
              {activeSubscribers.length !== 0 ?
                <>
                  <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Text style={styles.number}>{activeSubscribers.length} Subscribers</Text>
                  </View>
                  <FlatList
                    data={activeSubscribers}
                    renderItem={({ item }) => (
                      <AcceptedSubComponent {...item} 
                      onPress = {() => handlePress(item)}/>

                    )}
                    keyExtractor={(item) => item._id.toString()}
                    contentContainerStyle={styles.flatList}
                  />
                </>
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
                      onReject={handleRejection} />
                  )}
                  keyExtractor={(item) => item._id.toString()}
                  contentContainerStyle={styles.flatList}
                />
                :
                <View style={styles.emptyView}>
                  <Text>No Pending Subscriptions</Text>
                </View>
              }
              <CommentModal
                isVisible={commentModal}
                onClose={() => setCommentModal(false)}
                onReject={handleStatus} />
            </View>
            : null
          }

          {completed ?
            <>
              {completedSubscribers.length !== 0 ?
                <FlatList
                  data={completedSubscribers}
                  renderItem={({ item }) => (
                    <CompletedSubComponent {...item} 
                    onPress = {() => handlePress(item)}/>
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
    paddingTop: StatusBar.currentHeight * 1.1

  },
  filterSortContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    marginTop: windowHeight * 0.012,
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
  number: {
    fontSize: 20,
  },

  subscribers: {
    justifyContent: 'center',
    alignContent: 'center',
  },

  flatList: {
    paddingBottom: 30,
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