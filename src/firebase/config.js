import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const API_KEY_FIREBASE = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY_FIREBASE,
  authDomain: 'planet-tv-3c173.firebaseapp.com',
  projectId: 'planet-tv-3c173',
  storageBucket: 'planet-tv-3c173.appspot.com',
  messagingSenderId: '659561795959',
  appId: '1:659561795959:web:a5624af82b0079579a9172',
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
