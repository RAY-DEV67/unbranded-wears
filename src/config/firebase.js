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
    apiKey: "AIzaSyCnJH3QI_fekMqNMDm5zrpZO7brTC-0pi0",
    authDomain: "fusion2-394a6.firebaseapp.com",
    projectId: "fusion2-394a6",
    storageBucket: "fusion2-394a6.appspot.com",
    messagingSenderId: "764509347619",
    appId: "1:764509347619:web:ba7e0dae4938ed9418b696"
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


