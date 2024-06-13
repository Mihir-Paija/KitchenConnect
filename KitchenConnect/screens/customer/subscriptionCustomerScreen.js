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
import React, { useContext, useState, useRef } from "react";
import FooterMenu from "../../components/shared/menu/footerMenu";
import { AuthContext } from "@/context/authContext";
import FilterModalTiffinCustomer from "@/components/customer/FilterModalTiffinCustomer";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import DownButton from "../../components/shared/DownButton";
import UpButton from "../../components/shared/UpButton";
import PendingCard from "../../components/customer/subscriptionCards/pendingCard";

const DUMMY_DATA = [
  {
    id: 1,
    type: "pending", // Replace with actual subscription type (pending, current, completed)
    providerName: "Healthy Bites", // Data for BaseCard
    tiffinName: "Veg Thali", // Data for BaseCard
    // Data specific to pending subscriptions
    startDate: "2024-06-14",
    endDate: "2024-06-30",
    subscriptionName: "Monthly Veg Thali",
    expanded: false, // Controls details visibility initially (PendingCard)
  },
  // ... other subscriptions (pending, current, completed)
];

const pendingSubscriptions = [
  {
    id: 1, // Unique identifier for the subscription
    type: "pending", // Subscription type (pending, current, completed)
    providerName: "Fresh Delight",
    tiffinName: "Balanced Diet",
    // BaseCard data
    imageUrl: "https://example.com/balanced_diet.jpg", // Image URL for the tiffin (optional)
    rating: 4.5, // Rating of the provider or tiffin (optional)

    // PendingCard data
    startDate: "2024-06-17",
    endDate: "2024-06-30",
    subscriptionName: "Monthly Balanced Diet",
    expanded: false, // Controls details visibility initially
  },
  {
    id: 2,
    type: "pending",
    providerName: "NutriBowl",
    tiffinName: "Keto Power Bowl",
    imageUrl: "https://example.com/keto_power_bowl.jpg",
    rating: 4.8,
    startDate: "2024-06-20",
    endDate: "2024-07-10",
    subscriptionName: "Weekly Keto Power Bowl",
    expanded: false,
  },
  // ... add more pending subscriptions here
];

const SubscriptionCustomerScreen = ({ navigation }) => {
  // global states
  const [authState] = useContext(AuthContext);
  // states
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

  // functions
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

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
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
                    ? require("../../assets/sort_filter/icons8-tune-ios-17-outlined/icons8-tune-100.png")
                    : require("../../assets/sort_filter/icons8-tune-ios-17-filled/icons8-tune-100.png")
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
                  <Text style={styles.sectionTitle}>Current (2)</Text>
                  {collapsedSections.current ? <DownButton /> : <UpButton />}
                </View>
              </TouchableOpacity>
              {!collapsedSections.current && (
                <View>
                  {/* Add your current subscriptions here */}
                  <View style={styles.card}>
                    <Text>Jodhpur</Text>
                  </View>
                  <View style={styles.card}>
                    <Text>Udaipur</Text>
                  </View>
                </View>
              )}
            </View>
            <View ref={completedRef} style={styles.section}>
              <TouchableOpacity onPress={() => toggleSection("completed")}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Completed (3)</Text>
                  {collapsedSections.completed ? <DownButton /> : <UpButton />}
                </View>
              </TouchableOpacity>
              {!collapsedSections.completed && (
                <View>
                  {/* Add your completed subscriptions here */}
                  <View style={styles.card}>
                    <Text>Jaipur</Text>
                  </View>
                  <View style={styles.card}>
                    <Text>Agra</Text>
                  </View>
                  <View style={styles.card}>
                    <Text>Delhi</Text>
                  </View>
                </View>
              )}
            </View>
            <View ref={pendingRef} style={styles.section}>
              <TouchableOpacity onPress={() => toggleSection("pending")}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Pending (1)</Text>
                  {collapsedSections.pending ? <DownButton /> : <UpButton />}
                </View>
              </TouchableOpacity>
              {!collapsedSections.pending && (
                <View>
                  {/* Add your pending subscriptions here */}
                  {pendingSubscriptions.map((subscription) => (
                    <PendingCard
                      key={subscription.id} // Replace with unique ID from your data
                      providerName={subscription.providerName}
                      tiffinName={subscription.tiffinName}
                      onPress={() => console.log("click")}
                      onWithdraw={() => console.log("withdraw")}
                    />
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          <FilterModalTiffinCustomer
            visible={filterModalVisible}
            onClose={() => setFilterModalVisible(false)}
            onFilterChange={onFilterChange}
            filterCriteria={filterCriteria}
          />
          <FooterMenu navigation={navigation} />
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },
  ScrollContent: {
    marginBottom: windowHeight * 0.06,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth * 0.02,
    paddingVertical: windowWidth * 0.02,
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
    // paddingVertical: windowHeight * 0.05,
    // borderBottomColor: "#ffa500",
    // borderBottomWidth: windowWidth * 0.01,
    // borderRadius: windowWidth * 0.02,
  },
  // inactiveTab: { paddingVertical: windowHeight * 0.005 },
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
  section: {
    padding: windowWidth * 0.03,
    // backgroundColor: "#ffaa",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: windowWidth * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sectionTitle: {
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoBold",
  },
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    backgroundColor: "#ffffff", // corrected the color code
    marginVertical: windowHeight * 0.01,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation property for Android
    elevation: 2,
  },
});
