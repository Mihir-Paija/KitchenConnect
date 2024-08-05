import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {windowWidth, windowHeight} from '@/utils/dimensions'

const PendingSubComponent = ({ _id, title, subscriberFirstName, subscriberLastName, tiffinName, tiffinType, noOfTiffins, price, formattedStartDate, formattedEndDate, wantDelivery, address, kitchenPaymentBreakdown, onAccept, onReject, }) => {

    const dayCount = {
        'Weekly': 7,
        'Fortnightly': 15,
        'Monthly': 30,
    };

    const subID = _id;

    const handleAccept = () =>{
        onAccept(subID, 'Current', null)
    }

    const handleReject = () =>{
        onReject(subID, 'Rejected')
    }

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() =>{
        const grandTotal = ((price.tiffinPrice - price.discount) * noOfTiffins + price.deliveryCharge) * dayCount[title]
        setTotalPrice(grandTotal)
    }, [])

    return (
        <View
            style={[styles.container, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}
        >
            <View style={styles.main}>
            <Text style={styles.title}>{tiffinName}</Text>
            <Text style={styles.subtitle}>{title} Subscription</Text>
            </View>
            <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 10 }}>
          <View style={styles.titleBox}>
            <View style={styles.titleContent}>
              <Text style={styles.tiffinName}>Customer: {subscriberFirstName + " " + subscriberLastName }</Text>
              <Text style={styles.detail}>{noOfTiffins} {noOfTiffins > 1 ? 'tiffins' :  'tiffin'}</Text>
              <Text style ={styles.price}>Price: ₹{kitchenPaymentBreakdown.total}</Text>

            </View>
          </View>
          <View style={styles.tiffinTypeBox}>
            <Text style={styles.tiffinType}>{tiffinType}</Text>
            <Text style={styles.tiffinType}>Tiffin</Text>
          </View>
        </View>
            <View style={styles.dateBox}>
          <View style={styles.dateContent}>
            <Text style={styles.dateText}> Start Date </Text>
            <Text style={styles.dateValueText}> {formattedStartDate} </Text>
          </View>
          <View style={styles.dateContent}>
            <Text style={[styles.dateText, { textAlign: "right" }]}>
              End Date
            </Text>
            <Text style={[styles.dateValueText, { textAlign: "right" }]}>
              {formattedEndDate}
            </Text>
            
          </View>
          
        </View>
        <View style={styles.delivery}>
        <Text style={styles.detail}>{wantDelivery ? 'Deliver to: ' +  address : 'No Delivery'}</Text>
        </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PendingSubComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: windowWidth *0.95,
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
        //flexDirection: "row",
        //flexWrap: 'wrap'
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

    androidShadow: {
        elevation: 5,
    },

    iosShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    delivery:{
      paddingLeft : windowWidth * 0.04,
    },

    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },

    acceptButton: {
        flex: 1,
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 5,
    },

    rejectButton: {
        flex: 1,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginLeft: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


