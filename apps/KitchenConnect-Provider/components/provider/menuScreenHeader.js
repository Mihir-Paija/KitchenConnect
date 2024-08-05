import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Octicons";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon4 from "react-native-vector-icons/MaterialIcons"
import FoodTypeIcon from "./foodTypeIcon";
import { windowHeight, windowWidth } from '@/utils/dimensions'
import RatingComponent from "../shared/ratingComponent";

const MenuScreenHeader = ({ tiffin, onBack, onEdit, showDelivery }) => {
    //const [authState] = useContext(AuthContext)
    console.log(tiffin)
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
                <RatingComponent 
                rating={tiffin.rating}
                ratingsize={tiffin.ratingsize ? tiffin.ratingsize :  null}
                kitchenID={tiffin.providerID}
                tiffinID={tiffin.id}
                />
                <Text style={styles.providerName} numberOfLines={1} adjustsFontSizeToFit>{tiffin.name}</Text>
                <Text numberOfLines={1} adjustsFontSizeToFit>{tiffin.shortDescription}</Text>
               
                <View style={styles.details}>
                    <Text style={styles.price}>₹{tiffin.price}</Text>
                    <View style={styles.dotIconView}>
                        <Icon2 name="dot-fill" type="Octicons" style={styles.dotIcon} />
                    </View>

                    <View style={styles.delivery}>
                        <Image
                            source={require("@/assets/shared/icons8-take-away-food-ios-17-filled/icons8-take-away-food-90.png")}
                            style={styles.deliveryIcon}
                        />
                        <Text style={styles.price}> {tiffin.hours}:{tiffin.mins}</Text>
                    </View>
                    <View style={styles.dotIconView}>
                        <Icon2 name="dot-fill" type="Octicons" style={styles.dotIcon} />
                    </View>
                    <Text>{tiffin.tiffinType}</Text>
                </View>
                <View style={styles.buttons}>
                    <Icon3
                        name='pencil-outline'
                        style={styles.createButton}
                        onPress={onEdit} />
                    <Icon4
                        name='delivery-dining'
                        style={[styles.createButton, {fontSize: windowHeight *0.033}]}
                        onPress={showDelivery} />
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
        //marginTop: windowHeight * 0.05,
        paddingLeft: windowWidth * 0.02,
    },
    backButton: {
        color: 'black',
        fontSize: windowHeight * 0.04,
    },

    infoContainer: {
        width: '70%',
        paddingTop: '2%',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    providerName: {
        color: 'black',
        fontSize: windowHeight * 0.035,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    details: {
        flexDirection: 'row',
        width: '65%',
        justifyContent: 'space-around'
    },
    buttons:{
        marginTop: windowHeight *0.01,
        flexDirection: 'row',
        width: '20%',
        justifyContent: 'center'
    },
    price: {
        fontSize: windowHeight * 0.017,
    },

    dotIconView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: windowWidth * 0.02,
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
    createButton: {
        color: '#FFA500',
        fontSize: windowHeight * 0.030,
        marginHorizontal: windowWidth *0.005
    },
    foodType: {
        width: '15%'
    },
    iconView: {
        position: 'absolute',
        //top: windowHeight * 0.05,
        right: windowWidth * 0.02,
    },
    icon: {

        width: '100%',
        height: '100%',
    },

})