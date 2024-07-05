import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Image, ScrollView, BackHandler} from "react-native";
import BackButtonComponent from "../../components/shared/BackButton";
import { AuthContext } from "@/context/authContext";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import TiffinTypeComponent from "../../components/customer/tiffinTypeComponent";
import SubmitButton from "../../components/shared/forms/submitButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import CalendarComponent from "../../components/shared/calendarComponent";
import Icon from "react-native-vector-icons/Ionicons";

const dayCount = {
  'Weekly': 7,
  'Fortnightly': 15,
  'Monthly': 30,
};

const SubscriptionDetailsScreen = ({ navigation, route }) => {
  const { subscription } = route.params;



  const [authState, setAuthState] = useContext(AuthContext);
  const [priceBreakdown, setPriceBreakdown] = useState({
    perTiffin: 0,
    delivery: 0,
    total: 0
  })
  const [calendar, setCalendar] = useState(false)

  const toggleCalendar = () => [
    setCalendar(!calendar)
  ]

  const backAction = () => {
    navigation.navigate('Subscriber');
  };

  const calculatePrice = () => {
    const perTiffin = (subscription.price.tiffinPrice - subscription.price.discount) * subscription.noOfTiffins
    const delivery = subscription.delivery ? subscription.price.deliveryCharge : '0'


    setPriceBreakdown(prevState => ({
      ...prevState,
      perTiffin: perTiffin,
      delivery: delivery,
      total: (perTiffin + delivery) * dayCount[subscription.title]
    }));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
};

  useEffect(() => {
    calculatePrice()
  }, [])

  useEffect(() =>{

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backAction} />
          <ScrollView>
            <View style={styles.kitchenBox}>
              <View style={styles.kitchenContentBox}>
                <Text style={styles.tiffinName}>{subscription.tiffinName}</Text>
                <Text style={styles.subscription}>{subscription.title} Subscription</Text>
                <Text style={styles.subscription}>{dayCount[subscription.title]} days</Text>
                <View style={{ alignSelf: "flex-start" }}>
                  <TiffinTypeComponent tiffinType={subscription.tiffinType} />
                </View>
              </View>
              <View style={styles.stampBox}>
                {subscription.subscriptionStatus.daysRemaining.length == 0?
              <Image source={require('@/assets/shared/stamps/completed_stamp.png')} 
              style={styles.stamp}/>
              : null}
              {subscription.subscriptionStatus.status == 'Cancelled'?
              <Image source={require('@/assets/shared/stamps/cancelled_stamp.png')} 
              style={styles.stamp}/>
              : null}

            </View>
            </View>
          

            <View style={styles.bookingBox}>
              <Text style={styles.bookingTitleTxt}>Subscription Details</Text>
              <View style={[styles.bookingIDBox,  {backgroundColor: "rgba(256,156,0,0.1)"}]}>
                    <Text style={styles.bookingIDText}>
                      Booking ID 
                    </Text>
                    <Text style={styles.bookingIDText}>
                    {subscription._id}
                    </Text>
                    
                  </View>
              <View
                style={[
                  styles.bookingDetialBox,
                  { paddingHorizontal: windowWidth * 0.01 },
                ]}
              >
                <View style={[styles.paymentLineBox, { paddingVertical: windowHeight * 0.001, paddingLeft: windowWidth * 0.01, marginTop: windowHeight * 0.01, marginBottom: windowHeight * 0.011 }]}>
                  <Text style={styles.paymentTxt}>Customer Name: </Text>
                  <Text style={styles.paymentValueTxt}>{subscription.subscriberFirstName + " " + subscription.subscriberLastName }</Text>
                </View>

                <View style={[styles.paymentLineBox, { paddingVertical: windowHeight * 0.002, paddingLeft: windowWidth * 0.01 }]}>
                  <Text style={styles.paymentTxt}>Number of {subscription.noOfTiffins > 1 ? 'tiffins' : 'tiffin'}: </Text>
                  <Text style={styles.paymentValueTxt}>{subscription.noOfTiffins}</Text>
                </View>

                <View style={{ paddingVertical: windowHeight * 0.002, marginTop: windowHeight * 0.005, paddingLeft: windowWidth * 0.01 }}>
                  {subscription.wantDelivery ?
                    <>
                      <Text style={styles.paymentTxt}>Deliver To:</Text>
                      <Text style={styles.paymentTxt}>{subscription.address}</Text>
                    </>
                    :
                    <View style={{alignItems:'center'}}>
                    <Text style={styles.paymentTxt}>No Delivery</Text>
                    </View>}
                </View>


              </View>
              <View
                style={[
                  styles.bookingDetialBox,
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >

                <View style={styles.DateContent}>
                  <Text style={styles.DateText}> Start Date </Text>
                  <Text style={styles.DateValueText}>
                    {" "}
                    {subscription.formattedStartDate}{" "}
                  </Text>
                </View>
                <View style={styles.DateContent}>
                  <Text style={[styles.DateText]}>End Date</Text>
                  <Text style={[styles.DateValueText]}>
                    {subscription.formattedEndDate}
                  </Text>
                </View>
              </View>
              {subscription.subscriptionStatus.status == 'Cancelled'?
              <View style={[styles.paymentLineBox, { paddingVertical: windowHeight * 0.001, paddingLeft: windowWidth * 0.01, marginTop: windowHeight * 0.01, marginBottom: windowHeight * 0.011 }]}>
              <Text style={styles.paymentTxt}>Cancelled On: </Text>
              <Text style={styles.paymentValueTxt}>{formatDate(subscription.subscriptionStatus.cancelDate)}</Text>
            </View>
              :null}

            </View>

            <View style={[styles.bookingBox]}>
              <Text style={styles.bookingTitleTxt}>Status</Text>
              <View style={styles.statusLineBox}>
                <View style={styles.dayBox}>
                  <View style={styles.dayTxtBox}>
                    <Text style={styles.dayvalueText}>
                      {subscription.subscriptionStatus.daysCompleted.length}
                    </Text>
                    <Text style={styles.dayText}> { subscription.subscriptionStatus.daysCompleted.length === 1 ? 'day' : 'days' }</Text>
                  </View>
                  <View style={styles.dayTxtBox}>
                    <Text style={styles.daykeyText}>Completed</Text>
                  </View>
                </View>

                <View style={styles.dayBox}>
                  <View style={styles.dayTxtBox}>
                    <Text style={styles.dayvalueText}>
                      {subscription.subscriptionStatus.daysRemaining.length}
                    </Text>
                    <Text style={styles.dayText}>{ subscription.subscriptionStatus.daysRemaining.length === 1 ? 'day' : 'days' }</Text>
                  </View>
                  <View style={styles.dayTxtBox}>
                    <Text style={styles.daykeyText}>Remaining</Text>
                  </View>
                </View>
              </View>

              {/* Second row of views */}
              <View style={styles.statusLineBox}>
                <View style={styles.dayBox}>
                  <View style={styles.dayTxtBox}>
                    <Text style={styles.daykeyText}>Customer</Text>
                    <Text>Opted Out</Text>
                  </View>
                  <View style={styles.dayTxtBox}>
                    <Text style={styles.dayvalueText}>{subscription.subscriptionStatus.daysOptedOut.length}</Text>
                    <Text style={styles.dayText}>{ subscription.subscriptionStatus.daysOptedOut.length === 1 ? 'day' : 'days' }</Text>
                  </View>

                </View>
                <View style={styles.dayBox}>
                  <View style={styles.dayTxtBox}>
                    <Text style={styles.daykeyText}>You</Text>
                    <Text>Opted Out</Text>
                  </View>
                  <View style={styles.dayTxtBox}>
                    <Text style={styles.dayvalueText}>{subscription.subscriptionStatus.providerOptedOut.length}</Text>
                    <Text style={styles.dayText}>{subscription.subscriptionStatus.providerOptedOut.length === 1 ? 'day' : 'days' }</Text>
                  </View>

                </View>
              </View>
              <View style={styles.calendarButton}>
                {calendar ?

                  <Icon
                    name="close"
                    type="ionicon"
                    style={{ fontSize: windowWidth * 0.08 }}
                    onPress={toggleCalendar}
                  />

                  :
                  <TouchableOpacity onPress={toggleCalendar}>
                    <Text style={[styles.calendarText, { color: 'blue' }]}>View In Calendar</Text>
                  </TouchableOpacity>
                }
              </View>
              {calendar ?
                <CalendarComponent
                  startDate={subscription.startDate}
                  endDate={subscription.endDate}
                  completed={subscription.subscriptionStatus.daysCompleted}
                  customerOut={subscription.subscriptionStatus.daysOptedOut}
                  providerOut={subscription.subscriptionStatus.providerOptedOut}
                />
                : null}
            </View>


            <View style={[styles.bookingBox]}>
              <Text style={styles.bookingTitleTxt}>Payment Details</Text>
              <View
                style={[
                  styles.paymentLineBox,
                  { marginTop: windowHeight * 0.01 },
                ]}
              >
                <Text style={styles.paymentTxt}>Subscription Price: </Text>
                <Text style={styles.paymentValueTxt}>
                  {" "}
                  + ₹ {subscription.kitchenPaymentBreakdown.subscriptionPrice}
                </Text>
              </View>
              <View style={styles.paymentLineBox}>
                <Text style={styles.paymentTxt}>Delivery: </Text>
                <Text style={styles.paymentValueTxt}>+ ₹ {subscription.kitchenPaymentBreakdown.deliveryCharge}</Text>
              </View>
              <View style={styles.paymentLineBox}>
                <Text style={styles.paymentTxt}>GST: </Text>
                <Text style={styles.paymentValueTxt}> + ₹ {subscription.kitchenPaymentBreakdown.tax}</Text>
              </View>
              <View style={styles.paymentLineBox}>
                <Text style={styles.paymentTxt}>Service Charge: </Text>
                <Text style={styles.paymentValueTxt}> - ₹ {subscription.kitchenPaymentBreakdown.platformCharge}</Text>
              </View>
              <View style={styles.paymentLineBox}>
                <Text style={styles.paymentTxt}>Your Discount: </Text>
                <Text style={styles.paymentValueTxt}> - ₹ {subscription.kitchenPaymentBreakdown.discount}</Text>
              </View>
              <View
                style={[
                  styles.paymentLineBox,
                  { borderTopWidth: 1, borderTopColor: "#ccc", paddingVertical: windowHeight *0.015 },
                ]}
              >
                <Text
                  style={[
                    styles.paymentTxt,
                    { fontFamily: "NunitoBold", fontSize: windowWidth * 0.048 },
                  ]}
                >
                  Grand Total :{" "}
                </Text>
                <Text
                  style={[
                    styles.paymentValueTxt,
                    {
                      fontFamily: "NunitoExtraBold",
                      fontSize: windowWidth * 0.048,
                    },
                  ]}
                >
                  ₹ {subscription.kitchenPaymentBreakdown.total}
                </Text>
              </View>
              <View style={[
                  styles.paymentLineBox,
                  { borderTopWidth: 1, borderTopColor: "#ccc" },
                ]}>
                <Text style={styles.paymentTxt}>Recieved Till Now: </Text>
                <Text style={styles.paymentValueTxt}> ₹ {subscription.kitchenPaymentBreakdown.moneyTransferTillNow}</Text>
              </View>
              {subscription.subscriptionStatus.daysRemaining.length !== 0 && subscription.subscriptionStatus.status !== 'Cancelled' ?
              <View
                style={[
                  styles.paymentLineBox,
                  {
                    backgroundColor: "rgba(256,156,0,0.1)",
                    borderRadius: windowWidth * 0.02,
                  },
                ]}
              >
                <Text
                  style={[styles.paymentTxt, { fontSize: windowWidth * 0.035 }]}
                >
                  ₹ {subscription.kitchenPaymentBreakdown.perOrderPrice} will be
                  automatically credited to your wallet for each delivered tiffin.
                </Text>
              </View>
              : null}
            </View>
            

          </ScrollView>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
    alignContent: "center",
  },
  header:{
    flexDirection: 'row',
  },
  kitchenBox: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignSelf: "center",
    alignContent: "center",
    // alignItems: "center",
    flexDirection: "row",
    width: windowWidth * 0.9,
    padding: windowWidth * 0.03,
    marginVertical: windowHeight * 0.01,
    backgroundColor: "#ffff",
    borderRadius: windowWidth * 0.02,
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
  kitchenContentBox: {
    flex: 2,
    // backgroundColor: "#ffaa",
    // alignContent: "flex-start",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  tiffinName: {
    fontSize: windowWidth * 0.066,
    fontFamily: "NunitoExtraBold",
    marginVertical: windowHeight * 0.002,
  },
  subscription: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    marginVertical: windowHeight * 0.002,
    color: "#505050",
  },
  stampBox:{
    flex:1,
    justifyContent: 'center',
  },
  stamp:{
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
  },
  tiffinImage: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    borderRadius: windowWidth * 0.02,
    // marginTop: windowWidth * 0.02,
    justifyContent: "center",
    alignSelf: "center",
  },
  bookingBox: {
    marginVertical: windowHeight * 0.01,
    alignSelf: "center",
    backgroundColor: "#ffff",
    borderRadius: windowWidth * 0.02,
    width: windowWidth * 0.9,
    padding: windowWidth * 0.03,
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
  bookingTitleTxt: {
    fontSize: windowWidth * 0.048,
    fontFamily: "NunitoExtraBold",
  },
  bookingDetialBox: {
    marginVertical: windowHeight * 0.005,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: windowHeight * 0.01,
  },
  DateContent: {
    // paddingVertical: windowHeight * 0.005,
    // backgroundColor: "#ffaa",
    width: "50%",
  },
  DateText: {
    color: "#505050",
    textAlign: "left",
    fontFamily: "NunitoSemiBold",
    fontSize: windowWidth * 0.035,
    marginBottom: windowHeight * 0.002,
  },
  DateValueText: {
    color: "#000",
    textAlign: "left",
    fontSize: windowWidth * 0.044,
    fontFamily: "NunitoBold",
    marginTop: windowHeight * 0.002,
  },
  detailText: {
    color: "#000",
    textAlign: "left",
    fontSize: windowWidth * 0.044,
    fontFamily: "NunitoBold",
    // marginTop: windowHeight * 0.002,
  },
  bookingIDBox: {
    marginVertical: windowHeight * 0.005,
    paddingVertical: windowHeight * 0.005,
    // paddingVertical: windowHeight * 0.01,
  },
  bookingIDText: {
    color: "#000",
    textAlign: 'center',
    fontSize: windowWidth * 0.042,
    fontFamily: "NunitoBold",
  },
  subBox: {
    padding: windowWidth * 0.03,
    marginVertical: windowHeight * 0.01,
    backgroundColor: "rgba(256,165,0,0.2)",
    // borderBottomLeftRadius: windowWidth * 0.05,
    // borderBottomRightRadius: windowWidth * 0.05,
    borderRadius: windowWidth * 0.05,
    width: windowWidth * 0.9,
    alignSelf: "center",
  },
  subNameText: {
    color: "rgba(204,128,0,1)",
    fontSize: windowWidth * 0.054,
    fontFamily: "NunitoExtraBold",
    textAlign: "center",
    marginBottom: windowHeight * 0.01,
  },
  calendarButton: {
    paddingTop: windowHeight * 0.02,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  closeButtonHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.04,
    paddingHorizontal: windowWidth * 0.03,
    fontSize: windowWidth * 0.07,
  },
  calendarText: {
    fontSize: windowWidth * 0.04,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  planPrice: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    // color: "#ffa500",
    marginBottom: 20,
  },
  originalPrice: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    color: "gray",
    textDecorationLine: "line-through",
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoSemiBold",
    // color: "#ffa500",
    marginBottom: 5,
  },
  paymentLineBox: {
    flexDirection: "row",
    // marginVertical: windowHeight * 0.005,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    paddingVertical: windowHeight * 0.008,
    justifyContent: "space-between",
    paddingHorizontal: windowWidth * 0.03,
    // backgroundColor: "#aaff",
  },
  paymentTxt: {
    textAlign: "left",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoSemiBold",
  },
  paymentValueTxt: {
    textAlign: "right",
    fontSize: windowWidth * 0.045,
    fontFamily: "NunitoSemiBold",
  },
  statusLineBox: {
    flexDirection: "row",
    // backgroundColor: "#ffaa",
    paddingHorizontal: windowWidth * 0.01,
    paddingVertical: windowHeight * 0.01,
    // marginVertical: windowHeight * 0.01,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dayBox: {
    flex: 1,
  },
  dayTxtBox: { alignItems: "flex-end", justifyContent: "center", alignContent: 'center', alignItems: 'center' },
  dayvalueText: { fontSize: windowWidth * 0.06, fontFamily: "NunitoBold" },
  dayText: { fontSize: windowWidth * 0.045, fontFamily: "NunitoRegular" },
  daykeyText: { fontSize: windowWidth * 0.05, fontFamily: "NunitoSemiBold" },
  submitButton: {
    backgroundColor: "#ffa500",
    borderRadius: windowWidth * 0.1,
    justifyContent: "center",
    marginBottom: windowHeight * 0.01,
    marginTop: windowHeight * 0.015,
    // marginVertical: windowHeight * 0.015,
    width: windowWidth * 0.7,
    paddingVertical: windowHeight * 0.008,
    alignSelf: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: windowWidth * 0.05,
    fontFamily: "NunitoBold",
    textAlign: "center",
  },
  nextDelText: {
    fontSize: windowWidth * 0.035,
    fontFamily: "NunitoRegular",
    textAlign: "center",
  },
});
