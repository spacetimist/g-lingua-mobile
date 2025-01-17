import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await AsyncStorage.getItem('currentUser');
        setUser(currentUser);
        setInitializing(false);
      } catch (error) {
        console.error('Error checking user:', error);
        setInitializing(false);
      }
    };

    checkUser();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      // If user is already authenticated, go to home
      router.push("/(tabs)/home");
    } else {
      // If not authenticated, go to auth screen
      router.push("/auth");
    }
  };

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/images/adaptive_icon.png")} 
        style={styles.icon} 
      />
      <Text style={styles.title}>Welcome to G-Lingua</Text>
      <Text style={styles.subtitle}>
        Start learning English with ease and fun!
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0E3CA",
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#685752",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: "#F0E3CA",
    fontSize: 16,
    fontWeight: "bold",
  },
});