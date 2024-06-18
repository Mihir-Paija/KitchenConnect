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

const ProfileDetailsCustomerScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);

  // Local state for the profile details
  const [name, setName] = useState(authState.authData.name || "");
  const [mobile, setMobile] = useState(authState.authData.mobile || "");
  const [email, setEmail] = useState(authState.authData.email || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    authState.authData.dateOfBirth || ""
  );
  const [anniversary, setAnniversary] = useState(
    authState.authData.anniversary || ""
  );
  const [gender, setGender] = useState(authState.authData.gender || "");

  const backHandler = () => {
    navigation.goBack();
  };

  const handleUpdateProfile = () => {
    // Update profile logic
    console.log("Profile updated");
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backHandler} />
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
          <ScrollView contentContainerStyle={styles.contentBox}>
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
            <ProfileInputBox
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholder="Date of birth"
            />
            {/* <ProfileInputBox
                value={anniversary}
                onChangeText={setAnniversary}
                placeholder="Anniversary"
              /> */}
            <ProfileInputBox
              value={gender}
              onChangeText={setGender}
              placeholder="Gender"
            />
          </ScrollView>
          <SubmitButton
            btnTitle={"Update Profile"}
            handleSubmitBtn={handleUpdateProfile}
          />
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
    position: "absolute",
    top: windowHeight * 0.1,
    // right: -windowWidth * 0.03,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // paddingTop: windowHeight * 0.02,
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
    paddingVertical: windowHeight * 0.015,
    marginTop: windowHeight * 0.12,
    // marginVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.04,
    paddingTop: windowHeight * 0.1,
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
});
