import firebase  from '@react-native-firebase/app';
import messaging from  '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import {API_KEY, SENDER_ID, APP_ID} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: "kitchenconnect-2021",
  storageBucket: "kitchenconnect-2021.appspot.com",
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
};

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};


export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log(authStatus)
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const handleBackgroundMessages = () => {
  console.log("In Bakground")
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};

export const handleForegroundMessages = () => {
  return messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
};