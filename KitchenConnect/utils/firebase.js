// firebase.js
import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCHKFphV8SUpFcn_in43pUcjbow4oHJ0Dg",
  authDomain: "your-auth-domain",
  projectId: "kitchenconnect-2021",
  storageBucket: "kitchenconnect-2021.appspot.com",
  messagingSenderId: "385542085457",
  appId: "1:385542085457:android:4e38a038ccb67dccfdd170"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
