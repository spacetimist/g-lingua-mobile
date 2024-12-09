import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      // Simulate loading or setup tasks
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated 2-second delay
      SplashScreen.hideAsync(); // Hide the splash screen after preparation
    };

    prepare();
  }, []);

  return <Stack />;
}

