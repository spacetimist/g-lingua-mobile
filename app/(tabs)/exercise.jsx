import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const exercisesData = {
  unit1: {
    title: "Unit 1: Weather",
    description: "Practice your understanding of weather-related vocabulary and expressions.",
    exercises: [
      {
        type: "Fill in the Blanks",
        description: "Complete the sentences with the correct words.",
        url: "/tabcontents/exercise/unit1/fill_in"
      },
      {
        type: "Listen to the Audio",
        description: "Type the sentence you hear.",
        url: "/tabcontents/exercise/unit1/listening"
      },
    ]
  },
  unit2: {
      title: "Unit 2: Hobbies and Free Time Activities",
      description: "Practice your understanding of daily vocabulary and expressions.",
      exercises: [
        {
          type: "Listen to the Audio",
          description: "Type the sentence you hear.",
          url: "/tabcontents/exercise/unit2/listening"
        },
        {
          type: "Fill in the Blanks",
          description: "Complete the sentences with the correct words.",
          url: "/tabcontents/exercise/unit2/fill_in"
        }
      ]
    },
   unit3: {
         title: "Unit 3: Daily Routines",
         description: "Practice your understanding of daily vocabulary and expressions.",
         exercises: [
           {
             type: "Listen to the Audio",
             description: "Type the sentence you hear.",
             url: "/tabcontents/exercise/unit3/listening"
           },
           {
             type: "Fill in the Blanks",
             description: "Complete the sentences with the correct words.",
             url: "/tabcontents/exercise/unit3/fill_in"
           }
         ]
       },
      unit4: {
               title: "Unit 4: Ordering Food",
               description: "Practice your understanding of vocabulary and expressions when ordering food.",
               exercises: [
                 {
                   type: "Listen to the Audio",
                   description: "Type the sentence you hear.",
                   url: "/tabcontents/exercise/unit4/listening"
                 },
                 {
                   type: "Fill in the Blanks",
                   description: "Complete the sentences with the correct words.",
                   url: "/tabcontents/exercise/unit4/fill_in"
                 }
               ]
             },
      unit5: {
               title: "Unit 5: Travel and Transportation",
               description: "Practice your understanding vocabulary and expressions when travelling.",
               exercises: [
                 {
                   type: "Listen to the Audio",
                   description: "Type the sentence you hear.",
                   url: "/tabcontents/exercise/unit5/listening"
                 },
                 {
                   type: "Fill in the Blanks",
                   description: "Complete the sentences with the correct words.",
                   url: "/tabcontents/exercise/unit5/fill_in"
                 }
               ]
             },
  // Tambahkan unit lainnya...
};


const ExerciseButton = ({ type, description, url }) => {
  const router = useRouter(); // Gunakan router dari Expo Router

  return (
    <TouchableOpacity
      onPress={() => router.push(url)} // Navigasi menggunakan router
      style={styles.exerciseButton}
    >
      <Text style={styles.exerciseType}>{type}</Text>
      <Text style={styles.exerciseDescription}>{description}</Text>
    </TouchableOpacity>
  );
};


const UnitContent = ({ unit }) => (
  <View style={styles.unitContent}>
    <Text style={styles.unitTitle}>{unit.title}</Text>
    <Text style={styles.unitDescription}>{unit.description}</Text>
    <Text style={styles.sectionTitle}>Exercise Types:</Text>
    {unit.exercises.map((exercise, index) => (
      <ExerciseButton
        key={index}
        type={exercise.type}
        description={exercise.description}
        url={exercise.url}
      />
    ))}
  </View>
);

export default function Exercises() {
  const [selectedUnit, setSelectedUnit] = useState(null);

  
  const renderUnitsList = () => (
    <View style={styles.unitList}>
      <Text style={styles.mainTitle}>Select a Unit</Text>
      {Object.keys(exercisesData).map((unitKey) => (
        <UnitButton
          key={unitKey}
          title={exercisesData[unitKey].title}
          onClick={() => setSelectedUnit(unitKey)}
        />
      ))}
    </View>
  );

  const renderUnitContent = () => (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        onPress={() => setSelectedUnit(null)}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back to Units</Text>
      </TouchableOpacity>
      <UnitContent unit={exercisesData[selectedUnit]} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/adaptive_icon.png')}
          style={styles.logo}
          //resizeMode="contain"
        />
        <Text style={styles.headerText}>G-Lingua - Exercise</Text>
      </View>
      {selectedUnit ? renderUnitContent() : renderUnitsList()}
    </ScrollView>
  );
}

const UnitButton = ({ title, onClick }) => {
  const handlePress = async () => {
    onClick(); // Panggil onClick original
    
    const unitNumber = title.match(/Unit (\d+):/)?.[1];
    if (unitNumber) {
      const unitKey = `unit${unitNumber}`;
      try {
        // Get existing progress data
        const savedProgress = await AsyncStorage.getItem('userProgress') || '[]';
        let progressData = JSON.parse(savedProgress);
        
        // Update atau tambah progress untuk unit ini
        const unitProgress = {
          title: title.split(': ')[1], // Ambil nama unit
          progress: 100, // 100% karena sudah exercise
          lastAccessed: Date.now(),
          materials: true,
          exercises: true
        };
        
        // Cari unit yang sudah ada
        const existingIndex = progressData.findIndex(item => 
          item.title === unitProgress.title
        );
        
        if (existingIndex >= 0) {
          // Update existing unit
          progressData[existingIndex] = {
            ...progressData[existingIndex],
            ...unitProgress
          };
        } else {
          // Tambah unit baru
          progressData.push(unitProgress);
        }
        
        // Simpan progress
        await AsyncStorage.setItem('userProgress', JSON.stringify(progressData));
        
        // Update overall progress
        const totalUnits = Object.keys(exercisesData).length;
        const completedProgress = progressData.reduce((sum, unit) => sum + unit.progress, 0);
        const overallProgress = Math.round(completedProgress / totalUnits);
        await AsyncStorage.setItem('overallProgress', overallProgress.toString());
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.unitButton}>
      <Text style={styles.unitButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Update the renderUnitsList function in materials.jsx
const renderUnitsList = () => (
  <View style={styles.unitList}>
    <Text style={styles.mainTitle}>Select a Unit</Text>
    {Object.entries(unitsData).map(([unitKey, unit]) => (
      <UnitButton
        key={unitKey}
        title={unit.title}
        onClick={() => setSelectedUnit(unitKey)}
        isActive={selectedUnit === unitKey}
      />
    ))}
  </View>
);

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
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  unitList: {
    padding: 15,
  },
  unitButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unitButtonText: {
    fontSize: 16,
    color: '#543A14',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 15,
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    color: '#99856f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  unitContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  unitTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#543A14',
  },
  unitDescription: {
    color: '#754E1A',
    marginBottom: 20,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#543A14',
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
  exerciseDescription: {
    color: '#f5f5f5',
    fontSize: 14,
  },
});
