import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import FooterMenu from "../components/menu/footerMenu";
import { AuthContext } from "@/context/authContext";
import { useRoute } from "@react-navigation/native";
import { getOrderList } from "../services/customerAPI";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import LoadingScreen from "@/screens/loadingScreen";
import OrderCard from "../components/orderCard";

const HistoryCustomerScreen = ({ navigation }) => {
  const route = useRoute();
  const currentRoute = route.name;

  //gloabal states
  const [authState, setAuthState] = useContext(AuthContext);

  const customerID = authState.authData._id;

  //states
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  // functions

  useEffect(() => {
    setAcceptedOrders(
      orderList.filter((item) => item.order.status === "Accepted")
    );
    setCompletedOrders(
      orderList.filter(
        (item) =>
          item.order.status === "Completed" || item.order.status === "Rejected"
      )
    );
    setPendingOrders(
      orderList.filter((item) => item.order.status === "Pending")
    );
  }, [orderList]);

  const fetchOrderList = async (customerID) => {
    try {
      // console.log("hi");
      const response = await getOrderList(customerID);
      // console.log(response);
      setOrderList(response.data);
      // console.log("response data", response.data);
    } catch (error) {
      console.error("Failed to fetch order List customer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderList(customerID);
  }, [customerID]);

  const cardHandler = (Order) => {
    // console.log("subscriptionID from list : ", subscription.Subscription._id);
    navigation.navigate("OrderDetailsCustomer", {
      OrderID: Order.order._id,
      Tiffin: Order.Tiffin,
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
              <ScrollView style={styles.ScrollContent}>
                <View style={styles.section}>
                  {pendingOrders.length > 0 && (
                    <View>
                      {/* <Text>pendingOrders</Text> */}
                      {pendingOrders.map((Order) => (
                        <OrderCard
                          key={Order.order._id}
                          onPress={() => cardHandler(Order)}
                          orderItem={Order}
                          // orderHandler={() => orderHandler(sub)}
                        />
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.section}>
                  {acceptedOrders.length > 0 && (
                    <View>
                      {/* <Text>acceptedOrders</Text> */}
                      {acceptedOrders.map((Order) => (
                        <OrderCard
                          key={Order.order._id}
                          onPress={() => cardHandler(Order)}
                          orderItem={Order}
                          // orderHandler={() => orderHandler(sub)}
                        />
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.section}>
                  {/* <TouchableOpacity onPress={() => toggleSection("Completed")}>
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
                  </TouchableOpacity> */}
                  {completedOrders.length > 0 && (
                    <View>
                      {/* <Text>completedOrders</Text> */}
                      {completedOrders.map((Order) => (
                        <OrderCard
                          key={Order.order._id}
                          onPress={() => cardHandler(Order)}
                          orderItem={Order}
                        />
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
              <FooterMenu navigation={navigation} />
            </>
          )}
        </>
      ) : (
        <Text style={{ color: "red" }}>
          You are not authorized to access this screen.
        </Text>
      )}
    </SafeAreaView>
  );
};

export default HistoryCustomerScreen;

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
  ScrollContent: {
    marginBottom: windowHeight * 0.06,
    backgroundColor: "#f8f8f8",
  },
  section: {
    padding: windowWidth * 0.03,
    // backgroundColor: "#ffaa",
    // marginBottom: windowHeight * 0.005,
  },
});
