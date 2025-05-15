import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  /*apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,*/
  apiKey: "AIzaSyAUis0469eqaUBcQVBaA10armA8Y2vcNC0",
  authDomain: "provafiap-49f0b.firebaseapp.com",
  projectId: "provafiap-49f0b",
  storageBucket: "provafiap-49f0b.firebasestorage.app",
  messagingSenderId: "114481691404",
  appId: "1:114481691404:web:f3e6d319d26290aa83a729",
  measurementId: "G-HXJWX1KEL8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;