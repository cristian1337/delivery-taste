import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAqEWUPkN8Vac-is9fJQU_D11fRNZS50rU",
    authDomain: "appdelivery-ccdc8.firebaseapp.com",
    databaseURL: "https://appdelivery-ccdc8.firebaseio.com",
    projectId: "appdelivery-ccdc8",
    storageBucket: "appdelivery-ccdc8.appspot.com",
    messagingSenderId: "986569537847",
    appId: "1:986569537847:web:046d2d91c4233343e702b2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();