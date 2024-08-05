import {
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import React, { useContext } from "react";
  import { AuthContext } from "@/context/authContext";
  import { windowWidth, windowHeight } from "@/utils/dimensions";
  import BackButtonComponent from "@/components/shared/BackButton";
import { changeStatus, deleteProvider } from "@/utils/provider/profileAPI";
import {RefreshContext} from '@/context/refreshContext'
  
  const SettingsScreen = ({ navigation, route}) => {
    const [authState, setAuthState] = useContext(AuthContext);
    const {profile} = route.params
    console.log(profile)
    const [globalRefresh, setGlobalRefresh] = useContext(RefreshContext)
  
    const backHandler = () => {
      navigation.goBack();
    };

    const handleDeactivate = async() =>{
      try {
        const bodyData = {
          deactivate: !profile.deactivate
        } 

        const response = await changeStatus(authState.authToken, bodyData)
        if(response && response.status === 200){
          profile.deactivate = !profile.deactivate
          console.log(response)
          Alert.alert("Update Successfull")
          setGlobalRefresh(!globalRefresh)
          navigation.navigate('Tiffin')
        }
        else{
          Alert.alert(`Couldn't Update`)
        }
      } catch (error) {
        console.log('Error In Changing Status ', error)
        Alert.alert(error.message || 'An Error Occured')
        
      }
    }

    const handleDelete = async() =>{
      try {
        const response = await deleteProvider(authState.authToken)
        if(response && response.status === 200){
          console.log(response)
          Alert.alert("Delete Successfull")
        }
        else{
          Alert.alert(`Couldn't Delete`)
        }
      } catch (error) {
        console.log('Error In Changing Status ', error)
        Alert.alert(error.message || 'An Error Occured')
        
      }
    }

    const confirmActivate = () => {
      Alert.alert(
        "Activate Account",
        "Are you sure you want to activate your account?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("activate Cancelled"),
            style: "cancel",
          },
          {
            text: "Activate",
            onPress: handleDeactivate,
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
    };
    
    
    const confirmDeactivate = () => {
      Alert.alert(
        "Deactivate Account",
        "Are you sure you want to deactivate your account?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Deactivate Cancelled"),
            style: "cancel",
          },
          {
            text: "Deactivate",
            onPress: handleDeactivate,
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
    };
  
  
    
    const confirmDelete = () => {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Delete Cancelled"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: handleDelete,
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        {authState.authToken ? (
          <>
            <BackButtonComponent onPress={backHandler} screenTitle={"Settings"} />
            {profile.deactivate ? 
            <TouchableOpacity onPress={confirmActivate} style={styles.lineBox}>
              <Text style={styles.labelText}>Account Setting</Text>
              <Text style={styles.contentText}>Activate your account</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={confirmDeactivate} style={styles.lineBox}>
            <Text style={styles.labelText}>Account Setting</Text>
            <Text style={styles.contentText}>Deactivate your account</Text>
          </TouchableOpacity>
            }
           
            <TouchableOpacity onPress={confirmDelete} style={styles.lineBox}>
              <Text style={styles.labelText}>Account Setting</Text>
              <Text style={styles.contentText}>Delete your account</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>You are not authorized to access this screen.</Text>
        )}
      </SafeAreaView>
    );
  };
  
  export default SettingsScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f8f8",
      //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    },
    lineBox: {
      width: windowWidth * 0.95,
      alignSelf: "center",
      marginVertical: windowHeight * 0.005,
      borderBottomWidth: 1,
      borderColor: "#ccc",
      paddingHorizontal: windowWidth * 0.03,
      paddingVertical: windowHeight * 0.015,
    },
    labelText: {
      fontFamily: "NunitoSemiBold",
      fontSize: windowWidth * 0.045,
    },
    contentText: {
      fontFamily: "NunitoSemiBold",
      fontSize: windowWidth * 0.035,
      color: "#505050",
    },
  });
  