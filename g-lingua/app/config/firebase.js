import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';  // Remove the '/react-native' part
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF0IPLmZJ9xecZCVrdI5CFYF5c2-o6lpM",
  authDomain: "g-lingua-mobile.firebaseapp.com",
  projectId: "g-lingua-mobile",
  storageBucket: "g-lingua-mobile.appspot.com",
  messagingSenderId: "341826578532",
  appId: "1:341826578532:web:a93c24bd9cfd1efa9f5771",
  measurementId: "G-F3YRY3YQH0"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };