import React, { useEffect } from "react"
import {View, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { windowWidth, windowHeight } from '@/utils/dimensions';

const HomeHeader = ({profile, onPress}) =>{
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.providerName}>{profile.kitchenName} </Text>
                <Text numberOfLines={1} adjustsFontSizeToFit>{profile.shortDescription}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress = {onPress}>
                <Image
                source={require("@assets/shared/icons8-male-user-ios-17-outlined/icons8-male-user-50.png")}
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

    providerName: {
        color: 'black',
        fontSize: windowHeight * 0.03,
        fontWeight: 'bold',
        textAlign: 'center',
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
