import React, {useEffect, useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList, Alert, Touchable } from 'react-native';
import { AuthContext } from "@/context/authContext";
import OrderHeader from '@/components/provider/orderHeader';
import OrderComponent from '@/components/provider/orderComponent';
import OrderCard from '@/components/provider/orderCard';
import { getOrders, optOut } from '../../utils/provider/orderAPI';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PreparationScreen = ({navigation}) => {
  const [authState] = useContext(AuthContext)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)

  const [type, setType] = useState('Lunch')
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])

  const fetchOrders = async() => {
    try {
      setLoading(true)
      const response = await getOrders(authState.authToken)
      console.log(response)

      setLunch(response.lunch)
      setDinner(response.dinner)

    } catch (error) {
      console.log('Error in Fetching Orders ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    }
  }

  useEffect(() =>{
    fetchOrders()
  },[,refresh])

  const handleOut = async(type) =>{
    try {
      const bodyData = {
        order: type === 'Lunch' ? lunch : dinner,
        type
      }

      const response = await optOut(authState.authToken, bodyData)

      if(response && response.status === 200){
          Alert.alert(`Opted Out of ${type} Orders`)
        }

      else {
        Alert.alert(`Couldn't Opt Out`)
      }
      
    } catch (error) {
      console.log('Error in Opting Out Screen ', error)
      console.log(error.message || 'An Error Occured')
    }
  }

  useEffect(() => {
    
    const backAction = () => {
      navigation.navigate("My Tiffins")

      return true
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <OrderHeader 
      name={type}
      onPressLunch={()=>setType('Lunch')}
      onPressDinner={()=>setType('Dinner')}
      />
      {type === 'Lunch' ?
      <>
      { lunch.length !== 0 ?
      <>
       <FlatList
       data={lunch}
       renderItem={({ item }) => (
         <OrderCard {...item} />
       )}
       contentContainerStyle={styles.flatList}
     />
     <TouchableOpacity onPress={() => handleOut('Lunch')} style = {styles.btn}>
      <Text style={styles.btnText}>Opt Out for Lunch</Text>
     </TouchableOpacity>
     </>
     :
     <View style={styles.emptyView}>
       <Text>No Lunch Deliveries Today</Text>
     </View>
      }
      </>
      : null}
      {type === 'Dinner' ?
      <>
      { dinner.length !== 0 ?
      <>
       <FlatList
       data={dinner}
       renderItem={({ item }) => (
         <OrderCard {...item} />
       )}
       contentContainerStyle={styles.flatList}
     />
     <TouchableOpacity onPress={() => handleOut('Dinner')} style = {styles.btn}>
      <Text style={styles.btnText}>Opt Out for Dinner</Text>
     </TouchableOpacity>
     </>
     :
     <View style={styles.emptyView}>
       <Text>No Dinner Deliveries Today</Text>
     </View>
      }
      </>
      : null}
    </SafeAreaView>
  );
};

export default PreparationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
   // paddingTop: StatusBar.currentHeight * 1.2

  },
  flatList: {
    alignItems: 'center',
    marginTop: 12,
    paddingBottom: 20,
  },
  view:{
    flex: 1,
    marginVertical: 10,
    alignItems: 'center'
  },
  btn:{
    color: 'red',
    alignContent: 'center',
    alignItems: 'center'
  },
  btnText:{
    fontSize: 18
  },
  emptyView: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center'
  }
})