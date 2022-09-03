import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWoixZR4x5Lg_RSaCGbEUHRimf4WOPNvQ",
  authDomain: "mymoney-5bb35.firebaseapp.com",
  projectId: "mymoney-5bb35",
  storageBucket: "mymoney-5bb35.appspot.com",
  messagingSenderId: "337010969372",
  appId: "1:337010969372:web:52a2d4e7b9622d680388d9",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp };
