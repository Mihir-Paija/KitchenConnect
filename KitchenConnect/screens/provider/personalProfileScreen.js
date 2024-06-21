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
    Alert
  } from "react-native";
  import React, { useContext, useState } from "react";
  import { AuthContext } from "@/context/authContext";
  import { windowWidth, windowHeight } from "@/utils/dimensions";
  import BackButtonComponent from "@/components/shared/BackButton";
  import ProfileInputBox from "@/components/shared/profileInputBox";
  import SubmitButton from "../../components/shared/forms/submitButton";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import RNPickerSelect from "react-native-picker-select";
import { editPersonalDetails } from "../../utils/provider/profileAPI";
  
  const PersonalProfileScreen = ({ navigation, route }) => {
    const [authState, setAuthState] = useContext(AuthContext);
    const {profile} = route.params

    const [details, setDetails] = useState({
        name: profile.name,
        email: profile.email,
        mobile: profile.mobile,

    })

    const backHandler = () => {
      navigation.goBack();
    };
    
    const handleUpdateProfile = async () => {
        try {
          if( !details.name || !details.email || !details.mobile){
            Alert.alert("Please Fill All Fields");
            return
          }

          const response = await editPersonalDetails(authState.authToken, details)

          if(response && response.status === 200){
            profile.name = details.name
            profile.email = details.email
            profile.mobile = details.mobile
            Alert.alert("Update Successfull")
          }
          else{
            Alert.alert(`Couldn't Update`)
          }
        } catch (error) {
          console.log('Error In Updating Profile ', error)
          Alert.alert(error.message || 'An Error Occured')
          
        }
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
                  value={details.name}
                  onChangeText={(text) =>setDetails({...details, name: text})}
                  placeholder="Name"
                />
                <ProfileInputBox
                  value={details.mobile}
                  onChangeText={(text) =>setDetails({...details, mobile: text})}
                  placeholder="Mobile"
                  keyboardType="phone-pad"
                />
  
                <ProfileInputBox
                  value={details.email}
                  onChangeText={(text) =>setDetails({...details, email: text})}
                  placeholder="Email"
                  keyboardType="email-address"
                /> 
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
  
  export default PersonalProfileScreen;
  
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
  