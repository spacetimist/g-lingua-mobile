import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export default function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const username = await AsyncStorage.getItem('currentUser');
      const storedData = await AsyncStorage.getItem('userCredentials');
      
      if (storedData && username) {
        const users = JSON.parse(storedData);
        const currentUser = users.find(u => u.storedUsername === username);
        if (currentUser) {
          setUserData({
            username: currentUser.storedUsername,
            password: currentUser.storedPassword
          });
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load user data");
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill all password fields");
      return;
    }

    if (oldPassword !== userData.password) {
      Alert.alert("Error", "Current password is incorrect");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords don't match");
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('userCredentials');
      if (storedData) {
        const users = JSON.parse(storedData);
        const updatedUsers = users.map(user => 
          user.storedUsername === userData.username 
            ? { ...user, storedPassword: newPassword }
            : user
        );

        await AsyncStorage.setItem('userCredentials', JSON.stringify(updatedUsers));
        Alert.alert("Success", "Password updated successfully");
        
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setUserData(prev => ({...prev, password: newPassword}));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update password");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      router.replace('/');
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/adaptive_icon.png')} 
          style={styles.logo}
        />
        <Text style={styles.headerText}>G-Lingua - Profile</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={userData.username}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Change Password</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.input}
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
              placeholder="Enter current password"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter new password"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm new password"
            />
          </View>

          <TouchableOpacity 
            onPress={handlePasswordChange}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={handleLogout}
          style={[styles.button, styles.logoutButton]}
        >
          <View style={styles.logoutContent}>
            <Ionicons name="log-out-outline" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e3ca',
  },
  header: {
    backgroundColor: '#99856f',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 80,
    height: 40,
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#543A14',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',
    color: '#666',
  },
  button: {
    backgroundColor: '#99856f',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#C17767',
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});