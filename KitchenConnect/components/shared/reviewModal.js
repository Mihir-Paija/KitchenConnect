import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  TextInput,
  FlatList,
} from "react-native";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/Ionicons";
import SubmitButton from "../shared/forms/submitButton";
import { AuthContext } from "@/context/authContext";
import {
  getKitchenFeedBackCustomer,
  getTiffinFeedBackCustomer,
} from "../../utils/APIs/customerApi";
import ReviewCard from "./reviewCard";

const ReviewModal = ({ visible, onClose, kitchenID, tiffinID }) => {
  //global state
  const [authState, setAuthState] = useContext(AuthContext);
  //states
  const [loading, setLoading] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  //functions
  useEffect(() => {
    if (visible) {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)");
    } else {
      console.log("hi");
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#ffffff");
    }
  }, [visible]);

  const customerID = authState.authData._id;
  // console.log(customerID);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      if (tiffinID) {
        // console.log("response.data");

        const response = await getTiffinFeedBackCustomer(
          customerID,
          kitchenID,
          tiffinID
        );
        console.log(response.data);
        setReviewList(response.data);
      } else {
        const response = await getKitchenFeedBackCustomer(
          customerID,
          kitchenID
        );
        console.log(response.data);
        setReviewList(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch review List customer:", error.message);
      Alert.alert("Error", "Failed to fetch review List. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [customerID, kitchenID, tiffinID]);

  const renderItem = ({ item }) => {
    // console.log("item ", item);
    return <ReviewCard feedBack={item} />;
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      {/* <TouchableWithoutFeedback onPress={onClose}> */}
      <SafeAreaView style={styles.modalBackground}>
        <Icon
          name="close-circle-outline"
          type="ionicon"
          style={styles.closeButton}
          onPress={onClose}
        />

        <View style={styles.modalContainer}>
          {reviewList.length === 0 ? (
            <Text style={styles.noTransactionsText}>No Review available</Text>
          ) : (
            <FlatList
              data={reviewList}
              renderItem={renderItem}
              keyExtractor={(item) => item.feedBack._id.toString()}
              contentContainerStyle={styles.contentBox}
            />
          )}
        </View>
      </SafeAreaView>
      {/* </TouchableWithoutFeedback> */}
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    // backgroundColor: "transparent",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    alignSelf: "center",
    marginBottom: windowWidth * 0.01,
    fontSize: windowWidth * 0.12,
    color: "#ffa500",
    fontFamily: "NunitoLight",
    // backgroundColor: "#ffff",
  },
  contentBox: {},
});
