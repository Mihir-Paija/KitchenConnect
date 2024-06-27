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
import { AuthContext } from "@/context/authContext";
import BackButtonComponent from "../../components/shared/BackButton";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import DownButton from "../../components/shared/DownButton";
import UpButton from "../../components/shared/UpButton";
import LoadingScreen from "@/screens/shared/loadingScreen";
import SubscriptionOrderCard from "../../components/customer/subscriptionOrderCard";

const DUMMY_DATA = [
  {
    _id: "667babbabe047a6f717c5c3d",
    day: 3,
    status: "Upcoming",
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 3,
    pricePerTiffin: 150,
    OTP: "123456",
    amountPaid: 0,
  },
  {
    _id: "667babbabe047a6f717c5c4d",
    day: 4,
    status: "Upcoming",
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 3,
    pricePerTiffin: 150,
    OTP: null,
    amountPaid: 0,
  },
  {
    _id: "667babbabe047a6f717c5c5d",
    day: 5,
    status: "Upcoming",
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 3,
    pricePerTiffin: 150,
    OTP: null,
    amountPaid: 0,
  },
  {
    _id: "667babbabe047a6f717c5c6d",
    day: 6,
    status: "Upcoming",
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 3,
    pricePerTiffin: 150,
    OTP: null,
    amountPaid: 0,
  },
  {
    _id: "667babbabe047a6f717c5c7d",
    day: 2,
    status: "OptedOut",
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 3,
    pricePerTiffin: 150,
    OTP: null,
    amountPaid: 0,
  },
  {
    _id: "667babbabe047a6f717c5c8d",
    day: 1,
    status: "Completed",
    orderDate: "2024-06-12",
    orderTime: "12:00",
    numberOfTiffins: 3,
    pricePerTiffin: 150,
    OTP: "123456",
    amountPaid: 150,
  },
];

const SubscriptionOrderCustomerScreen = ({ navigation }) => {
  // global states
  const [authState] = useContext(AuthContext);

  //state
  const [optedOutOrders, setOptedOutOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    Completed: false,
    OptedOut: false,
    Upcoming: false,
  });
  const [activeTab, setActiveTab] = useState("Upcoming");

  // Refs for scrolling
  const scrollViewRef = useRef();
  const completedRef = useRef();
  const optedOutRef = useRef();
  const upcomingRef = useRef();

  //functions
  const backHandler = () => {
    navigation.goBack();
  };

  // States for each subscription type
  useEffect(() => {
    setUpcomingOrders(DUMMY_DATA.filter((item) => item.status === "Upcoming"));
    setCompletedOrders(
      DUMMY_DATA.filter((item) => item.status === "Completed")
    );
    setOptedOutOrders(DUMMY_DATA.filter((item) => item.status === "OptedOut"));
  }, [DUMMY_DATA]);

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

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <BackButtonComponent
                onPress={backHandler}
                screenTitle={"Subscription Orders"}
              />
              <View style={styles.header}>
                <View style={styles.tabs}>
                  <TouchableOpacity
                    onPress={() => scrollToSection(upcomingRef, "Upcoming")}
                    style={
                      activeTab === "Upcoming"
                        ? styles.activeTab
                        : styles.inactiveTab
                    }
                  >
                    <Text
                      style={
                        activeTab === "Upcoming"
                          ? styles.activeTabText
                          : styles.inactiveTabText
                      }
                    >
                      Upcoming
                    </Text>
                    {activeTab === "Upcoming" && (
                      <View style={styles.tabIndicator} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => scrollToSection(optedOutRef, "OptedOut")}
                    style={
                      activeTab === "OptedOut"
                        ? styles.activeTab
                        : styles.inactiveTab
                    }
                  >
                    <Text
                      style={
                        activeTab === "OptedOut"
                          ? styles.activeTabText
                          : styles.inactiveTabText
                      }
                    >
                      OptedOut
                    </Text>
                    {activeTab === "OptedOut" && (
                      <View style={styles.tabIndicator} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => scrollToSection(completedRef, "Completed")}
                    style={
                      activeTab === "Completed"
                        ? styles.activeTab
                        : styles.inactiveTab
                    }
                  >
                    <Text
                      style={
                        activeTab === "Completed"
                          ? styles.activeTabText
                          : styles.inactiveTabText
                      }
                    >
                      Completed
                    </Text>
                    {activeTab === "Completed" && (
                      <View style={styles.tabIndicator} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView ref={scrollViewRef} style={styles.ScrollContent}>
                <View ref={upcomingRef} style={styles.section}>
                  <TouchableOpacity onPress={() => toggleSection("Upcoming")}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        Upcoming ({upcomingOrders.length})
                      </Text>
                      {collapsedSections.Upcoming ? (
                        <DownButton />
                      ) : (
                        <UpButton />
                      )}
                    </View>
                  </TouchableOpacity>
                  {!collapsedSections.Upcoming && (
                    <View>
                      {upcomingOrders.map((order) => (
                        <SubscriptionOrderCard
                          key={order._id}
                          //   onPress={() => cardHandler(sub)}
                          orderItem={order}
                          //   orderHandler={() => orderHandler(sub)}
                        />
                      ))}
                    </View>
                  )}
                </View>

                <View ref={optedOutRef} style={styles.section}>
                  <TouchableOpacity onPress={() => toggleSection("OptedOut")}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        OptedOut ({optedOutOrders.length})
                      </Text>
                      {collapsedSections.OptedOut ? (
                        <DownButton />
                      ) : (
                        <UpButton />
                      )}
                    </View>
                  </TouchableOpacity>
                  {!collapsedSections.OptedOut && (
                    <View>
                      {optedOutOrders.map((order) => (
                        <SubscriptionOrderCard
                          key={order._id}
                          //   onPress={() => cardHandler(subscription)}
                          orderItem={order}
                        />
                      ))}
                    </View>
                  )}
                </View>

                <View ref={completedRef} style={styles.section}>
                  <TouchableOpacity onPress={() => toggleSection("Completed")}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        Completed ({completedOrders.length})
                      </Text>
                      {collapsedSections.Completed ? (
                        <DownButton />
                      ) : (
                        <UpButton />
                      )}
                    </View>
                  </TouchableOpacity>
                  {!collapsedSections.Completed && (
                    <View>
                      {completedOrders.map((order) => (
                        <SubscriptionOrderCard
                          key={order._id}
                          //   onPress={() => cardHandler(subscription)}
                          orderItem={order}
                        />
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
            </>
          )}
        </>
      ) : (
        <Text style={{ color: "red" }}>Please Login</Text>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionOrderCustomerScreen;

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
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowWidth * 0.03,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
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
    marginBottom: windowHeight * 0.01,
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
