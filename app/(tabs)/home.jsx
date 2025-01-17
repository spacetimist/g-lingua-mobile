import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadUsername();
  }, []);

  const loadUsername = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) {
        setUsername(currentUser);
      }
    } catch (error) {
      console.error('Error loading username:', error);
    }
  };

  const recentUnits = [
    {
      title: "Weather",
      progress: 60,
      icon: "cloud",
    },
    {
      title: "Hobbies",
      progress: 30,
      icon: "basketball",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/adaptive_icon.png')} 
          style={styles.logo}
        />
        <Text style={styles.headerText}>G-Lingua - Home</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >   
        {/* Welcome Section */}
        <View style={styles.unitContent}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.usernameText}>{username}!</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Units{'\n'}Started</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45%</Text>
              <Text style={styles.statLabel}>Overall{'\n'}Progress</Text>
            </View>
          </View>
        </View>

        {/* Recent Progress */}
        <View style={styles.unitContent}>
          <Text style={styles.sectionTitle}>Recent Progress</Text>
          {recentUnits.map((unit, index) => (
            <View key={index} style={styles.progressItem}>
              <View style={styles.progressIcon}>
                <Ionicons name={unit.icon} size={24} color="#99856F" />
              </View>
              <View style={styles.progressInfo}>
                <Text style={styles.progressTitle}>{unit.title}</Text>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[styles.progressBar, { width: `${unit.progress}%` }]} 
                  />
                </View>
              </View>
              <Text style={styles.progressPercent}>{unit.progress}%</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.unitContent}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/materials')}
            >
              <Ionicons name="book-outline" size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>Study{'\n'}Materials</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/exercise')}
            >
              <Ionicons name="school-outline" size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>Practice{'\n'}Exercises</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: 60,
  },
  unitContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: '#754E1A',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#543A14',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0D5C1',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#99856F',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#754E1A',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#543A14',
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F0E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressInfo: {
    flex: 1,
    marginRight: 10,
  },
  progressTitle: {
    fontSize: 16,
    color: '#543A14',
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F5F0E9',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#99856F',
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 14,
    color: '#99856F',
    fontWeight: 'bold',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#99856F',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});