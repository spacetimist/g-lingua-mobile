import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setInitializing(false);
        });

        // Simulate loading resources
        await new Promise(resolve => setTimeout(resolve, 2000));

        return unsubscribe; // Cleanup subscription
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (initializing) {
    return null; // Keep showing splash screen while initializing
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F0E3CA',
        },
        headerTintColor: '#333',
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="auth" 
        options={{ 
          headerShown: false,
          // Prevent going back to welcome screen from auth
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
          // Prevent going back to auth/welcome screens
          gestureEnabled: false 
        }} 
      />
    </Stack>
  );
}

// import { Stack } from "expo-router";
// import { useEffect } from "react";
// import * as SplashScreen from "expo-splash-screen";

// // Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   useEffect(() => {
//     const prepare = async () => {
//       try {
//         // Simulate loading resources
//         await new Promise(resolve => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         await SplashScreen.hideAsync();
//       }
//     };

//     prepare();
//   }, []);

//   return (
//     <Stack
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#F0E3CA',
//         },
//         headerTintColor: '#333',
//         headerShown: false // menghilangkan semua header
//       }}
//     >
//       <Stack.Screen 
//         name="index" 
//         options={{ 
//           headerShown: false 
//         }} 
//       />
//       <Stack.Screen 
//         name="(tabs)" 
//         options={{ 
//           headerShown: false // menghilangkan text (tabs)
//         }} 
//       />
//     </Stack>
//   );
// }