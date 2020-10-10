import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyCSuLRKyKntXrGnMSpaAOjMu-hfXb-JZqA",
  authDomain: "superchat-efbc9.firebaseapp.com",
  databaseURL: "https://superchat-efbc9.firebaseio.com",
  projectId: "superchat-efbc9",
  storageBucket: "superchat-efbc9.appspot.com",
  messagingSenderId: "309579726343",
  appId: "1:309579726343:web:6ef1782cae72176fa2f4a2",
  measurementId: "G-8RQ4B946T3"
});

const firestore = firebase.firestore();
const auth = firebase.auth();

export default { firestore, auth, firebase };