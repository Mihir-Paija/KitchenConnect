import React from "react"
import {View, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { windowWidth, windowHeight } from '@/utils/dimensions';
import RatingComponent from "../shared/ratingComponent";

const HomeHeader = ({profile, onPress}) =>{
    return (
        <SafeAreaView style={profile.deactivate ? styles.deactivatedContainer : styles.container}>
            {profile.deactivate ? <Text>Kitchen is Deactivated</Text> : null}
            <View>
                <Text style={styles.providerName}>{profile.kitchenName} </Text>
                <Text numberOfLines={1} adjustsFontSizeToFit>{profile.shortDescription}</Text>
                <View style={styles.ratingBox}>
        <RatingComponent
          rating={profile.rating}
          ratingsize={profile.ratingsize ? profile.ratingsize : null}
          kitchenID={profile._id}
        />
      </View>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress = {onPress}>
                <Image
                source={require("@/assets/shared/icons8-male-user-ios-17-filled/icons8-male-user-50.png")}
                style={styles.icon}
              />
              </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF"

    },
    deactivatedContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A9A9A9',
    },

    providerName: {
        color: 'black',
        fontSize: windowHeight * 0.03,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    ratingBox: {
        marginVertical: windowWidth * 0.02,
      },

    iconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 15,
        paddingTop: 10, 
    },

    icon: {
        width: 35, 
        height: 35, 
    }
})
