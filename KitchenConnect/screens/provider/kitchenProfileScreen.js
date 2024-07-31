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
  import { editKitchenDetails } from "../../utils/provider/profileAPI";
  import {RefreshContext} from '@/context/refreshContext'
  
  const KitchenProfileScreen = ({ navigation, route }) => {
    const [authState, setAuthState] = useContext(AuthContext);
    const {profile} = route.params
  
    const [details, setDetails] = useState({
        kitchenName: profile.kitchenName,
        shortDescription: profile.shortDescription,
        flatNumber: profile.address.flatNumber,
        street: profile.address.street,
        landmark: profile.address.landmark

    })
    const [globalRefresh, setGlobalRefresh] = useContext(RefreshContext)
    const backHandler = () => {
      navigation.goBack();
    };
  
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || dateOfBirth;
      setShowDatePicker(Platform.OS === "ios");
      setDateOfBirth(currentDate);
    };
  
    const handleUpdateProfile = async() => {
      try {
        if( !details.kitchenName || !details.shortDescription || !details.flatNumber || !details.street || !details.landmark){
          Alert.alert("Please Fill All Fields");
          return
        }

        const response = await editKitchenDetails(authState.authToken, details)

        if(response && response.status === 200){
          profile.kitchenName = details.kitchenName
          profile.shortDescription = details.shortDescription
          const address = {
            flatNumber: details.flatNumber,
            street: details.street,
            landmark: details.landmark
          }
          profile.address = address
          console.log(response)
          Alert.alert("Update Successfull")
          setGlobalRefresh(!globalRefresh)
          navigation.navigate('Tiffin')
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
              screenTitle={"Kitchen Profile"}
            />
            <ScrollView>

              <View style={styles.contentBox}>
              <ProfileInputBox
                  value={details.kitchenName}
                  onChangeText={(text) =>setDetails({...details, kitchenName: text})}
                  placeholder="Kitchen Name"
                />
                <ProfileInputBox
                  value={details.shortDescription}
                  onChangeText={(text) =>setDetails({...details, shortDescription: text})}
                  placeholder="Description"
                />
                <Text style={{fontSize: windowHeight * 0.03}}>Address</Text>
  
                <ProfileInputBox
                  value={details.flatNumber}
                  onChangeText={(text) =>setDetails({...details, flatNumber: text})}
                  placeholder="Flat Number / House Name"

                /> 
                 <ProfileInputBox
                  value={details.street}
                  onChangeText={(text) =>setDetails({...details, street: text})}
                  placeholder="Street"

                />
                <ProfileInputBox
                  value={details.landmark}
                  onChangeText={(text) =>setDetails({...details, landmark: text})}
                  placeholder="Landmark"

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
  
  export default KitchenProfileScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f8f8",
      //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
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
  