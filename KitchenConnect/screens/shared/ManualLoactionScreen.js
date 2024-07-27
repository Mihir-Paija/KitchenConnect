import {
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { windowWidth, windowHeight } from "@utils/dimensions";
import InputBox from "@components/shared/forms/inputBox";
import SubmitButton from "@components/shared/forms/submitButton";
import authAdStyles from "@/styles/shared/authAd";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const ManualLoactionScreen = ({ navigation }) => {
  //states
  const [flatNumber, setflatNumber] = useState("");
  const [appartment, setAppartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [keyboard, setKeyboard] = useState(false);

  //functions
  const addAddress = async () => {
    console.log("add");
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: `${street}, ${city}, ${state}, ${pinCode}, "India"`,
            key: "YOUR_GOOGLE_API_KEY", // Replace with your Google API key
          },
        }
      );

      const location = response.data.results[0].geometry.location;
      setLatitude(location.lat);
      setLongitude(location.lng);

      // Update the database with the location
      await updateUserLocation(location.lat, location.lng);

      // Navigate back or show a success message
      navigation.goBack();
    } catch (error) {
      console.error("Error fetching location", error);
      Alert.alert("Error", "Unable to fetch location. Please try again.");
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboard(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboard(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={authAdStyles.title}>Join KitchenConnect</Text>
            <Text style={authAdStyles.subtitle}>
              Tasty Meals Just A Click Away
            </Text>
          </View>
          <View style={styles.formContainer}>
            <InputBox
              input="FlatNumber"
              value={flatNumber}
              setValue={setflatNumber}
              label={true}
              inputBoxStyle={styles.inputBoxStyle}
            />
            <InputBox
              input="Appartment"
              value={appartment}
              setValue={setAppartment}
              label={true}
              inputBoxStyle={styles.inputBoxStyle}
            />
            <InputBox
              input="Street"
              value={street}
              setValue={setStreet}
              label={true}
              inputBoxStyle={styles.inputBoxStyle}
            />
            <InputBox
              input="City"
              value={city}
              setValue={setCity}
              label={true}
              inputBoxStyle={styles.inputBoxStyle}
            />
            <InputBox
              input="State"
              value={state}
              setValue={setState}
              label={true}
              inputBoxStyle={styles.inputBoxStyle}
            />
            <InputBox
              input="PinCode"
              keyboardType="phone-pad"
              value={pinCode}
              setValue={setPinCode}
              label={true}
              inputBoxStyle={styles.inputBoxStyle}
            />

            <SubmitButton
              btnTitle={"Add Address"}
              handleSubmitBtn={addAddress}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ManualLoactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#ffff",
    width: windowWidth * 0.9,
    // top: windowHeight * 0.25,
    marginBottom: windowHeight * 0.01,
  },
  inputBoxStyle: {
    height: windowHeight * 0.045,
    borderRadius: windowWidth * 0.03,
  },
  header_keyboard: {
    // position: "absolute",
    // backgroundColor: "#ffaa",
    // top: windowHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: windowHeight * 0.05,
  },
  header: {
    // position: "absolute",
    // backgroundColor: "#ffaa",
    // top: windowHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: windowHeight * 0.05,
  },
  keyboardFormContainer: {
    // flex: 1,
    width: windowWidth * 0.9,
    top: windowHeight * 0.2,
    marginBottom: windowHeight * 0.02,
  },
});
