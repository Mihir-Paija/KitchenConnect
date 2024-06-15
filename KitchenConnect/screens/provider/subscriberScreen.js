import React, { useEffect, useState, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, StatusBar, FlatList, Alert } from 'react-native';
import activeScreenStyles from '@/styles/shared/activeScreen';
import { AuthContext } from "@/context/authContext";
import { RefreshContext } from '@/context/refreshContext'
import SubStatusComponent from '@/components/provider/subStatusComponent';
import AcceptedSubComponent from '../../components/provider/acceptedSubComponent';
import PendingSubComponent from '../../components/provider/pendingSubComponent';
import CompletedSubComponent from '../../components/provider/completedSubComponent';
import { getSubscribers, decideStatus } from '@/utils/provider/subscriberAPI';
import LoadingScreen from '../shared/loadingScreen';



const SubscriberScreen = ({ navigation }) => {

  const [authState] = useContext(AuthContext)
  const [refresh, setRefresh] = useContext(RefreshContext)
  const [loading, setLoading] = useState(false)

  const [active, setActive] = useState(true);
  const [pending, setPending] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activeSubscribers, setActiveSubscribers] = useState([]);
  const [pendingSubscribers, setPendingSubscribers] = useState([]);
  const [completedSubscribers, setCompletedSubscribers] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const response = await getSubscribers(authState.authToken)
      //console.log(response)
      const active = [];
      const pending = [];
      const completed = [];
      const currentDate = new Date();

      for (const subscriber of response) {

        const formattedSubscriber = {
          ...subscriber,
          startDate: formatDate(new Date(subscriber.startDate)),
          endDate: formatDate(new Date(subscriber.endDate)),
        };


        if (new Date(subscriber.endDate) < currentDate && subscriber.accepted) {
          completed.push(formattedSubscriber);
        }
        else if (subscriber.accepted) {
          active.push(formattedSubscriber);
        } else if (subscriber.pending) {
          pending.push(formattedSubscriber);
        }
      }


      setActiveSubscribers(active);
      setPendingSubscribers(pending);
      setCompletedSubscribers(completed);

    } catch (error) {
      console.log('Error in Fetching Subscribers ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [, refresh])

  const handleActive = () => {
    setPending(false)
    setCompleted(false)
    setActive(true)
  }

  const handlePending = () => {
    setActive(false)
    setCompleted(false)
    setPending(true)
  }

  const handleCompleted = () => {
    setActive(false)
    setPending(false)
    setCompleted(true)
  }

  const handleStatus = async (id, status, comments) => {
    try {
      setLoading(true)
      bodyData = {
        accepted: status,
        comments
      }
      const response = await decideStatus(authState.authToken, id, bodyData)
    } catch (error) {
      console.log('Error in Deciding Status ', error);
      Alert.alert(error.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false)
      setRefresh(!refresh)
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
      {loading ?
        <LoadingScreen />
        :
        (<>
          <SubStatusComponent
            active={active}
            onPressActive={handleActive}
            pending={pending}
            onPressPending={handlePending}
            completed={completed}
            onPressCompleted={handleCompleted}
          />
          {active ? <>
            {activeSubscribers.length !== 0 ?
              <FlatList
                data={activeSubscribers}
                renderItem={({ item }) => (
                  <AcceptedSubComponent {...item} />
                )}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.flatList}
              />
              :
              <View style={styles.emptyView}>
                <Text>No Active Subscriptions</Text>
              </View>
            }
          </>
            : null
          }

          {pending ?
            <View style={styles.view}>
              {pendingSubscribers.length !== 0 ?
                <FlatList
                  data={pendingSubscribers}
                  renderItem={({ item }) => (
                    <PendingSubComponent {...item}
                      onAccept={handleStatus}
                      onReject={handleStatus} />
                  )}
                  keyExtractor={(item) => item._id.toString()}
                  contentContainerStyle={styles.flatList}
                />
                :
                <View style={styles.emptyView}>
                  <Text>No Pending Subscriptions</Text>
                </View>
              }
            </View>
            : null
          }

          {completed ?
            <>
              {completedSubscribers.length !== 0 ?
                <FlatList
                  data={completedSubscribers}
                  renderItem={({ item }) => (
                    <CompletedSubComponent {...item} />
                  )}
                  keyExtractor={(item) => item._id.toString()}
                  contentContainerStyle={styles.flatList}
                />
                :
                <View style={styles.emptyView}>
                  <Text>No Completed Subscriptions</Text>
                </View>
              }
            </>
            : null
          }

        </>)}
    </SafeAreaView>
  );
};


export default SubscriberScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: StatusBar.currentHeight * 1

  },
  subscribers: {
    justifyContent: 'center',
    alignContent: 'center',
  },

  flatList: {
    paddingBottom: 70,
    alignItems: 'center'
  },

  view: {
    marginTop: 20,
  },

  emptyView: {
    marginTop: 20,
    alignItems: 'center'
  }
})