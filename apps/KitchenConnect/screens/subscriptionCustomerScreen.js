import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import FooterMenu from "../components/menu/footerMenu";
import { AuthContext } from "@/context/authContext";
import FilterModalTiffinCustomer from "@/components/FilterModalTiffinCustomer";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import DownButton from "../components/DownButton";
import UpButton from "../components/UpButton";
import SubscriptionCard from "../components/subscriptionCard";
import { getSubscriptionsList } from "../services/customerAPI";
import LoadingScreen from "./loadingScreen";

// const DUMMY_DATA = [
//   {
//     id: "667babbabe047a6f717c5c3d",
//     type: "Pending",
//     providerName: "Phoenix Kitchen",
//     tiffinName: "Veg Thali",
//     subscriptionName: "Standard Subscription",
//     tiffinType: "Lunch",
//     duration: 30,
//     deliveryIncluded: true,
//     deliveryCharge: 50,
//     price: "2000",
//     discount: "10",
//     priceBreakdown: {
//       subscriptionPrice: 1500,
//       deliveryCharge: 50,
//       totalPrice: 3000,
//     },
//     orderDate: "2024-06-12",
//     orderTime: "12:00",
//     numberOfTiffins: 30,
//     startDate: "2024-06-14",
//     endDate: "2024-07-13",
//     pricePerTiffinDelivery: 50,
//     status: "pending",
//     remainingDays: null,
//     daysCompleted: null,
//     daysOptedOut: null,
//   },
//   {
//     id: 2,
//     type: "Current",
//     providerName: "NutriBowl",
//     tiffinName: "Keto Power Bowl",
//     subscriptionName: "Weekly Keto Power Bowl",
//     tiffinType: "Dinner",
//     duration: 7,
//     deliveryIncluded: true,
//     deliveryCharge: 20,
//     price: "2000",
//     discount: "10",
//     priceBreakdown: {
//       subscriptionPrice: 700,
//       deliveryCharge: 140,
//       totalPrice: 840,
//     },
//     orderDate: "2024-06-12",
//     orderTime: "12:00",
//     numberOfTiffins: 7,
//     startDate: "2024-06-10",
//     endDate: "2024-06-16",
//     pricePerTiffinDelivery: 20,
//     status: "current",
//     remainingDays: 4,
//     daysCompleted: 3,
//     daysOptedOut: 0,
//   },
//   {
//     id: 3,
//     type: "Completed",
//     providerName: "Fresh Delight",
//     tiffinName: "Balanced Diet",
//     subscriptionName: "Monthly Balanced Diet",
//     tiffinType: "Lunch",
//     duration: 30,
//     deliveryIncluded: false,
//     deliveryCharge: 0,
//     price: "2000",
//     discount: "10",
//     priceBreakdown: {
//       subscriptionPrice: 1500,
//       deliveryCharge: 0,
//       totalPrice: 1500,
//     },
//     orderDate: "2024-06-12",
//     orderTime: "12:00",
//     numberOfTiffins: 30,
//     startDate: "2024-05-01",
//     endDate: "2024-05-30",
//     pricePerTiffinDelivery: 0,
//     status: "completed",
//     remainingDays: 0,
//     daysCompleted: 30,
//     daysOptedOut: 0,
//   },
//   {
//     id: 4,
//     type: "Current",
//     providerName: "NutriBowl",
//     tiffinName: "Keto Power Bowl",
//     subscriptionName: "Weekly Keto Power Bowl",
//     tiffinType: "Dinner",
//     duration: 7,
//     deliveryIncluded: true,
//     deliveryCharge: 20,
//     price: "2000",
//     discount: "10",
//     priceBreakdown: {
//       subscriptionPrice: 700,
//       deliveryCharge: 140,
//       totalPrice: 840,
//     },
//     orderDate: "2024-06-12",
//     orderTime: "12:00",
//     numberOfTiffins: 7,
//     startDate: "2024-06-10",
//     endDate: "2024-06-16",
//     pricePerTiffinDelivery: 20,
//     status: "current",
//     remainingDays: 4,
//     daysCompleted: 3,
//     daysOptedOut: 0,
//   },
//   {
//     id: 5,
//     type: "Completed",
//     providerName: "Fresh Delight",
//     tiffinName: "Balanced Diet",
//     subscriptionName: "Monthly Balanced Diet",
//     tiffinType: "Lunch",
//     duration: 30,
//     deliveryIncluded: false,
//     deliveryCharge: 0,
//     price: "2000",
//     discount: "10",
//     priceBreakdown: {
//       subscriptionPrice: 1500,
//       deliveryCharge: 0,
//       totalPrice: 1500,
//     },
//     orderDate: "2024-06-12",
//     orderTime: "12:00",
//     numberOfTiffins: 30,
//     startDate: "2024-05-01",
//     endDate: "2024-05-30",
//     pricePerTiffinDelivery: 0,
//     status: "completed",
//     remainingDays: 0,
//     daysCompleted: 30,
//     daysOptedOut: 0,
//   },
//   {
//     id: 6,
//     type: "Completed",
//     providerName: "Fresh Delight",
//     tiffinName: "Balanced Diet",
//     subscriptionName: "Monthly Balanced Diet",
//     tiffinType: "Lunch",
//     duration: 30,
//     deliveryIncluded: false,
//     deliveryCharge: 0,
//     price: "2000",
//     discount: "10",
//     priceBreakdown: {
//       subscriptionPrice: 1500,
//       deliveryCharge: 0,
//       totalPrice: 1500,
//     },
//     orderDate: "2024-06-12",
//     orderTime: "12:00",
//     numberOfTiffins: 30,
//     startDate: "2024-05-01",
//     endDate: "2024-05-30",
//     pricePerTiffinDelivery: 0,
//     status: "declined",
//     remainingDays: 0,
//     daysCompleted: 30,
//     daysOptedOut: 0,
//   },
// ];

const SubscriptionCustomerScreen = ({ navigation }) => {
  // global states
  const [authState] = useContext(AuthContext);

  const customerID = authState.authData?._id;
  // states
  //state
  const [currentSubscriptions, setCurrentSubscriptions] = useState([]);
  const [completedSubscriptions, setCompletedSubscriptions] = useState([]);
  const [pendingSubscriptions, setPendingSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subList, setSubList] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    tiffinType: "all",
    foodType: "all",
  });
  const [collapsedSections, setCollapsedSections] = useState({
    completed: false,
    current: false,
    pending: false,
  });
  const [activeTab, setActiveTab] = useState("current");

  // Refs for scrolling
  const scrollViewRef = useRef();
  const completedRef = useRef();
  const currentRef = useRef();
  const pendingRef = useRef();

  // States for each subscription type
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor(styles.container.backgroundColor);
  }, []);

  useEffect(() => {
    setCurrentSubscriptions(
      subList.filter(
        (item) => item.Subscription.subscriptionStatus === "Current"
      )
    );
    setCompletedSubscriptions(
      subList.filter(
        (item) =>
          item.Subscription.subscriptionStatus === "Completed" ||
          item.Subscription.subscriptionStatus === "Cancelled"
      )
    );
    setPendingSubscriptions(
      subList.filter(
        (item) => item.Subscription.subscriptionStatus === "Pending"
      )
    );
  }, [subList]);

  // functions
  const fetchSubList = async (customerID) => {
    try {
      // console.log("hi");
      const response = await getSubscriptionsList(customerID);
      // console.log(response);
      setSubList(response.data);
      console.log("response data", response.data);
    } catch (error) {
      console.error("Failed to fetch sub List customer:", error);
    } finally {
      // console.log("subList:", subList);
      // console.log("Current Subscriptions:", currentSubscriptions);
      // console.log("Completed Subscriptions:", completedSubscriptions);
      // console.log("Pending Subscriptions:", pendingSubscriptions);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubList(customerID);
  }, [customerID]);

  const onFilterChange = (type, value) => {
    setFilterCriteria((prev) => ({ ...prev, [type]: value }));
    setFilterModalVisible(false);
  };

  const scrollToSection = (ref, tab) => {
    setActiveTab(tab);
    ref.current.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      },
      () => {}
    );
  };

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const cardHandler = (subscription) => {
    // console.log("subscriptionID from list : ", subscription.Subscription._id);
    navigation.navigate("SubscriptionDetailsCustomer", {
      subscription,
      subscriptionID: subscription.Subscription._id,
    });
  };
  const orderHandler = (subscription) => {
    // console.log(subscription);
    // console.log("subscriptionID from list : ", subscription.Subscription._id);
    navigation.navigate("SubscriptionOrderCustomer", {
      startDate: subscription.Subscription.startDate,
      endDate: subscription.Subscription.endDate,
      noOfTiffins: subscription.Subscription.noOfTiffins,
      wantDelivery: subscription.Subscription.wantDelivery,
      tiffinTime: subscription.Subscription.wantDelivery
        ? subscription.Tiffin.deliveryDetails.deliveryTime
        : subscription.Tiffin.time,
      subscriptionID: subscription.Subscription._id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <View style={styles.header}>
                <TouchableOpacity
                  style={[
                    styles.filterContainer,
                    (filterCriteria.tiffinType !== "all" ||
                      filterCriteria.foodType !== "all") && {
                      backgroundColor: "#FFECEC",
                      borderColor: "#ffa500",
                    },
                  ]}
                  onPress={() => setFilterModalVisible(true)}
                >
                  <Image
                    source={
                      filterCriteria.tiffinType === "all" &&
                      filterCriteria.foodType === "all"
                        ? require("../assets/sort_filter/icons8-tune-ios-17-outlined/icons8-tune-100.png")
                        : require("../assets/sort_filter/icons8-tune-ios-17-filled/icons8-tune-100.png")
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <View style={styles.tabs}>
                  <TouchableOpacity
                    onPress={() => scrollToSection(currentRef, "current")}
                    style={
                      activeTab === "current"
                        ? styles.activeTab
                        : styles.inactiveTab
                    }
                  >
                    <Text
                      style={
                        activeTab === "current"
                          ? styles.activeTabText
                          : styles.inactiveTabText
                      }
                    >
                      Current
                    </Text>
                    {activeTab === "current" && (
                      <View style={styles.tabIndicator} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => scrollToSection(completedRef, "completed")}
                    style={
                      activeTab === "completed"
                        ? styles.activeTab
                        : styles.inactiveTab
                    }
                  >
                    <Text
                      style={
                        activeTab === "completed"
                          ? styles.activeTabText
                          : styles.inactiveTabText
                      }
                    >
                      Completed
                    </Text>
                    {activeTab === "completed" && (
                      <View style={styles.tabIndicator} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => scrollToSection(pendingRef, "pending")}
                    style={
                      activeTab === "pending"
                        ? styles.activeTab
                        : styles.inactiveTab
                    }
                  >
                    <Text
                      style={
                        activeTab === "pending"
                          ? styles.activeTabText
                          : styles.inactiveTabText
                      }
                    >
                      Pending
                    </Text>
                    {activeTab === "pending" && (
                      <View style={styles.tabIndicator} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView ref={scrollViewRef} style={styles.ScrollContent}>
                <View ref={currentRef} style={styles.section}>
                  <TouchableOpacity onPress={() => toggleSection("current")}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        Current ({currentSubscriptions.length})
                      </Text>
                      {collapsedSections.current ? (
                        <DownButton />
                      ) : (
                        <UpButton />
                      )}
                    </View>
                  </TouchableOpacity>
                  {!collapsedSections.current && (
                    <View>
                      {currentSubscriptions.map((sub) => (
                        <SubscriptionCard
                          key={sub.Subscription._id}
                          onPress={() => cardHandler(sub)}
                          subscriptionItem={sub}
                          orderHandler={() => orderHandler(sub)}
                        />
                      ))}
                    </View>
                  )}
                </View>

                <View ref={completedRef} style={styles.section}>
                  <TouchableOpacity onPress={() => toggleSection("completed")}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        Completed ({completedSubscriptions.length})
                      </Text>
                      {collapsedSections.completed ? (
                        <DownButton />
                      ) : (
                        <UpButton />
                      )}
                    </View>
                  </TouchableOpacity>
                  {!collapsedSections.completed && (
                    <View>
                      {completedSubscriptions.map((subscription) => (
                        <SubscriptionCard
                          key={subscription.Subscription._id}
                          onPress={() => cardHandler(subscription)}
                          subscriptionItem={subscription}
                          orderHandler={() => orderHandler(subscription)}
                        />
                      ))}
                    </View>
                  )}
                </View>

                <View ref={pendingRef} style={styles.section}>
                  <TouchableOpacity onPress={() => toggleSection("pending")}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        Pending ({pendingSubscriptions.length})
                      </Text>
                      {collapsedSections.pending ? (
                        <DownButton />
                      ) : (
                        <UpButton />
                      )}
                    </View>
                  </TouchableOpacity>
                  {!collapsedSections.pending && (
                    <View>
                      {pendingSubscriptions.map((subscription) => (
                        <SubscriptionCard
                          key={subscription.Subscription._id}
                          onPress={() => cardHandler(subscription)}
                          subscriptionItem={subscription}
                        />
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>

              <FooterMenu active="Subscriptions" navigation={navigation} />
              <FilterModalTiffinCustomer
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onFilterChange={onFilterChange}
                filterCriteria={filterCriteria}
              />
            </>
          )}
        </>
      ) : (
        <Text style={{ color: "red" }}>Please Login</Text>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth * 0.02,
    paddingVertical: windowWidth * 0.02,
    // backgroundColor: "#fff",
    // borderBottomWidth: 1,
    // borderBottomColor: "#e0e0e0",
  },
  filterContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: windowWidth * 0.05,
    paddingVertical: windowWidth * 0.015,
    paddingHorizontal: windowWidth * 0.025,
  },
  icon: {
    width: windowWidth * 0.045,
    height: windowWidth * 0.045,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  activeTab: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // paddingVertical: 10,
    // borderBottomWidth: 2,
    // borderBottomColor: "#000",
  },
  inactiveTab: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // paddingVertical: 10,
  },
  activeTabText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoBold",
    color: "#000",
  },
  inactiveTabText: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
    color: "#808080",
  },
  tabIndicator: {
    height: windowWidth * 0.01,
    backgroundColor: "#ffa500",
    marginTop: windowHeight * 0.005,
    borderRadius: windowWidth * 0.02,
  },
  ScrollContent: {
    marginBottom: windowHeight * 0.06,
    backgroundColor: "#f8f8f8",
  },
  section: {
    padding: windowWidth * 0.03,
    // backgroundColor: "#ffaa",
    // marginBottom: windowHeight * 0.005,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: windowWidth * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // borderBottomColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoBold",
  },
});
