import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import {getFirestore} from "firebase/firestore"

// NEW CONFIG ////////////////////////////

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/storage"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyDqZQXsFYfA-cqMW_es6jW0YODd2gjS95M",
  authDomain: "unbranded-2e6a3.firebaseapp.com",
  projectId: "unbranded-2e6a3",
  storageBucket: "unbranded-2e6a3.appspot.com",
  messagingSenderId: "557358946583",
  appId: "1:557358946583:web:0daa786c5d3a1061af7f52",
  measurementId: "G-QLE4DDNHZ5"
});

// Initialize Firebase
const app = firebaseApp;

const db = firebaseApp.firestore()

// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app)
export const storage = firebase.storage()
export default db


