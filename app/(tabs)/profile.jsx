import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Add refresh trigger
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    loadUserData();
  }, [refreshTrigger]); // Add refreshTrigger to dependencies

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
      console.error('Error loading user data:', error);
      Alert.alert("Error", "Failed to load user data");
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters!");
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
        
        // Update local state
        setUserData(prev => ({
          ...prev,
          password: newPassword
        }));
        
        // Trigger refresh
        setRefreshTrigger(prev => prev + 1);
        
        Alert.alert("Success", "Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert("Error", "Failed to update password");
    }
  };


  const handleLogout = () => {  // Hapus async di sini
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {  // Pisahkan logika logout ke fungsi terpisah
            logoutUser();
          }
        }
      ]
    );
  };
  const logoutUser = async () => {
    try {
      console.log('Starting logout process...');
      await AsyncStorage.removeItem('currentUser');
      console.log('AsyncStorage cleared');
      
      setUserData({ username: "", password: "" });
      console.log('State reset');
      
      console.log('Navigating...');
      router.push("/");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/adaptive_icon.png')} 
          style={styles.logo}
        />
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.unitContent}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={userData.username}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.unitContent}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter new password"
            />
          </View>

          <View style={styles.inputContainer}>
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
            style={styles.exerciseButton}
            onPress={handlePasswordChange}
          >
            <Text style={styles.exerciseType}>Update Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.exerciseButton, styles.logoutButton]}
          onPress={handleLogout}
        >
          <View style={styles.logoutContent}>
            <Ionicons name="log-out-outline" size={24} color="#FFF" style={styles.logoutIcon} />
            <Text style={styles.exerciseType}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 20,
  },
  logo: {
    width: 80,
    height: 40,
    marginRight: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 15,
  },
  unitContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#543A14',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#754E1A',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 13,
    fontSize: 16,
    color: '#333',
  },
  inputDisabled: {
    backgroundColor: '#E8E8E8',
    color: '#666',
  },
  exerciseButton: {
    backgroundColor: '#99856f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseType: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#C17767',
    marginTop: 0.01,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    marginRight: 8,
  },
});