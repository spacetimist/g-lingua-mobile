<<<<<<< HEAD
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';  // Remove the '/react-native' part
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

=======
//// app/config/firebase.js
//import { initializeApp } from 'firebase/app';
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
//import { getFirestore } from 'firebase/firestore';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//
//// Firebase configuration
//const firebaseConfig = {
//  apiKey: "AIzaSyDF0IPLmZJ9xecZCVrdI5CFYF5c2-o6lpM",
//  authDomain: "g-lingua-mobile.firebaseapp.com",
//  projectId: "g-lingua-mobile",
//  storageBucket: "g-lingua-mobile.firebasestorage.app",
//  messagingSenderId: "341826578532",
//  appId: "1:341826578532:web:a93c24bd9cfd1efa9f5771",
//  measurementId: "G-F3YRY3YQH0"
//};
//
//// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//
//// Initialize Auth
//const auth = initializeAuth(app, {
//  persistence: getReactNativePersistence(AsyncStorage),
//});
//
//// Initialize Firestore
//const db = getFirestore(app);
//
//export { auth, db };

// ----------------------------------------------

// // import { initializeApp } from 'firebase/app';
// // import { getAuth } from 'firebase/auth';
// // import { getFirestore } from 'firebase/firestore';

// // const firebaseConfig = {
// //   apiKey: "your-api-key",
// //   authDomain: "your-project.firebaseapp.com",
// //   projectId: "your-project-id",
// //   storageBucket: "your-bucket.appspot.com",
// //   messagingSenderId: "your-sender-id",
// //   appId: "your-app-id"
// // };

// // const app = initializeApp(firebaseConfig);
// // export const auth = getAuth(app);
// // export const db = getFirestore(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDF0IPLmZJ9xecZCVrdI5CFYF5c2-o6lpM",
//   authDomain: "g-lingua-mobile.firebaseapp.com",
//   projectId: "g-lingua-mobile",
//   storageBucket: "g-lingua-mobile.firebasestorage.app",
//   messagingSenderId: "341826578532",
//   appId: "1:341826578532:web:a93c24bd9cfd1efa9f5771",
//   measurementId: "G-F3YRY3YQH0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// ----------------------------------

// app/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

>>>>>>> 132fe8d35a09ebaf48975c84370b85f7ed5ac762
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF0IPLmZJ9xecZCVrdI5CFYF5c2-o6lpM",
  authDomain: "g-lingua-mobile.firebaseapp.com",
  projectId: "g-lingua-mobile",
<<<<<<< HEAD
  storageBucket: "g-lingua-mobile.appspot.com",
=======
  storageBucket: "g-lingua-mobile.firebasestorage.app",
>>>>>>> 132fe8d35a09ebaf48975c84370b85f7ed5ac762
  messagingSenderId: "341826578532",
  appId: "1:341826578532:web:a93c24bd9cfd1efa9f5771",
  measurementId: "G-F3YRY3YQH0"
};

<<<<<<< HEAD
// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
=======
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (without persistence for now)
const auth = getAuth(app);
>>>>>>> 132fe8d35a09ebaf48975c84370b85f7ed5ac762

// Initialize Firestore
const db = getFirestore(app);

<<<<<<< HEAD
export { app, auth, db };
=======
export { auth, db };
>>>>>>> 132fe8d35a09ebaf48975c84370b85f7ed5ac762
