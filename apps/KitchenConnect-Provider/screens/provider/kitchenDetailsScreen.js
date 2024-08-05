import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Keyboard, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import InputBox from "@/components/shared/forms/inputBox"
import SubmitButton from "@/components/shared/forms/submitButton";
import authAdStyles from "@/styles/shared/authAd";
import activeScreenStyles from "@/styles/shared/activeScreen";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { signupProvider } from "@/utils/provider/providerAPI";

const KitchenDetailsScreen = ({ navigation, route }) => {

    const { name, email, mobile, password, city } = route.params;

    const [businessName, setBusinessName] = useState("");
    const [description, setDescription] = useState("");
    const [flatNumber, setFlatNumber] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [delivery, setDelivery] = useState(false);

    const [loading, setLoading] = useState(false);
    const [keyboard, setKeyboard] = useState(false);

    const handleSignup = async () => {
        try {
            setLoading(true);
            if (!businessName || !description || !flatNumber || !street || !landmark ) {
                Alert.alert("Please Fill All Fields");
                setLoading(false);
                return;
            } else {
                setLoading(false);
                const bodyData = {
                    name,
                    email,
                    mobile,
                    password,
                    city,
                    businessName,
                    shortDescription: description,
                    flatNumber,
                    street,
                    landmark,
                    provideDelivery: delivery
                };
                console.log(bodyData)
                    const responseData = await signupProvider(bodyData);
                    Alert.alert("SignUp Successful! Please Login");
                    navigation.navigate("Login");

                //console.log("register data => " + JSON.stringify(bodyData));
            }
        } catch (error) {
            Alert.alert(error.message || "An error occurred");
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboard(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboard(false);
        });
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

    return (
        <SafeAreaView style={activeScreenStyles.screen}>
            <View style={keyboard ?styles.header : authAdStyles.header}>
                <Text style={authAdStyles.title}>Join KitchenConnect</Text>
                <Text style={authAdStyles.subtitle}>Expand Your Business</Text>
            </View>
            <View style={keyboard ?styles.keyboardFormContainer:  styles.formContainer}>
                <InputBox
                    input="Business Name"
                    value={businessName}
                    setValue={setBusinessName}
                />
                <InputBox
                    input="Short Description"
                    value={description}
                    setValue={setDescription}
                />
                <InputBox
                    input="Flat Number / House Name"
                    value={flatNumber}
                    setValue={setFlatNumber}
                />
                <InputBox
                    input="Street"
                    value={street}
                    setValue={setStreet}
                />
                <InputBox
                    input="Landmark"
                    value={landmark}
                    setValue={setLandmark}
                />
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        isChecked={delivery}
                        onClick={() => setDelivery(!delivery)}
                        checkBoxColor="orange"
                    />
                    <Text style={styles.labels}>Would you provide delivery?</Text>
                </View>
                <SubmitButton
                    btnTitle={"SignUp"}
                    handleSubmitBtn={handleSignup}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
    )


}

export default KitchenDetailsScreen

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        // backgroundColor: "#ffff",
        width: windowWidth * 0.9,
        top: windowHeight * 0.35,
        marginBottom: windowHeight * 0.01,
    },
    header:{
        position: "absolute",
        // backgroundColor: "#ffaa",
        top: windowHeight * 0.1,
        justifyContent: "center",
        alignContent: "center",
      },
      keyboardFormContainer: {
        flex: 1,
        width: windowWidth * 0.9,
        top: windowHeight * 0.18,
        marginBottom: windowHeight * 0.02,
      },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        padding: 0,
        margin: 0,
    },
    labels: {
        fontSize: 16,
        marginLeft: 10,
    },

})