import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';

// Helper function to get unit icon (which was missing in the original code)
const getUnitIcon = (title) => {
  // You might want to customize this based on your unit titles
  return "book-outline";
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [recentUnits, setRecentUnits] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [unitsStarted, setUnitsStarted] = useState(0);
  const router = useRouter();

  // Gunakan useFocusEffect untuk update data setiap kali halaman difokuskan
  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      // Load username
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) {
        setUsername(currentUser);
      } else {
        // Jika tidak ada currentUser, set username menjadi kosong
        setUsername("");
      }

      // Load progress data
      const progressData = await AsyncStorage.getItem('userProgress');
      if (progressData) {
        const progress = JSON.parse(progressData);
        
        // Group units by their base name (removing ' - Material' or ' - Exercise')
        const groupedUnits = progress.reduce((acc, unit) => {
          // Remove ' - Material' or ' - Exercise' from the unit title
          const baseTitle = unit.title.replace(' - Material', '').replace(' - Exercise', '');
          
          if (!acc[baseTitle]) {
            acc[baseTitle] = { 
              title: baseTitle, 
              progress: 0,
              lastAccessed: 0
            };
          }
          
          // Accumulate progress for each base unit
          acc[baseTitle].progress += unit.progress;
          acc[baseTitle].lastAccessed = Math.max(acc[baseTitle].lastAccessed, unit.lastAccessed);
          
          return acc;
        }, {});

        // Convert grouped units to array
        const processedUnits = Object.values(groupedUnits);
        
        // Filter units with progress
        const startedUnits = processedUnits.filter(unit => unit.progress > 0);
        
        // Update units started
        setUnitsStarted(startedUnits.length);
        
        // Calculate & update overall progress
        // If no units started, set progress to 0
        if (startedUnits.length > 0) {
          const totalProgress = startedUnits.reduce((sum, unit) => sum + unit.progress, 0);
          setOverallProgress(Math.round(totalProgress / startedUnits.length));
        } else {
          setOverallProgress(0);
        }
        
        // Update recent units (last 2 accessed)
        const sortedUnits = [...startedUnits].sort((a, b) => 
          b.lastAccessed - a.lastAccessed
        ).slice(0, 2);

        const mappedUnits = sortedUnits.map(unit => ({
          title: unit.title,
          progress: unit.progress,
          icon: getUnitIcon(unit.title)
        }));

        setRecentUnits(mappedUnits);
      } else {
        // Jika tidak ada progressData, set default values
        setUnitsStarted(0);
        setOverallProgress(0);
        setRecentUnits([]);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Reset states in case of error
      setUnitsStarted(0);
      setOverallProgress(0);
      setRecentUnits([]);
    }
  };

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
              <Text style={styles.statNumber}>{unitsStarted}</Text>
              <Text style={styles.statLabel}>Units{'\n'}Started</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{overallProgress}%</Text>
              <Text style={styles.statLabel}>Overall{'\n'}Progress</Text>
            </View>
          </View>
        </View>

        {/* Recent Progress */}
        <View style={styles.unitContent}>
          <Text style={styles.sectionTitle}>Recent Progress</Text>
          {recentUnits.length > 0 ? (
            recentUnits.map((unit, index) => (
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
            ))
          ) : (
            <Text style={styles.noProgressText}>No units started yet</Text>
          )}
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
  noProgressText: {
    textAlign: 'center',
    color: '#754E1A',
    fontSize: 16,
    marginVertical: 10,
  },
});