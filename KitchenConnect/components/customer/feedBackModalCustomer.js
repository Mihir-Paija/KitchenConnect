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
} from "react-native";
import { windowHeight, windowWidth } from "@/utils/dimensions";
import Icon from "react-native-vector-icons/Ionicons";
import SubmitButton from "../shared/forms/submitButton";
import { AuthContext } from "@/context/authContext";
import { postFeedBackCustomer } from "../../utils/APIs/customerApi";

const FeedBackModalCustomer = ({ visible, onClose, kitchenID, tiffinID }) => {
  //global state
  const [authState, setAuthState] = useContext(AuthContext);
  //states
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const stars = [1, 2, 3, 4, 5];
  //functions
  useEffect(() => {
    if (visible) {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)");
    } else {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#ffffff");
    }
  }, [visible]);

  const sendHandler = async () => {
    // console.log("click on submit");
    const bodyData = {
      rate: rating,
      review,
    };
    const customerID = authState.authData._id;
    try {
      setLoading(true);
      const response = await postFeedBackCustomer(
        customerID,
        kitchenID,
        tiffinID,
        bodyData
      );
      // console.log(response.data);
      onClose();
      Alert.alert("Success", "Review submitted successfully.");
      setRating(0);
      setReview("");
    } catch (error) {
      console.error("Failed to post feedBack List customer:", error.message);
      Alert.alert("Error", "Failed to post feedBack. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //   console.log(visible);
  return (
    <>
      <Modal transparent={true} visible={visible} animationType="slide">
        <TouchableWithoutFeedback onPress={onClose}>
          <SafeAreaView style={styles.modalBackground}>
            <Icon
              name="close-circle-outline"
              type="ionicon"
              style={styles.closeButton}
              onPress={onClose}
            />
            <View style={styles.modalContainer}>
              <View style={styles.sectionHeadingBox}>
                <Text style={styles.sectionHeadingTxt}>What is your rate?</Text>
              </View>
              <View style={styles.starContainer}>
                {stars.map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Icon
                      name={star <= rating ? "star-sharp" : "star-outline"}
                      size={windowWidth * 0.08}
                      color={star <= rating ? "#ffa500" : "#aaa"}
                      style={styles.star}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.sectionHeadingBox}>
                <Text style={styles.sectionHeadingTxt}>
                  Please share your review
                </Text>
              </View>
              <TextInput
                style={styles.textBox}
                placeholder="Write your review here..."
                value={review}
                onChangeText={setReview}
                multiline
              />
              <SubmitButton
                btnTitle={loading ? "Sending..." : "Send Review"}
                style={windowHeight * 0.05}
                handleSubmitBtn={sendHandler}
                loading={loading}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default FeedBackModalCustomer;

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
  sectionHeadingBox: {},
  sectionHeadingTxt: {
    textAlign: "center",
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoBold",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: windowHeight * 0.025,
  },
  star: {
    marginHorizontal: windowWidth * 0.015,
  },
  textBox: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
    marginVertical: windowHeight * 0.025,
  },
});
