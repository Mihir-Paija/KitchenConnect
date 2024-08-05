import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {windowWidth, windowHeight} from '@/utils/dimensions'

const CompletedSubComponent = ({title, subscriberFirstName, subscriberLastName, tiffinName, tiffinType, subscriptionStatus, noOfTiffins, price, formattedEndDate, kitchenPaymentBreakdown, onPress}) => {
    const dayCount = {
        'Weekly': 7,
        'Fortnightly': 15,
        'Monthly': 30,
    };

    const [totalPrice, setTotalPrice] = useState(0)
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}/${month}/${year}`;
  };

    useEffect(() =>{
        const grandTotal = ((price.tiffinPrice - price.discount) * noOfTiffins + price.deliveryCharge) * dayCount[title]
        setTotalPrice(grandTotal)
    }, [])

    return (
        <TouchableOpacity
            style={[styles.container, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
            onPress = {onPress}
        >
            <View style={styles.main}>
            <Text style={styles.title}>{tiffinName}</Text>
            <Text style={styles.subtitle}>{title} Subscription</Text>
            </View>
            <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 10 }}>
          <View style={styles.titleBox}>
            <View style={styles.titleContent}>
              <Text style={styles.tiffinName}>Customer: {subscriberFirstName + " " + subscriberLastName}</Text>
              <Text style={styles.detail}>{noOfTiffins} {noOfTiffins > 1 ? 'tiffins' :  'tiffin'}</Text>
              <Text style ={styles.price}>Price: ₹{kitchenPaymentBreakdown.total}</Text>
            </View>
          </View>
          <View style={styles.tiffinTypeBox}>
            <Text style={styles.tiffinType}>{tiffinType}</Text>
            <Text style={styles.tiffinType}>Tiffin</Text>
          </View>
        </View>
        {subscriptionStatus.status === 'Cancelled' ?
        <Text style={styles.dateDetail}>Cancelled on {formatDate(new Date())}</Text>
        :
            <Text style={styles.dateDetail}>Completed on {formattedEndDate}</Text>}
        </TouchableOpacity>
    );
};

export default CompletedSubComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 5,
        width: windowWidth *0.95,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    main:{
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC266',
    },
    title: {
        paddingTop: windowHeight * 0.01,
        paddingHorizontal: windowWidth * 0.04,
        fontSize: windowHeight * 0.027,
        fontWeight: 'bold',
    },
    subtitle: {
        //paddingTop: windowHeight * 0.01,
        fontSize: windowHeight * 0.023,
        paddingHorizontal: windowWidth * 0.04,
        fontWeight: 'bold',
        marginBottom: 10,
       // color: "#505050"
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
    },
    titleBox: {
        flexDirection: "row",
      },
    titleContent: {
        // backgroundColor: "#ffaa",
        justifyContent: "center",
        paddingHorizontal: windowWidth * 0.03,
      },
    tiffinImage: {
        height: windowWidth * 0.13,
        width: windowWidth * 0.13,
        borderRadius: windowWidth * 0.02,
        marginTop: windowWidth * 0.02,
      },
    providerName: {
        fontSize: windowWidth * 0.05,
        fontFamily: "NunitoBold",
        marginVertical: windowHeight * 0.001,
      },
    tiffinName: {
        fontSize: windowWidth * 0.04,
        fontFamily: "NunitoSemiBold",
        marginVertical: windowHeight * 0.001,
        color: "#505050",
      },
    tiffinType: {
        color: "#000",
        textAlign: "center",
        fontSize: windowWidth * 0.045,
        fontFamily: "NunitoRegular",
      },
    tiffinTypeBox: {
        backgroundColor: "#FFECEC",
        paddingVertical: windowWidth * 0.01,
        paddingHorizontal: windowWidth * 0.03,
        borderRadius: windowWidth * 0.02,
        borderWidth: 0.5,
        borderColor: "#FFECEC",
        justifyContent: "center",
        marginRight: windowWidth * 0.03,
      },
    dateBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: windowHeight * 0.01,
        // backgroundColor: "#aaff",
      },
    dateContent: {
        paddingVertical: windowHeight * 0.005,
        //backgroundColor: "#ffaa",
        paddingHorizontal: windowWidth * 0.02,
      },
    dateText: {
        color: "#000",
        textAlign: "left",
        fontSize: windowWidth * 0.04,
        fontFamily: "NunitoSemiBold",
        marginBottom: windowHeight * 0.002,
      },
    dateValueText: {
        color: "#505050",
        textAlign: "left",
        fontSize: windowWidth * 0.04,
        fontFamily: "NunitoRegular",
        marginTop: windowHeight * 0.002,
      },
    price:{
        fontSize: windowHeight *0.02,
        fontWeight: 'condensedBold'
    },

    dateDetail: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 3,
        fontStyle: 'italic',
        paddingHorizontal: windowWidth * 0.03
    },

    androidShadow: {
        elevation: 5,
    },

    iosShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});