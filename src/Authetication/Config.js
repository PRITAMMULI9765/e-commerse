import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDL13DN_tNNrsLdLrWSsVsl_VlE1eoA64g",
  authDomain: "muli-e-commerse.firebaseapp.com",
  projectId: "muli-e-commerse",
  storageBucket: "muli-e-commerse.appspot.com",
  messagingSenderId: "1002762274282",
  appId: "1:1002762274282:web:db003da1b29605c1659e93",
  measurementId: "G-S3J6M147XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const analytics = getAnalytics(app);
const database = getDatabase(app); 
const db = getFirestore(app)
const storage = getStorage(app)

export {auth, provider, getFirestore, storage, db, RecaptchaVerifier}