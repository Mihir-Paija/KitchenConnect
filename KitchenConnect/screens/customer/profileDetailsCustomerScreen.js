import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import BackButtonComponent from "@/components/shared/BackButton";
import ProfileInputBox from "@/components/shared/profileInputBox";
import SubmitButton from "../../components/shared/forms/submitButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

const ProfileDetailsCustomerScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);

  // Local state for the profile details
  const [name, setName] = useState(authState.authData.name || "");
  const [mobile, setMobile] = useState(authState.authData.mobile || "");
  const [email, setEmail] = useState(authState.authData.email || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    authState.authData.dateOfBirth || null
  );
  const [anniversary, setAnniversary] = useState(
    authState.authData.anniversary || ""
  );
  const [gender, setGender] = useState(authState.authData.gender || "");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const backHandler = () => {
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    setDateOfBirth(currentDate);
  };

  const handleUpdateProfile = () => {
    // Update profile logic
    console.log("Profile updated");
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent
            onPress={backHandler}
            screenTitle={"Your Profile"}
          />
          <ScrollView>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileBox}>
                <Image
                  source={require("../../assets/shared/icons8-user-pastel-glyph/icons8-user-100.png")}
                  style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editIcon}>
                  <Image
                    source={require("../../assets/shared/icons8-edit-ios-17-outlined/icons8-edit-100.png")}
                    style={styles.editIconImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentBox}>
              <ProfileInputBox
                value={name}
                onChangeText={setName}
                placeholder="Name"
              />
              <ProfileInputBox
                value={mobile}
                onChangeText={setMobile}
                placeholder="Mobile"
                keyboardType="phone-pad"
                showChange={true}
                onChangePress={() => console.log("Change mobile")}
              />

              <ProfileInputBox
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                showChange={true}
                onChangePress={() => console.log("Change email")}
              />
              <TouchableOpacity
                style={[styles.profileInputBox]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={[
                    styles.inputvalueTxt,
                    { color: dateOfBirth ? "#000" : "#C7C7CD" }, // Change color based on dateOfBirth value
                  ]}
                >
                  {dateOfBirth ? dateOfBirth.toDateString() : "Date of birth"}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={dateOfBirth || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              {/* <ProfileInputBox
                value={anniversary}
                onChangeText={setAnniversary}
                placeholder="Anniversary"
              /> */}

              <View style={[styles.profileInputBox]}>
                <RNPickerSelect
                  onValueChange={setGender}
                  useNativeAndroidPickerStyle={false}
                  items={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                  ]}
                  style={{
                    inputIOS: styles.inputvalueTxt,
                    inputAndroid: styles.inputvalueTxt,
                    placeholder: {
                      color: "#C7C7CD",
                      fontSize: windowWidth * 0.045,
                      fontFamily: "NunitoRegular",
                    },
                  }}
                  textInputProps={{
                    placeholderTextColor: "#C7C7CD",
                  }}
                  placeholder={{
                    label: "Gender",
                    value: null,
                  }}
                  value={gender}
                />
              </View>
            </View>
            <SubmitButton
              btnTitle={"Update Profile"}
              handleSubmitBtn={handleUpdateProfile}
            />
          </ScrollView>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default ProfileDetailsCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },

  profileImageContainer: {
    zIndex: 1,
    // position: "absolute",
    // top: windowHeight * 0.1,
    // right: -windowWidth * 0.03,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: windowHeight * 0.01,
    backgroundColor: "#ffff",
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    borderRadius: windowWidth * 0.4,
    // overflow: "hidden",
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
  profileBox: {
    backgroundColor: "rgba(256,165,0,0.1)",
    padding: windowWidth * 0.01,
    borderRadius: windowWidth * 0.2,
  },
  profileImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: windowWidth * 0.15,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    left: windowWidth * 0.2,
    backgroundColor: "#fff",
    borderRadius: windowWidth * 0.05,
    padding: windowWidth * 0.01,
    elevation: 3,
  },
  editIconImage: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
  },
  contentBox: {
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: "#fff",
    width: windowWidth * 0.95,
    marginVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.04,
    borderRadius: windowWidth * 0.03,
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
  profileInputBox: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    marginVertical: windowHeight * 0.02,
    borderRadius: windowWidth * 0.04,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    paddingLeft: windowWidth * 0.05,
    justifyContent: "center",
  },
  inputvalueTxt: {
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoRegular",
  },
});
