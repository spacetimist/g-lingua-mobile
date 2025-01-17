import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (!username || !password) {
        alert('Please fill in all fields');
        return;
      }

      if (isLogin) {
        const storedData = await AsyncStorage.getItem('userCredentials');
        if (!storedData) {
          alert('No registered users found');
          return;
        }

        const credentials = JSON.parse(storedData);
        const users = Array.isArray(credentials) ? credentials : [credentials];
        
        const user = users.find(u => 
          u.storedUsername === username && u.storedPassword === password
        );

        if (user) {
          await AsyncStorage.setItem('currentUser', username);
          router.replace('/(tabs)/home');
        } else {
          alert('Invalid username or password');
        }
      } else {
        // Registration
        const existingData = await AsyncStorage.getItem('userCredentials');
        let users = [];
        
        if (existingData) {
          users = Array.isArray(JSON.parse(existingData)) 
            ? JSON.parse(existingData) 
            : [JSON.parse(existingData)];
            
          if (users.some(u => u.storedUsername === username)) {
            alert('Username already exists');
            return;
          }
        }

        const newUser = {
          storedUsername: username,
          storedPassword: password,
        };

        users.push(newUser);
        await AsyncStorage.setItem('userCredentials', JSON.stringify(users));
        await AsyncStorage.setItem('currentUser', username);
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('An error occurred during authentication');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Welcome to G-Lingua</Text>
        <Image 
          source={require("../assets/images/adaptive_icon.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />
        
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
        />
        
        <TouchableOpacity 
          onPress={handleAuth} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0E3CA',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#685752',
    marginTop: 10,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#685752',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#99856F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#99856F',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
});