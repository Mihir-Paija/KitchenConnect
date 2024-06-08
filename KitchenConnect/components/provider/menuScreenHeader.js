import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import FoodTypeIcon from "./foodTypeIcon";
import { windowHeight, windowWidth } from '@/utils/dimensions'
import Icon2 from "react-native-vector-icons/Octicons";

const MenuScreenHeader = ({ tiffin, onBack }) => {


    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.backBtnView}>
                <Icon
                    name="arrow-back"
                    type="ionicon"
                    style={styles.backButton}
                    onPress={onBack}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.providerName} numberOfLines={1} adjustsFontSizeToFit>{tiffin.name}</Text>
                <Text numberOfLines={1} adjustsFontSizeToFit>{tiffin.shortDescription}</Text>
                <View style={styles.details}>
                    <Text style={styles.price}>₹{tiffin.price}</Text>
                    <View style={styles.dotIconView}>                    
                        <Icon2 name="dot-fill" type="Octicons" style={styles.dotIcon} />
                     </View>

                    <View style={styles.delivery}>
                        <Image
                            source={require("@assets/shared/icons8-take-away-food-ios-17-filled/icons8-take-away-food-90.png")}
                            style={styles.deliveryIcon}
                        />
                        <Text style={styles.price}> {tiffin.hours}:{tiffin.mins}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.foodType}>
                <View style={styles.iconView}>
                    <FoodTypeIcon foodType={tiffin.foodType} style={styles.icon} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MenuScreenHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

    },
    backBtnView: {
        width: '15%',
        marginTop: windowHeight * 0.05,
        paddingLeft: windowWidth * 0.02,
    },
    backButton: {
        color: 'black',
        fontSize: windowHeight * 0.04,
    },

    infoContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    providerName: {
        color: 'black',
        fontSize: windowHeight * 0.04,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    details: {
        flexDirection: 'row',
        width: '45%',
        justifyContent: 'space-around'
    },
    price: {
        fontSize: windowHeight * 0.02,
    },

    dotIconView:{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: windowWidth *0.02,
        marginRight: windowWidth * 0.02,
    },
      dotIcon: {
        // backgroundColor: "#aaff",
        fontSize: windowWidth * 0.03,
        color: "#3c3636",
        
      },
      timeText: {
        textAlign: "center",
        fontSize: windowWidth * 0.04,
        fontFamily: "NunitoRegular",
        color: "#3c3636",
        marginRight: windowWidth * 0.02,
      },
      delivery: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        // marginBottom: windowWidth * 0.01,
      },
      deliveryIcon: {
        width: windowWidth * 0.05,
        height: windowHeight * 0.02,
      },
    foodType: {
        width: '15%'
    },
    iconView: {
        position: 'absolute',
        top: windowHeight * 0.05,
        right: windowWidth * 0.02,
    },
    icon: {

        width: '100%',
        height: '100%',
    },

})