import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList } from 'react-native';

const OrderComponent = ({title, tiffinName, noOfTiffins, customerName, price, delivery, address, customerOut, providerOut}) =>{
  const dayCount = {
    Weekly: 7,
    Fortnightly: 15,
    Monthly: 30,
  }

  const [dayPrice, setDayPrice] = useState(0);

  useEffect(() => {
    const result = (price.tiffinPrice - price.discount) * noOfTiffins + price.deliveryCharge
    setDayPrice(Math.round(result *100) /100)
  }, [])

return (
    <View style={styles.container}>
      <Text style={styles.title}>{tiffinName} - {noOfTiffins} {noOfTiffins > 1 ? 'tiffins' :  'tiffin'}</Text>
      <Text>{customerName}</Text>
      <Text>Amout to be paid: ₹{dayPrice}</Text>
      {delivery ?
      <Text style={styles.address}>Deliver To: {address}</Text>
    : 
    <Text style={styles.address}>You Don't Provide Delivery</Text>}
    {customerOut ? <Text>Customer Has Opted Out</Text> :  null}
    {providerOut ? <Text>You Have Opted Out</Text> :  null}
    </View>
  );
};

export default OrderComponent

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    paddingLeft: 17,
    borderBottomColor: '#ccc',
    width: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#555',
  },
});