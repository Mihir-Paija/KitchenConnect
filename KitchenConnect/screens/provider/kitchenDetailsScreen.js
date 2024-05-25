import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CheckBox from 'react-native-check-box';
import InputBox from "@/components/shared/forms/inputBox"
import SubmitButton from "@/components/shared/forms/submitButton";
import authAdStyles from "@/styles/shared/authAd";
import activeScreenStyles from "@/styles/shared/activeScreen";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import { signupProvider } from "@/utils/APIs/providerAPI";
import { UserTypeContext } from "@context/userTypeContext";

const KitcehnDetailsScreen = ({ navigation, route }) => {
    const [userType] = useContext(UserTypeContext);

    const { name, email, mobile, password, city } = route.params;

    const [businessName, setBusinessName] = useState("");
    const [description, setDescription] = useState("");
    const [flatNumber, setFlatNumber] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [delivery, setDelivery] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        try {
            setLoading(true);
            if (!businessName || !description || !flatNumber || !street || !landmark || !delivery) {
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
                    description,
                    flatNumber,
                    street,
                    landmark,
                    delivery
                };
                console.log(bodyData)
                if (userType === "provider") {
                    const responseData = await signupProvider(bodyData);
                    Alert.alert("SignUp Successful! Please Login");
                    navigation.navigate("Login");
                }
                console.log("register data => " + JSON.stringify(bodyData));
            }
        } catch (error) {
            Alert.alert(error.message || "An error occurred");
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={activeScreenStyles.screen}>
            <View style={authAdStyles.header}>
                <Text style={authAdStyles.title}>Join KitchenConnect</Text>
                <Text style={authAdStyles.subtitle}>Expand Your Business</Text>
            </View>
            <View style={styles.formContainer}>
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

export default KitcehnDetailsScreen

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        // backgroundColor: "#ffff",
        width: windowWidth * 0.9,
        top: windowHeight * 0.35,
        marginBottom: windowHeight * 0.01,
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